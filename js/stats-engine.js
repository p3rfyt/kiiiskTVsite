/* kiiiskTV — статистика
   Полностью локальный движок. Никаких серверов и сторонних API.
   Итог = начальная статистика игрока + все матчи из data/matches.js.
*/
(function () {
  "use strict";

  const n = (value) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  };

  const kd = (kills, deaths) => {
    const k = n(kills);
    const d = n(deaths);
    return d === 0 ? k : k / d;
  };

  const percentage = (wins, matches) =>
    matches > 0 ? (wins / matches) * 100 : 0;

  const emptyPlayer = (id) => ({
    id,
    matches: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    maps: {}
  });

  const addMapResult = (player, mapName, result) => {
    if (!mapName) return;

    if (!player.maps[mapName]) {
      player.maps[mapName] = {
        matches: 0,
        wins: 0,
        losses: 0,
        draws: 0
      };
    }

    const map = player.maps[mapName];
    map.matches += 1;

    if (result === "win") map.wins += 1;
    else if (result === "loss") map.losses += 1;
    else map.draws += 1;
  };

  const seedInitial = (players, initialStats) => {
    if (!initialStats || typeof initialStats !== "object") return;

    Object.entries(initialStats).forEach(([id, raw]) => {
      const p = players[id] || emptyPlayer(id);

      p.matches += n(raw?.matches);
      p.wins += n(raw?.wins);
      p.losses += n(raw?.losses);
      p.draws += n(raw?.draws);
      p.kills += n(raw?.kills);
      p.deaths += n(raw?.deaths);
      p.assists += n(raw?.assists);

      if (raw?.maps && typeof raw.maps === "object") {
        Object.entries(raw.maps).forEach(([mapName, mapRaw]) => {
          const existing = p.maps[mapName] || {
            matches: 0, wins: 0, losses: 0, draws: 0
          };

          existing.matches += n(mapRaw?.matches);
          existing.wins += n(mapRaw?.wins);
          existing.losses += n(mapRaw?.losses);
          existing.draws += n(mapRaw?.draws);
          p.maps[mapName] = existing;
        });
      }

      players[id] = p;
    });
  };

  function calculate(matches, initialStats) {
    const players = {};
    seedInitial(players, initialStats);

    for (const match of Array.isArray(matches) ? matches : []) {
      const score1 = n(match?.score?.team1);
      const score2 = n(match?.score?.team2);
      const team1 = Array.isArray(match?.teams?.team1) ? match.teams.team1 : [];
      const team2 = Array.isArray(match?.teams?.team2) ? match.teams.team2 : [];
      const winner =
        score1 === score2 ? "draw" : score1 > score2 ? "team1" : "team2";
      const mapName = String(match?.map || "").trim();

      const ids = [...new Set([...team1, ...team2])];

      for (const id of ids) {
        const p = players[id] || emptyPlayer(id);
        const s = match?.players?.[id] || {};
        const side = team1.includes(id) ? "team1" : "team2";

        p.matches += 1;
        p.kills += n(s.kills);
        p.deaths += n(s.deaths);
        p.assists += n(s.assists);

        let result = "draw";
        if (winner === side) {
          p.wins += 1;
          result = "win";
        } else if (winner !== "draw") {
          p.losses += 1;
          result = "loss";
        } else {
          p.draws += 1;
        }

        addMapResult(p, mapName, result);
        players[id] = p;
      }
    }

    return Object.values(players)
      .map((p) => ({
        ...p,
        winrate: percentage(p.wins, p.matches),
        kd: kd(p.kills, p.deaths),
        kda: p.deaths
          ? (p.kills + p.assists) / p.deaths
          : p.kills + p.assists,
        maps: Object.fromEntries(
          Object.entries(p.maps)
            .map(([name, map]) => [
              name,
              {
                ...map,
                winrate: percentage(map.wins, map.matches)
              }
            ])
            .sort((a, b) => b[1].matches - a[1].matches || a[0].localeCompare(b[0]))
        )
      }))
      .sort((a, b) => b.kd - a.kd || b.kills - a.kills || b.winrate - a.winrate);
  }

  function player(matches, initialStats, id) {
    return calculate(matches, initialStats).find((item) => item.id === id) || null;
  }

  window.KiiiskStats = { calculate, player, kd };
})();
