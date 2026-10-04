/* kiiiskTV — ручная статистика профиля
   Данные для каждого игрока задаются прямо в HTML его профиля.
   Формулы:
   Winrate = победы / матчи * 100
   K/D = kills / deaths
   Средние kills = kills / матчи
   Средний урон = damage / матчи
   Winrate карты = победы на карте / сыгранные карты * 100
*/
(() => {
  "use strict";

  const host = document.getElementById("manualPlayerStats");
  if (!host) return;

  const data = window.KIIISK_MANUAL_PROFILE_STATS || null;
  const num = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };
  const fmt = (v, digits = 2) => num(v).toFixed(digits).replace(/\.00$/, "");
  const pct = (v) => `${fmt(v, 1)}%`;
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[ch]);

  if (!data || num(data.matches) <= 0) {
    host.innerHTML = `
      <div class="manual-stats-empty">
        <div class="manual-stats-empty-icon">—</div>
        <div>
          <strong>Статистики пока нет.</strong>
        </div>
      </div>`;
    return;
  }

  const matches = num(data.matches);
  const wins = Math.min(matches, Math.max(0, num(data.wins)));
  const losses = Math.max(0, matches - wins);
  const kills = num(data.kills);
  const deaths = num(data.deaths);
  const damage = num(data.damage);
  const winrate = matches ? wins / matches * 100 : 0;
  const kd = deaths > 0 ? kills / deaths : kills;
  const avgKills = matches ? kills / matches : 0;
  const avgDamage = matches ? damage / matches : 0;

  const cards = [
    { label: "Матчи", value: fmt(matches, 0), sub: `${fmt(wins, 0)} побед · ${fmt(losses, 0)} поражений` },
    { label: "Winrate", value: pct(winrate), sub: "общий показатель", accent: true },
    { label: "K/D", value: fmt(kd, 2), sub: `${fmt(kills, 0)} K · ${fmt(deaths, 0)} D`, accent: true, negative: kd < 0.99 },
    { label: "Средние киллы", value: fmt(avgKills, 1), sub: "за матч" },
    { label: "Победы", value: fmt(wins, 0), sub: `из ${fmt(matches, 0)} матчей`, accent: true }
  ];

  const mapEntries = Object.entries(data.maps || {})
    .map(([name, raw]) => ({
      name,
      matches: Math.max(0, num(raw?.matches)),
      wins: Math.max(0, Math.min(num(raw?.matches), num(raw?.wins)))
    }))
    .filter(map => map.matches > 0);

  const mapImages = {
    Mirage: "mirage.jpg",
    Inferno: "inferno.jpg",
    Ancient: "ancient.jpg",
    Nuke: "nuke.jpg",
    Dust2: "dust2.jpg",
    Anubis: "anubis.jpg",
    Cache: "cache.jpg"
  };
  const mapHtml = mapEntries.length ? `
    <div class="manual-stats-section-head">
      <div>
        <h3>Статистика по картам</h3>
        <span>Количество сыгранных карт и процент побед</span>
      </div>
    </div>
    <div class="manual-map-grid">
      ${mapEntries.map(map => {
        const mapWinrate = map.matches ? map.wins / map.matches * 100 : 0;
        const mapLosses = map.matches - map.wins;
        return `
          <div class="manual-map-card${mapWinrate < 49 ? " map-winrate-negative" : ""}" style="--map-bg:url(../map-images/${mapImages[map.name] || "mirage.jpg"})">
            <div class="manual-map-top">
              <div>
                <strong>${esc(map.name)}</strong>
                <span>${fmt(map.matches, 0)} ${map.matches === 1 ? "карта" : map.matches < 5 ? "карты" : "карт"}</span>
              </div>
              <b>${pct(mapWinrate)}</b>
            </div>
            <div class="manual-map-bar"><span style="width:${Math.max(0, Math.min(100, mapWinrate))}%"></span></div>
            <div class="manual-map-bottom">
              <span>${fmt(map.wins, 0)} побед</span>
              <span>${fmt(mapLosses, 0)} поражений</span>
            </div>
          </div>`;
      }).join("")}
    </div>` : "";

  host.innerHTML = `
    <div class="manual-stats-overview">
      ${cards.map(card => `
        <div class="manual-stat-card${card.accent ? " is-accent" : ""}${card.negative ? " kd-negative" : ""}">
          <span>${esc(card.label)}</span>
          <strong>${esc(card.value)}</strong>
          <small>${esc(card.sub)}</small>
        </div>`).join("")}
    </div>
    ${mapHtml}`;
})();
