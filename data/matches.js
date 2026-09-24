// kiiiskTV — история матчей
//
// Новые матчи добавляй через admin.html.
// K/D, KDA, общая статистика и Winrate по картам считаются автоматически.
// Стартовая история, которая была до системы, хранится отдельно в data/initial-stats.js.
//
// Структура одного матча:
// {
//     id: "...",
//     date: "2026-09-24",
//     tournament: "Название турнира",
//     map: "Mirage",
//     teamNames: {
//         team1: "Perf Team",
//         team2: "Opponent"
//     },
//     score: {
//         team1: 13,
//         team2: 9
//     },
//     teams: {
//         team1: ["perf", "pinkman"],
//         team2: ["mismi13", "n1kson1k"]
//     },
//     players: {
//         perf: { kills: 24, deaths: 11, assists: 8 },
//         pinkman: { kills: 19, deaths: 14, assists: 12 },
//         mismi13: { kills: 15, deaths: 19, assists: 5 },
//         n1kson1k: { kills: 12, deaths: 21, assists: 7 }
//     }
// }

const KIIISK_MATCHES = [];
