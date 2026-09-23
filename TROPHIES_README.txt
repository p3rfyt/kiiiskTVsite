# Трофеи kiiiskTV

Трофеи профилей управляются через `data/trophies.js`.

## Серии

- `Kiiisk Duo Cup 1–5` — один трофей серии `Image/Trophies/KiiiskDuoCup.png`
- `Kiiisk Wingman` / `Wingman S2` / `Wingman 2.0` / `Wingman 2.1` — один трофей серии `Image/Trophies/KiiiskWingman.png`
- `Kiiisk Solo` — `Image/Trophies/KiiiskSolo.png`
- `Kiiisk 5 vs 5` — `Image/Trophies/Kiiisk5v5.png`
- `Kiiisk Trio` — `Image/Trophies/KiiiskTrio.png`

## Как добавить отдельный турнир

В `KIIISK_TROPHIES` добавляется объект турнира. Обычно он наследует трофей серии. Если для конкретного турнира нужна отдельная картинка, укажи другой путь в `image`.

После этого ID турнира добавляется в `KIIISK_PLAYER_TROPHIES` нужного игрока.

Лента автоматически появляется в профиле, показывает название, серию, дату, команду и ссылку на страницу турнира. Если страницы турнира ещё нет, карточка остаётся некликабельной и сообщает об этом.

Все профили уже подключены к `data/trophies.js`, поэтому добавление победы в данные не требует редактировать HTML каждого профиля.
