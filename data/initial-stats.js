// kiiiskTV — стартовая статистика игроков
//
// Здесь можно хранить статистику, накопленную ДО появления системы матчей.
// Новые матчи из data/matches.js автоматически прибавляются к этим значениям.
//
// Пример:
// "perf": {
//   matches: 20, wins: 14, losses: 6, draws: 0,
//   kills: 420, deaths: 350, assists: 130,
//   maps: {
//     Mirage: { matches: 8, wins: 6, losses: 2, draws: 0 },
//     Inferno: { matches: 6, wins: 4, losses: 2, draws: 0 }
//   }
// }

const KIIISK_INITIAL_STATS = {};
