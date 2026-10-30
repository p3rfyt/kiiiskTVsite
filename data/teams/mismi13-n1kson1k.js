/*
  ДАННЫЕ КОМАНДЫ: mismi13 + n1kson1k
  Здесь редактируй название, логотип, фотографии, состав, трофеи и историю.
  Пути к картинкам указываются от корня сайта (например Image/Players/m1smi13LEG.png).
*/
window.KIIISK_TEAM = {
  id: "mismi13-n1kson1k",
  name: "mismi13 × n1kson1k",
  shortName: "M + N",
  tag: "Легендарное дуо",
  logo: "Image/Players/m1smi13LEG.png",
  country: "KZ",
  founded: "2024",
  status: "Исторический состав",
  description: "Дуо, которое стало частью истории турниров kiiiskTV. Здесь собраны совместные выступления, трофеи и история состава.",
  stats: [
    { label: "Титулы", value: "3", note: "по текущим данным профиля" },
    { label: "MVP", value: "3", note: "по текущим данным профиля" },
    { label: "Турниры", value: "5", note: "совместных выступлений" }
  ],
  players: [
    { nick: "mismi13", realName: "Данила", role: "Игрок", photo: "Image/Players/m1smi13LEG.png", profile: "Players/m1smi13.html", status: "Текущий состав" },
    { nick: "n1kson1k", realName: "Никита", role: "Игрок", photo: "Image/Players/n1kson1kLEG.png", profile: "Players/n1kson1k.html", status: "Текущий состав" }
  ],
  trophies: [
    { title: "Kiiisk Duo Cup 2", place: "1 место", image: "Image/Trophies/KiiiskDuoCup.png", href: "tournament-kiiisk-2.html", year: "2024" },
    { title: "Kiiisk Wingman", place: "1 место", image: "Image/Trophies/KiiiskWingman.png", href: "KiiiskWingman-S2.html", year: "—" },
    { title: "Kiiisk 5 vs 5", place: "1 место", image: "Image/Trophies/Kiiisk5v5.png", href: "#results", year: "—" }
  ],
  history: [
    { date: "2024 — настоящее время", title: "Совместный состав", text: "Данила mismi13 и Никита n1kson1k выступают вместе на турнирах kiiiskTV." }
  ],
  results: [
    { event: "Kiiisk Duo Cup 2", place: "1 место", note: "Победа", href: "tournament-kiiisk-2.html" },
    { event: "Kiiisk Wingman", place: "1 место", note: "Победа дуо", href: "KiiiskWingman-S2.html" },
    { event: "Kiiisk 5 vs 5", place: "1 место", note: "Результат из текущего профиля", href: "#" },
    { event: "Другие турниры", place: "Уточняется", note: "Добавь результаты в data/teams/mismi13-n1kson1k.js", href: "tournaments.html" }
  ]
};
