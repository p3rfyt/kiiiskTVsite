/* kiiiskTV statistics engine
   No external services. Reads KIIISK_MATCHES from data/matches.js.
*/
(function () {
  "use strict";

  function n(v) {
    const x = Number(v);
    return Number.isFinite(x) ? x : 0;
  }

  function kd(kills, deaths) {
    kills = n(kills);
    deaths = n(deaths);
    return deaths === 0 ? kills : kills / deaths;
  }

  function calculate(matches) {
    const players = {};

    for (const match of Array.isArray(matches) ? matches : []) {
      const score1 = n(match?.score?.team1);
      const score2 = n(match?.score?.team2);
      const team1 = Array.isArray(match?.teams?.team1) ? match.teams.team1 : [];
      const team2 = Array.isArray(match?.teams?.team2) ? match.teams.team2 : [];
      const winner =
        score1 === score2 ? "draw" : score1 > score2 ? "team1" : "team2";

      const ids = [...new Set([...team1, ...team2])];

      for (const id of ids) {
        const s = match?.players?.[id] || {};
        if (!players[id]) {
          players[id] = {
            id, matches: 0, wins: 0, losses: 0, draws: 0,
            kills: 0, deaths: 0, assists: 0
          };
        }

        const p = players[id];
        const side = team1.includes(id) ? "team1" : "team2";
        p.matches++;
        p.kills += n(s.kills);
        p.deaths += n(s.deaths);
        p.assists += n(s.assists);

        if (winner === "draw") p.draws++;
        else if (winner === side) p.wins++;
        else p.losses++;
      }
    }

    return Object.values(players)
      .map(p => ({
        ...p,
        winrate: p.matches ? (p.wins / p.matches) * 100 : 0,
        kd: kd(p.kills, p.deaths),
        kda: p.deaths ? (p.kills + p.assists) / p.deaths : p.kills + p.assists
      }))
      .sort((a, b) => b.kd - a.kd || b.kills - a.kills);
  }

  window.KiiiskStats = { calculate, kd };
})();
