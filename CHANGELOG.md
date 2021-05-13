# v2.14.1 (Thu May 13 2021)

#### 🐛 Bug Fix

- fix: В консоль не падают ошибки в ie [#120](https://github.com/sberdevices/assistant-client/pull/120) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.14.0 (Thu May 06 2021)

#### 🚀 Enhancement

- fix: payload опционален в AssistantSmartAppCommand [#117](https://github.com/sberdevices/assistant-client/pull/117) ([@sasha-tlt](https://github.com/sasha-tlt))
- feat: Ответ на sendAction без подписки теперь попадает в общие подписки (assistant.on('data')) [#117](https://github.com/sberdevices/assistant-client/pull/117) ([@sasha-tlt](https://github.com/sasha-tlt))

#### 🐛 Bug Fix

- fix: Поддержка ssr [#117](https://github.com/sberdevices/assistant-client/pull/117) ([@sasha-tlt](https://github.com/sasha-tlt))
- chore: Теперь собираем CommonJs-модуль [#117](https://github.com/sberdevices/assistant-client/pull/117) ([@sasha-tlt](https://github.com/sasha-tlt))
- fix: AssistantSmartAppData['smart_app_data'] теперь unknown [#117](https://github.com/sberdevices/assistant-client/pull/117) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.13.0 (Fri Apr 30 2021)

#### 🚀 Enhancement

- feat(initializeassistantsdk): добавил features и capabilities как параметры initializeAssistantSDK [#116](https://github.com/sberdevices/assistant-client/pull/116) (PIReutov@sberbank.ru)

#### Authors: 1

- Pavel Reutov (PIReutov@sberbank.ru)

---

# v2.12.0 (Mon Apr 26 2021)

#### 🚀 Enhancement

- feat: Без действий пользователя не рекконектиться к vps [#114](https://github.com/sberdevices/assistant-client/pull/114) ([@sasha-tlt](https://github.com/sasha-tlt))

#### 🐛 Bug Fix

- refactor: клиент vps [#114](https://github.com/sberdevices/assistant-client/pull/114) ([@sasha-tlt](https://github.com/sasha-tlt))
- fix: Остановка воспроизведения подгружающейся озвучки [#114](https://github.com/sberdevices/assistant-client/pull/114) ([@sasha-tlt](https://github.com/sasha-tlt))
- fix: Воспроизведение озвучки в safari [#114](https://github.com/sberdevices/assistant-client/pull/114) ([@sasha-tlt](https://github.com/sasha-tlt))
- docs: update Readme.md [#113](https://github.com/sberdevices/assistant-client/pull/113) ([@emochalova](https://github.com/emochalova))

#### Authors: 2

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))
- Ekaterina Mochalova ([@emochalova](https://github.com/emochalova))

---

# v2.11.9 (Fri Apr 16 2021)

#### 🐛 Bug Fix

- fix: NativePanel mobile layout [#111](https://github.com/sberdevices/assistant-client/pull/111) ([@it-efrem](https://github.com/it-efrem))

#### Authors: 1

- Eugene ([@it-efrem](https://github.com/it-efrem))

---

# v2.11.8 (Wed Apr 14 2021)

#### 🐛 Bug Fix

- fix: Добавление поля tenant в Device [#110](https://github.com/sberdevices/assistant-client/pull/110) ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

#### Authors: 1

- Ivan Ushatsky ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

---

# v2.11.7 (Wed Apr 14 2021)

#### 🐛 Bug Fix

- fix: bump auto version [#109](https://github.com/sberdevices/assistant-client/pull/109) ([@Yeti-or](https://github.com/Yeti-or))
- refactor: предупреждения редактора [#108](https://github.com/sberdevices/assistant-client/pull/108) ([@sasha-tlt](https://github.com/sasha-tlt))
- fix: Эмитить initialData в onData, если не было вызова getInitialData [#108](https://github.com/sberdevices/assistant-client/pull/108) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 2

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))
- Vasiliy ([@Yeti-or](https://github.com/Yeti-or))

---

# v2.11.6 (Wed Apr 07 2021)

#### 🐛 Bug Fix

- fix: Команда 'back' не приходит [#105](https://github.com/sberdevices/assistant-client/pull/105) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.11.5 (Mon Apr 05 2021)

#### 🐛 Bug Fix

- fix: Дублирование сообщений из appInitialData [#104](https://github.com/sberdevices/assistant-client/pull/104) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.11.4 (Fri Apr 02 2021)

#### 🐛 Bug Fix

- fix: расширил интерфейс AssistantAppContext [#100](https://github.com/sberdevices/assistant-client/pull/100) (avstarikovich@sberbank.ru)

#### Authors: 1

- Старикович Антон (avstarikovich@sberbank.ru)

---

# v2.11.3 (Fri Apr 02 2021)

#### 🐛 Bug Fix

- fix: Проигрывание озвучки после остановки [#98](https://github.com/sberdevices/assistant-client/pull/98) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.11.2 (Thu Apr 01 2021)

#### 🐛 Bug Fix

- fix: Добавить метод остановки воспроизведения текущей очереди озвучки [#97](https://github.com/sberdevices/assistant-client/pull/97) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.11.1 (Mon Mar 15 2021)

#### 🐛 Bug Fix

- fix: Не бросать ошибку при запрете доступа к микрофону [#96](https://github.com/sberdevices/assistant-client/pull/96) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.11.0 (Mon Mar 15 2021)

#### 🚀 Enhancement

- feat: Поддержка smartAppData и smartAppError [#89](https://github.com/sberdevices/assistant-client/pull/89) ([@sasha-tlt](https://github.com/sasha-tlt))

#### 🐛 Bug Fix

- fix: Не падать без appInitialData [#89](https://github.com/sberdevices/assistant-client/pull/89) ([@sasha-tlt](https://github.com/sasha-tlt))
- chore: lint-staged [#89](https://github.com/sberdevices/assistant-client/pull/89) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.10.3 (Fri Mar 12 2021)

#### 🐛 Bug Fix

- fix: Отправлять конечную гипотезу до отписки от события createMusicRecognizer [#95](https://github.com/sberdevices/assistant-client/pull/95) (maprimberdiev@sberbank.ru)
- fix: Отправлять конечную гипотезу до отписки от события createSpeechRecognizer [#95](https://github.com/sberdevices/assistant-client/pull/95) (maprimberdiev@sberbank.ru)

#### Authors: 1

- Maken Primberdiev (maprimberdiev@sberbank.ru)

---

# v2.10.2 (Fri Mar 12 2021)

#### 🐛 Bug Fix

- fix: Не показывать анимацию при запрете доступа к микрофону [#94](https://github.com/sberdevices/assistant-client/pull/94) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.10.1 (Thu Mar 04 2021)

#### 🐛 Bug Fix

- fix: Дев-токена слишком длинный на ie [#91](https://github.com/sberdevices/assistant-client/pull/91) ([@sasha-tlt](https://github.com/sasha-tlt))
- fix: Обновление protobufjs [#91](https://github.com/sberdevices/assistant-client/pull/91) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.10.0 (Wed Feb 24 2021)

#### 🚀 Enhancement

- feat: Возвращать observable при отправке команд [#79](https://github.com/sberdevices/assistant-client/pull/79) ([@sasha-tlt](https://github.com/sasha-tlt))

#### 🐛 Bug Fix

- fix: nanoevents [#79](https://github.com/sberdevices/assistant-client/pull/79) ([@sasha-tlt](https://github.com/sasha-tlt))
- docs: пример обработки клавиш пульта [#84](https://github.com/sberdevices/assistant-client/pull/84) ([@sasha-tlt](https://github.com/sasha-tlt))

#### ⚠️ Pushed to `main`

- docs: Опечатка в readme.md ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.9.4 (Fri Feb 19 2021)

#### 🐛 Bug Fix

- fix: мета в intialSettings [#86](https://github.com/sberdevices/assistant-client/pull/86) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.9.3 (Thu Feb 18 2021)

#### 🐛 Bug Fix

- fix: обновление контракта [#85](https://github.com/sberdevices/assistant-client/pull/85) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.9.2 (Mon Feb 15 2021)

#### 🐛 Bug Fix

- fix: не падать, если appInitialData нет [#83](https://github.com/sberdevices/assistant-client/pull/83) ([@Turanchoks](https://github.com/Turanchoks))
- chore: update axios@0.21.1 [#82](https://github.com/sberdevices/assistant-client/pull/82) (AASivashov@sberbank.ru)
- docs: Поправил пример теста [#80](https://github.com/sberdevices/assistant-client/pull/80) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 3

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))
- Alexander Sivashev (AASivashov@sberbank.ru)
- Pavel Remizov ([@Turanchoks](https://github.com/Turanchoks))

---

# v2.9.1 (Fri Jan 29 2021)

#### 🐛 Bug Fix

- fix: декодинг мтт [#78](https://github.com/sberdevices/assistant-client/pull/78) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.9.0 (Thu Jan 28 2021)

#### 🚀 Enhancement

- feat: поддержка команды start_music_recognition [#77](https://github.com/sberdevices/assistant-client/pull/77) ([@sasha-tlt](https://github.com/sasha-tlt))

#### 🐛 Bug Fix

- refactor: proto и messageNames [#77](https://github.com/sberdevices/assistant-client/pull/77) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.8.0 (Wed Jan 27 2021)

#### 🚀 Enhancement

- feat: Отправка версии клиента в "surface_version" [#76](https://github.com/sberdevices/assistant-client/pull/76) ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

#### Authors: 1

- Ivan Ushatsky ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

---

# v2.7.0 (Tue Jan 26 2021)

#### 🚀 Enhancement

- feat: фильтровать дубли сообщений appInitialData [#74](https://github.com/sberdevices/assistant-client/pull/74) ([@sasha-tlt](https://github.com/sasha-tlt))

#### 🐛 Bug Fix

- test: Покрытие api тестами [#70](https://github.com/sberdevices/assistant-client/pull/70) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.6.0 (Wed Dec 23 2020)

#### 🚀 Enhancement

- feat: Поддержка флага auto_listening [#73](https://github.com/sberdevices/assistant-client/pull/73) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.5.0 (Fri Dec 18 2020)

#### 🚀 Enhancement

- feat: Изменились параметры createOfflinePlayer [#69](https://github.com/sberdevices/assistant-client/pull/69) ([@sasha-tlt](https://github.com/sasha-tlt))

#### 🐛 Bug Fix

- fix: Воспроизведение пустой озвучки [#72](https://github.com/sberdevices/assistant-client/pull/72) ([@sasha-tlt](https://github.com/sasha-tlt))
- docs: Добавление голосовой навигации в todo-canvas-app [#71](https://github.com/sberdevices/assistant-client/pull/71) ([@ivan-ushatsky](https://github.com/ivan-ushatsky))
- docs: Документация для тестовых утилит [#69](https://github.com/sberdevices/assistant-client/pull/69) ([@sasha-tlt](https://github.com/sasha-tlt))
- docs: Интеграционный тест todo-canvas-app [#69](https://github.com/sberdevices/assistant-client/pull/69) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 2

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))
- Ivan Ushatsky ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

---

# v2.4.1 (Tue Dec 15 2020)

#### 🐛 Bug Fix

- fix: Добавлены дженерики в мок [#68](https://github.com/sberdevices/assistant-client/pull/68) ([@sasha-tlt](https://github.com/sasha-tlt))
- docs: Пример интеграции через script [#67](https://github.com/sberdevices/assistant-client/pull/67) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.4.0 (Wed Dec 09 2020)

#### 🚀 Enhancement

- feat: Поддержать recoveryState [#66](https://github.com/sberdevices/assistant-client/pull/66) ([@sasha-tlt](https://github.com/sasha-tlt))
- feat: Добавлен тип AssistantSmartAppError [#66](https://github.com/sberdevices/assistant-client/pull/66) ([@sasha-tlt](https://github.com/sasha-tlt))
- feat: Поддержка insets [#66](https://github.com/sberdevices/assistant-client/pull/66) ([@sasha-tlt](https://github.com/sasha-tlt))

#### 🐛 Bug Fix

- docs: Обновлена документация todo-canvas-app [#65](https://github.com/sberdevices/assistant-client/pull/65) ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

#### Authors: 2

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))
- Ivan Ushatsky ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

---

# v2.3.0 (Fri Dec 04 2020)

#### 🚀 Enhancement

- feat: Утилиты для тестирования смартапов [#54](https://github.com/sberdevices/assistant-client/pull/54) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.2.2 (Fri Dec 04 2020)

#### 🐛 Bug Fix

- fix: дженерики для AppState action [#61](https://github.com/sberdevices/assistant-client/pull/61) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.2.1 (Wed Dec 02 2020)

#### 🐛 Bug Fix

- fix: воспроизведение озвучки из буфера при остановленном плеере [#59](https://github.com/sberdevices/assistant-client/pull/59) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.2.0 (Mon Nov 30 2020)

#### 🚀 Enhancement

- feat: ts-дженерики для входящих комманд ассистента [#58](https://github.com/sberdevices/assistant-client/pull/58) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.1.0 (Mon Nov 30 2020)

#### 🚀 Enhancement

- feat: UMD для unpkg [#48](https://github.com/sberdevices/assistant-client/pull/48) ([@sasha-tlt](https://github.com/sasha-tlt))

#### 🐛 Bug Fix

- docs: Update README.md [#57](https://github.com/sberdevices/assistant-client/pull/57) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.0.1 (Tue Nov 24 2020)

#### 🐛 Bug Fix

- fix: Пробрасывать sdkMeta в сообщения в window.appInitialData [#56](https://github.com/sberdevices/assistant-client/pull/56) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.0.0 (Mon Nov 23 2020)

#### 💥 Breaking Change

- refactor: Переделана работа с озвучкой и голосом [#47](https://github.com/sberdevices/assistant-client/pull/47) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v1.2.0 (Thu Nov 19 2020)

#### 🚀 Enhancement

- feat: add basic release workflow [#28](https://github.com/sberdevices/assistant-client/pull/28) ([@IgorAntonov](https://github.com/IgorAntonov))

#### 🐛 Bug Fix

- fix: eslint [#53](https://github.com/sberdevices/assistant-client/pull/53) ([@sasha-tlt](https://github.com/sasha-tlt))
- ci: поправить базовую ветку (main) [#52](https://github.com/sberdevices/assistant-client/pull/52) ([@Yeti-or](https://github.com/Yeti-or))
- fix: AssistantCharacterCommand приходит только 1 раз [#51](https://github.com/sberdevices/assistant-client/pull/51) ([@sasha-tlt](https://github.com/sasha-tlt))
- docs: Добавлен пример использования assistant-client [#50](https://github.com/sberdevices/assistant-client/pull/50) ([@ivan-ushatsky](https://github.com/ivan-ushatsky))
- ci: add slack integration [#45](https://github.com/sberdevices/assistant-client/pull/45) ([@Yeti-or](https://github.com/Yeti-or))
- fix: eslint errors [#28](https://github.com/sberdevices/assistant-client/pull/28) ([@IgorAntonov](https://github.com/IgorAntonov))
- #38 Задокументировать assistant.close() [#44](https://github.com/sberdevices/assistant-client/pull/44) ([@sasha-tlt](https://github.com/sasha-tlt))

#### ⚠️ Pushed to `main`

- Поправил ссылки в оглавлении readme.md ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 4

- [@IgorAntonov](https://github.com/IgorAntonov)
- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))
- Ivan Ushatsky ([@ivan-ushatsky](https://github.com/ivan-ushatsky))
- Vasiliy ([@Yeti-or](https://github.com/Yeti-or))
