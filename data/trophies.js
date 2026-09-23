/*
 * kiiiskTV — трофеи и победы игроков
 *
 * Важно:
 * - Все Kiiisk Duo Cup 1–5 используют один и тот же трофей серии.
 * - Все турниры серии Kiiisk Wingman используют один и тот же трофей.
 * - Для отдельного турнира можно указать image, если когда-нибудь понадобится
 *   уникальный кубок только для него.
 */

window.KIIISK_TROPHIES = {
    kdc1: {
        name: "Kiiisk Duo Cup 1",
        series: "Kiiisk Duo Cup",
        image: "../Image/Trophies/KiiiskDuoCup.png",
        date: "10–11 мая 2026",
        href: "../tournament-kiiisk-1.html"
    },
    kdc2: {
        name: "Kiiisk Duo Cup 2",
        series: "Kiiisk Duo Cup",
        image: "../Image/Trophies/KiiiskDuoCup.png",
        date: "13–14 июня 2026",
        href: "../tournament-kiiisk-2.html"
    },
    kdc3: {
        name: "Kiiisk Duo Cup 3",
        series: "Kiiisk Duo Cup",
        image: "../Image/Trophies/KiiiskDuoCup.png",
        date: "4–5 июля 2026",
        href: "../tournament-kiiisk-3.html"
    },
    kdc4: {
        name: "Kiiisk Duo Cup 4",
        series: "Kiiisk Duo Cup",
        image: "../Image/Trophies/KiiiskDuoCup.png",
        date: "8–9 августа 2026",
        href: "../tournament-kiiisk-4.html"
    },
    kdc5: {
        name: "Kiiisk Duo Cup 5",
        series: "Kiiisk Duo Cup",
        image: "../Image/Trophies/KiiiskDuoCup.png",
        date: "29–30 августа 2026",
        href: "../tournament-kiiisk-5.html"
    },

    wingman20: {
        name: "Kiiisk Wingman 2.0",
        series: "Kiiisk Wingman",
        image: "../Image/Trophies/KiiiskWingman.png",
        date: "2–5 октября 2024",
        href: "../KiiiskWingman2-0.html"
    },
    wingman21: {
        name: "Kiiisk Wingman 2.1",
        series: "Kiiisk Wingman",
        image: "../Image/Trophies/KiiiskWingman.png",
        date: "14–17 ноября 2024",
        href: "../KiiiskWingman2-1.html"
    },
    wingmanS2: {
        name: "Kiiisk Wingman S2",
        series: "Kiiisk Wingman",
        image: "../Image/Trophies/KiiiskWingman.png",
        date: "14–15 мая 2024",
        href: "../KiiiskWingman-S2.html"
    },
    wingman: {
        name: "Kiiisk Wingman",
        series: "Kiiisk Wingman",
        image: "../Image/Trophies/KiiiskWingman.png",
        date: "",
        href: ""
    },

    solo: {
        name: "Kiiisk Solo",
        series: "Kiiisk Solo",
        image: "../Image/Trophies/KiiiskSolo.png",
        date: "12–14 апреля 2024",
        href: "../kiiisk-solo.html"
    },
    trio: {
        name: "Kiiisk Trio",
        series: "Kiiisk Trio",
        image: "../Image/Trophies/KiiiskTrio.png",
        date: "",
        href: ""
    },
    fivevfive: {
        name: "Kiiisk 5 vs 5",
        series: "Kiiisk 5 vs 5",
        image: "../Image/Trophies/Kiiisk5v5.png",
        date: "",
        href: ""
    }
};

window.KIIISK_PLAYER_TROPHIES = {
    Chistoobatya: [{ id: "kdc5", team: "Porno" }],
    Demon: [
        { id: "kdc4", team: "Kup3r" },
        { id: "wingmanS2", team: "Мамкины Знахари" }
    ],
    Romie: [{ id: "kdc5", team: "Porno" }],
    m1smi13: [
        { id: "kdc2", team: "Lower Members" },
        { id: "wingman", team: "Young Eggs" },
        { id: "fivevfive", team: "Сказка" }
    ],
    n1kson1k: [
        { id: "kdc2", team: "Lower Members" },
        { id: "solo", team: "" },
        { id: "wingman", team: "Young Eggs" },
        { id: "fivevfive", team: "Сказка" }
    ],
    perf: [
        { id: "kdc4", team: "Kup3r" },
        { id: "kdc3", team: "Perf Team" },
        { id: "wingman20", team: "Perf Team" }
    ],
    pinkman: [
        { id: "kdc3", team: "Perf Team" },
        { id: "wingman20", team: "Perf Team" }
    ]
};