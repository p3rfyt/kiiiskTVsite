/* kiiiskTV — рендер ленты трофеев игрока */
(() => {
    const playerId = document.body.dataset.playerId;
    const host = document.getElementById("playerTrophyRibbon");
    const catalog = window.KIIISK_TROPHIES || {};
    const playerTrophies = window.KIIISK_PLAYER_TROPHIES?.[playerId] || [];

    if (!host || !playerTrophies.length) {
        return;
    }

    const pluralWins = count => {
        if (count % 10 === 1 && count % 100 !== 11) return "победа";
        if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "победы";
        return "побед";
    };

    const cardMarkup = ({ trophy, team }) => {
        const meta = [
            "1 место",
            trophy.date,
            team ? `Команда: ${team}` : ""
        ].filter(Boolean).join(" · ");

        const details = [
            `<span class="profile-trophy__series">${trophy.series}</span>`,
            trophy.date ? `<span>${trophy.date}</span>` : "",
            team ? `<span>Команда: ${team}</span>` : "",
            trophy.href
                ? '<span class="profile-trophy__open">Открыть турнир →</span>'
                : '<span class="profile-trophy__unavailable">Страница турнира пока не добавлена</span>'
        ].filter(Boolean).join("");

        const inner = `
            <img class="profile-trophy__art" src="${trophy.image}" alt="${trophy.name}">
            <div class="profile-trophy__name">${trophy.name}</div>
            <div class="profile-trophy__meta">${meta}</div>
            <div class="profile-trophy__details">${details}</div>
        `;

        return trophy.href
            ? `<a class="profile-trophy profile-trophy--link" href="${trophy.href}" aria-label="${trophy.name} — 1 место">${inner}</a>`
            : `<div class="profile-trophy">${inner}</div>`;
    };

    const cards = playerTrophies
        .map(item => ({ trophy: catalog[item.id], team: item.team || "" }))
        .filter(item => item.trophy)
        .map(cardMarkup)
        .join("");

    if (!cards) {
        return;
    }

    host.innerHTML = `
        <div class="profile-trophy-ribbon" aria-label="Победы на турнирах">
            <div class="profile-trophy-ribbon__head">
                <div>
                    <div class="profile-trophy-ribbon__title">Трофеи</div>
                    <div class="profile-trophy-ribbon__hint">Победы в турнирах</div>
                </div>
                <div class="profile-trophy-ribbon__count">${playerTrophies.length} ${pluralWins(playerTrophies.length)}</div>
            </div>
            <div class="profile-trophy-ribbon__track">
                ${cards}
            </div>
        </div>
    `;
})();
