/* kiiiskTV — блок статистики профиля */
(() => {
  "use strict";

  const id = document.body.dataset.playerId;
  const matches = Array.isArray(window.KIIISK_MATCHES) ? window.KIIISK_MATCHES : [];
  const initial = window.KIIISK_INITIAL_STATS || {};
  const stats = window.KiiiskStats?.player(matches, initial, id);

  const grid = document.getElementById("playerProfileStats");
  const maps = document.getElementById("playerProfileMaps");
  const recent = document.getElementById("playerProfileRecent");
  const subtitle = document.getElementById("playerStatsSubtitle");

  if (!grid || !maps || !recent || !subtitle) return;

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const fmt = (value, digits = 2) => Number(value || 0).toFixed(digits);
  const pct = (value) => `${fmt(value, 1)}%`;

  const playerInfo = window.KIIISK_PLAYERS?.[id];
  const playerName = playerInfo?.name || id;

  if (!stats || stats.matches <= 0) {
    subtitle.textContent = "";
    grid.innerHTML = `
      <div class="player-profile-stat-empty">
        <span class="stat-empty-icon">—</span>
        <div>
          <strong>Статистики пока нет.</strong>
        </div>
      </div>`;
    maps.innerHTML = "";
    recent.innerHTML = "";
    return;
  }

  const cards = [
    ["Матчи", stats.matches, ""],
    ["Победы", stats.wins, ""],
    ["Поражения", stats.losses, ""],
    ["Winrate", pct(stats.winrate), "accent"],
    ["K/D", fmt(stats.kd), "accent"],
    ["KDA", fmt(stats.kda), "accent"],
    ["Kills", stats.kills, ""],
    ["Deaths", stats.deaths, ""],
    ["Assists", stats.assists, ""]
  ];

  grid.innerHTML = cards.map(([label, value, cls]) => `
    <div class="player-profile-stat-card ${cls ? "is-accent" : ""}">
      <span class="stat-label">${label}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `).join("");

  subtitle.textContent =
    `${stats.matches} ${stats.matches === 1 ? "матч" : stats.matches < 5 ? "матча" : "матчей"} в статистике`;

  const mapEntries = Object.entries(stats.maps || {});
  if (mapEntries.length) {
    maps.innerHTML = `
      <div class="profile-stats-subhead">
        <div>
          <h3>Winrate по картам</h3>
          <span>Результаты на каждой карте</span>
        </div>
      </div>
      <div class="map-stats-list">
        ${mapEntries.map(([mapName, map]) => {
          const width = Math.max(0, Math.min(100, map.winrate));
          return `
            <div class="map-stat-row">
              <div class="map-stat-top">
                <span class="map-stat-name">${escapeHtml(mapName)}</span>
                <strong>${pct(map.winrate)}</strong>
              </div>
              <div class="map-stat-track">
                <span class="map-stat-fill" style="width:${width}%"></span>
              </div>
              <div class="map-stat-bottom">
                <span>${map.wins} побед · ${map.losses} поражений${map.draws ? ` · ${map.draws} ничьих` : ""}</span>
                <span>${map.matches} ${map.matches === 1 ? "матч" : map.matches < 5 ? "матча" : "матчей"}</span>
              </div>
            </div>`;
        }).join("")}
      </div>`;
  } else {
    maps.innerHTML = "";
  }

  const playerMatches = matches
    .filter((match) => {
      const a = Array.isArray(match?.teams?.team1) ? match.teams.team1 : [];
      const b = Array.isArray(match?.teams?.team2) ? match.teams.team2 : [];
      return a.includes(id) || b.includes(id);
    })
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
    .slice(0, 5);

  if (!playerMatches.length) {
    recent.innerHTML = "";
    return;
  }

  recent.innerHTML = `
    <div class="profile-stats-subhead recent-head">
      <div>
        <h3>Последние матчи</h3>
        <span>${escapeHtml(playerName)}</span>
      </div>
      <a href="../matches-history.html">Все матчи →</a>
    </div>
    <div class="profile-recent-list">
      ${playerMatches.map((match) => {
        const team1 = Array.isArray(match.teams?.team1) ? match.teams.team1 : [];
        const side = team1.includes(id) ? "team1" : "team2";
        const other = side === "team1" ? "team2" : "team1";
        const own = Number(match.score?.[side] || 0);
        const enemy = Number(match.score?.[other] || 0);
        const result = own > enemy ? "Победа" : own < enemy ? "Поражение" : "Ничья";
        const resultClass = result === "Победа" ? "win" : result === "Поражение" ? "loss" : "draw";
        const stat = match.players?.[id] || {};
        const kills = Number(stat.kills || 0);
        const deaths = Number(stat.deaths || 0);
        const assists = Number(stat.assists || 0);
        const playerKd = deaths ? kills / deaths : kills;
        return `
          <a class="profile-recent-match" href="../matches-history.html">
            <span class="recent-result ${resultClass}">${result}</span>
            <span class="recent-main">
              <strong>${escapeHtml(match.tournament || "Матч")}</strong>
              <span>${escapeHtml(match.map || "Карта не указана")} · ${escapeHtml(match.date || "")} · ${kills}/${deaths}/${assists} · K/D ${fmt(playerKd)}</span>
            </span>
            <b class="recent-score">${own}:${enemy}</b>
          </a>`;
      }).join("")}
    </div>`;
})();
