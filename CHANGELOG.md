# v4.15.0 (Mon Jan 17 2022)

#### 🚀 Enhancement

- feat: метод findInInitialData [#252](https://github.com/sberdevices/assistant-client/pull/252) ([@VladislavPetyukevich](https://github.com/VladislavPetyukevich))

#### Authors: 1

- [@VladislavPetyukevich](https://github.com/VladislavPetyukevich)

---

# v4.14.1 (Mon Jan 10 2022)

#### 🐛 Bug Fix

- fix: объявлять appInitialData в фрейме [#250](https://github.com/sberdevices/assistant-client/pull/250) ([@sasha-tlt](https://github.com/sasha-tlt))
- docs: Добавлено описание AssistantThemeCommand [#249](https://github.com/sberdevices/assistant-client/pull/249) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v4.14.0 (Thu Dec 23 2021)

#### 🚀 Enhancement

- feat: Добавлен эмитер StartSmartSearch [#248](https://github.com/sberdevices/assistant-client/pull/248) ([@evgeniysemin](https://github.com/evgeniysemin))

#### Authors: 1

- [@evgeniysemin](https://github.com/evgeniysemin)

---

# v4.13.1 (Tue Dec 21 2021)

#### 🐛 Bug Fix

- fix: Исправлен асинхронный сбор меты background_apps [#242](https://github.com/sberdevices/assistant-client/pull/242) ([@evgeniysemin](https://github.com/evgeniysemin))

#### Authors: 1

- [@evgeniysemin](https://github.com/evgeniysemin)

---

# v4.13.0 (Tue Dec 21 2021)

#### 🚀 Enhancement

- feat: Добавлено API для управления отображением NativePanel в рантайм (assistant.nativePanel) [#216](https://github.com/sberdevices/assistant-client/pull/216) ([@evgeniysemin](https://github.com/evgeniysemin))

#### Authors: 1

- [@evgeniysemin](https://github.com/evgeniysemin)

---

# v4.12.0 (Tue Dec 21 2021)

#### 🚀 Enhancement

- feat: Актуализирован вид NativePanel. Добавлен screenshotMode для NativePanel [#206](https://github.com/sberdevices/assistant-client/pull/206) ([@evgeniysemin](https://github.com/evgeniysemin))

#### 🐛 Bug Fix

- fix: Стек initialCommands теперь формируется при window.AssistantClient.onStart() [#226](https://github.com/sberdevices/assistant-client/pull/226) ([@evgeniysemin](https://github.com/evgeniysemin))

#### Authors: 1

- [@evgeniysemin](https://github.com/evgeniysemin)

---

# v4.11.2 (Tue Dec 21 2021)

#### 🐛 Bug Fix

- fix: Удалён метод Promise.allSettled [#246](https://github.com/sberdevices/assistant-client/pull/246) ([@evgeniysemin](https://github.com/evgeniysemin))
- docs: Исправление битой ссылке в README.md примера todo-canvas-app [#241](https://github.com/sberdevices/assistant-client/pull/241) ([@BorodinDK](https://github.com/BorodinDK))
- docs: Ссылки в альтернативном подключении [#239](https://github.com/sberdevices/assistant-client/pull/239) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 3

- [@evgeniysemin](https://github.com/evgeniysemin)
- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))
- Denis Borodin ([@BorodinDK](https://github.com/BorodinDK))

---

# v4.11.1 (Wed Dec 08 2021)

#### 🐛 Bug Fix

- fix: Исправлен момент отправки эмоции listen при готовности захвата речи [#238](https://github.com/sberdevices/assistant-client/pull/238) ([@evgeniysemin](https://github.com/evgeniysemin))

#### Authors: 1

- [@evgeniysemin](https://github.com/evgeniysemin)

---

# v4.11.0 (Tue Dec 07 2021)

#### 🚀 Enhancement

- feat: Добавлена поддержка BackgroundApps [#231](https://github.com/sberdevices/assistant-client/pull/231) ([@evgeniysemin](https://github.com/evgeniysemin))

#### Authors: 1

- [@evgeniysemin](https://github.com/evgeniysemin)

---

# v4.10.1 (Tue Nov 23 2021)

#### 🐛 Bug Fix

- fix: Отправлять current_app вместе с greetings [#233](https://github.com/sberdevices/assistant-client/pull/233) ([@sasha-tlt](https://github.com/sasha-tlt))
- chore: Ошибка при сборке [#230](https://github.com/sberdevices/assistant-client/pull/230) ([@sasha-tlt](https://github.com/sasha-tlt))
- docs: readme для sdk [#224](https://github.com/sberdevices/assistant-client/pull/224) ([@sasha-tlt](https://github.com/sasha-tlt))
- refactor: работа с озвучкой и голосом [#224](https://github.com/sberdevices/assistant-client/pull/224) ([@sasha-tlt](https://github.com/sasha-tlt))
- refactor: файловая структура sdk [#224](https://github.com/sberdevices/assistant-client/pull/224) ([@sasha-tlt](https://github.com/sasha-tlt))
- chore: Ошибки линтера [#224](https://github.com/sberdevices/assistant-client/pull/224) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v4.10.0 (Tue Nov 09 2021)

#### 🚀 Enhancement

- feat: улучшение api методов setHints и setSuggests [#228](https://github.com/sberdevices/assistant-client/pull/228) (IAnKulygin@sberbank.ru)

#### Authors: 1

- Кулыгин Илья Андреевич (IAnKulygin@sberbank.ru)

---

# v4.9.1 (Wed Oct 27 2021)

#### 🐛 Bug Fix

- fix: activate_app_info по-умолчанию должен быть true [#222](https://github.com/sberdevices/assistant-client/pull/222) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v4.9.0 (Tue Oct 12 2021)

#### 🚀 Enhancement

- feat: Добавлено: assistant.listen возвращает промис запроса микрофона [#202](https://github.com/sberdevices/assistant-client/pull/202) ([@evgeniysemin](https://github.com/evgeniysemin))

#### 🐛 Bug Fix

- fix: Использовать 5 версию vps [#212](https://github.com/sberdevices/assistant-client/pull/212) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 2

- [@evgeniysemin](https://github.com/evgeniysemin)
- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v4.8.1 (Tue Oct 12 2021)

#### 🐛 Bug Fix

- fix: Озвучка не проигрывается, если контекст на паузе [#199](https://github.com/sberdevices/assistant-client/pull/199) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v4.8.0 (Mon Oct 11 2021)

#### 🚀 Enhancement

- feat: Добавлено событие ассистента - персонаж [#200](https://github.com/sberdevices/assistant-client/pull/200) ([@sasha-tlt](https://github.com/sasha-tlt))

#### 🐛 Bug Fix

- fix: Вернуть афину в AssistantCharacterCommand [#211](https://github.com/sberdevices/assistant-client/pull/211) ([@sasha-tlt](https://github.com/sasha-tlt))
- refactor: Исключена зависимость транспорта от протокола [#210](https://github.com/sberdevices/assistant-client/pull/210) ([@ivan-ushatsky](https://github.com/ivan-ushatsky))
- docs: корректная версия assistant-client в umd [#208](https://github.com/sberdevices/assistant-client/pull/208) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 2

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))
- Ivan Ushatsky ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

---

# v4.7.0 (Wed Oct 06 2021)

#### 🚀 Enhancement

- feat: добавлен геттер settings для объекта assistant [#207](https://github.com/sberdevices/assistant-client/pull/207) ([@Burzachil](https://github.com/Burzachil))

#### 🐛 Bug Fix

- fix: dev и prod сборки umd [#205](https://github.com/sberdevices/assistant-client/pull/205) ([@Burzachil](https://github.com/Burzachil))
- docs: Откатил изменения предыдущего коммита [#204](https://github.com/sberdevices/assistant-client/pull/204) ([@sasha-tlt](https://github.com/sasha-tlt))
- build: add umd production build [#203](https://github.com/sberdevices/assistant-client/pull/203) ([@Burzachil](https://github.com/Burzachil))

#### Authors: 2

- [@Burzachil](https://github.com/Burzachil)
- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v4.6.0 (Wed Sep 29 2021)

#### 🚀 Enhancement

- feat: Добавлен метод sendText для AssistantHost [#196](https://github.com/sberdevices/assistant-client/pull/196) ([@evgeniysemin](https://github.com/evgeniysemin))

#### 🐛 Bug Fix

- fix: AppInitialData не прокидывается в onData в Салют [#193](https://github.com/sberdevices/assistant-client/pull/193) ([@evgeniysemin](https://github.com/evgeniysemin))

#### Authors: 1

- [@evgeniysemin](https://github.com/evgeniysemin)

---

# v4.5.1 (Tue Sep 28 2021)

#### 🐛 Bug Fix

- fix: merge additionaInfo in updateDevice [#185](https://github.com/sberdevices/assistant-client/pull/185) ([@soulko](https://github.com/soulko))

#### Authors: 1

- Anton Kostenko ([@soulko](https://github.com/soulko))

---

# v4.5.0 (Wed Sep 22 2021)

#### 🚀 Enhancement

- feat: Приложение может управлять ready [#186](https://github.com/sberdevices/assistant-client/pull/186) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v4.4.0 (Wed Sep 22 2021)

#### 🚀 Enhancement

- feat: Добавлен тип AssistantThemeCommand [#195](https://github.com/sberdevices/assistant-client/pull/195) ([@evgeniysemin](https://github.com/evgeniysemin))

#### 🐛 Bug Fix

- chore: Починил запуск todo-canvas-app [#188](https://github.com/sberdevices/assistant-client/pull/188) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 2

- [@evgeniysemin](https://github.com/evgeniysemin)
- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v4.3.1 (Tue Aug 31 2021)

#### 🐛 Bug Fix

- fix: Не работает подписки sendAction в браузере [#184](https://github.com/sberdevices/assistant-client/pull/184) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v4.3.0 (Wed Aug 25 2021)

#### 🚀 Enhancement

- fix: запретил линтеру ругаться на console в некоторых местах [#173](https://github.com/sberdevices/assistant-client/pull/173) (avstarikovich@sberbank.ru)
- feat: запилил рекордер моков для эмуляции vps [#173](https://github.com/sberdevices/assistant-client/pull/173) (avstarikovich@sberbank.ru)

#### 🐛 Bug Fix

- fix: отрефакторил механизм логирования и записи [#173](https://github.com/sberdevices/assistant-client/pull/173) (avstarikovich@sberbank.ru)
- fix: убрал лишнюю абстракцию mockDecoder'a [#173](https://github.com/sberdevices/assistant-client/pull/173) (avstarikovich@sberbank.ru)

#### Authors: 1

- Старикович Антон (avstarikovich@sberbank.ru)

---

# v4.2.0 (Tue Aug 24 2021)

#### 🚀 Enhancement

- feat: вынес метод для voice.stop ([@neolite](https://github.com/neolite))

#### Authors: 1

- Rafkat Galiullin ([@neolite](https://github.com/neolite))

---

# v4.1.0 (Mon Aug 23 2021)

#### 🚀 Enhancement

- feat: Добавить методы setSuggests и setHints [#180](https://github.com/sberdevices/assistant-client/pull/180) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v4.0.4 (Thu Aug 19 2021)

#### 🐛 Bug Fix

- fix: ошибка при оффлайне [#176](https://github.com/sberdevices/assistant-client/pull/176) ([@soulko](https://github.com/soulko))

#### Authors: 1

- Anton Kostenko ([@soulko](https://github.com/soulko))

---

# v4.0.3 (Thu Aug 19 2021)

#### 🐛 Bug Fix

- fix: Не отсылается initPhrase, если userId не меняется [#178](https://github.com/sberdevices/assistant-client/pull/178) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v4.0.2 (Wed Aug 18 2021)

#### 🐛 Bug Fix

- fix: Отправка systemMessage после запроса на пермишены [#175](https://github.com/sberdevices/assistant-client/pull/175) (ankostenko@sberbank.ru)

#### Authors: 1

- Anton Kostenko (ankostenko@sberbank.ru)

---

# v4.0.1 (Thu Aug 12 2021)

#### 🐛 Bug Fix

- fix: changeSettings не должен создавать коннект [#172](https://github.com/sberdevices/assistant-client/pull/172) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v4.0.0 (Tue Aug 10 2021)

#### 💥 Breaking Change

- BREAKING: Запрашивать токен перед соединением [#168](https://github.com/sberdevices/assistant-client/pull/168) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.9.0 (Fri Aug 06 2021)

#### 🚀 Enhancement

- feat: Поддержать команду visiblity [#170](https://github.com/sberdevices/assistant-client/pull/170) ([@maderwin](https://github.com/maderwin))

#### Authors: 1

- Artyom Zakharov ([@maderwin](https://github.com/maderwin))

---

# v3.8.2 (Thu Aug 05 2021)

#### 🐛 Bug Fix

- fix: Доработать саджесты [#171](https://github.com/sberdevices/assistant-client/pull/171) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.8.1 (Wed Aug 04 2021)

#### 🐛 Bug Fix

- fix: Не воспроизводить озвучку, если плеер не готов [#166](https://github.com/sberdevices/assistant-client/pull/166) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.8.0 (Wed Aug 04 2021)

#### 🚀 Enhancement

- feat: Отправлять additionalInfo [#164](https://github.com/sberdevices/assistant-client/pull/164) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.7.4 (Wed Jul 28 2021)

#### 🐛 Bug Fix

- fix: tree shaking и ssr [#163](https://github.com/sberdevices/assistant-client/pull/163) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.7.3 (Thu Jul 22 2021)

#### 🐛 Bug Fix

- fix: остановка слушания при disableListening=true [#160](https://github.com/sberdevices/assistant-client/pull/160) ([@soulko](https://github.com/soulko))

#### Authors: 1

- Anton Kostenko ([@soulko](https://github.com/soulko))

---

# v3.7.2 (Thu Jul 22 2021)

#### 🐛 Bug Fix

- fix: Обновление настроек должно поднимать соединение [#159](https://github.com/sberdevices/assistant-client/pull/159) ([@sasha-tlt](https://github.com/sasha-tlt))
- chore: ошибки компилятора [#159](https://github.com/sberdevices/assistant-client/pull/159) ([@sasha-tlt](https://github.com/sasha-tlt))
- test: Обновление токена [#159](https://github.com/sberdevices/assistant-client/pull/159) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.7.1 (Tue Jul 20 2021)

#### 🐛 Bug Fix

- fix: panel [#132](https://github.com/sberdevices/assistant-client/pull/132) ([@sasha-tlt](https://github.com/sasha-tlt))
- fix: Верстка панели в px по макету [#132](https://github.com/sberdevices/assistant-client/pull/132) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.5.0 (Mon Jul 19 2021)

#### 🚀 Enhancement

- feat: отправка cancel при отмене слушания [#158](https://github.com/sberdevices/assistant-client/pull/158) ([@neolite](https://github.com/neolite))

#### Authors: 1

- Rafkat Galiullin ([@neolite](https://github.com/neolite))

---

# v3.4.3 (Fri Jul 16 2021)

#### 🐛 Bug Fix

- fix: Неразрезолвленный доступ к микрофону [#156](https://github.com/sberdevices/assistant-client/pull/156) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.4.2 (Wed Jul 14 2021)

#### 🐛 Bug Fix

- fix: Добавлен onStart для AssistantPostMessage [#155](https://github.com/sberdevices/assistant-client/pull/155) ([@sasha-tlt](https://github.com/sasha-tlt))
- fix: Не останавливается озвучка, если слушание выключено [#155](https://github.com/sberdevices/assistant-client/pull/155) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.4.1 (Mon Jul 12 2021)

#### 🐛 Bug Fix

- fix: Параметр features отсутсвует у createAssistantDev [#154](https://github.com/sberdevices/assistant-client/pull/154) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.4.0 (Mon Jul 12 2021)

#### 🚀 Enhancement

- feat: Флаг первой сессии должен быть аргументом assistant.start [#152](https://github.com/sberdevices/assistant-client/pull/152) ([@sasha-tlt](https://github.com/sasha-tlt))

#### 🐛 Bug Fix

- test: приветствие [#150](https://github.com/sberdevices/assistant-client/pull/150) ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

#### Authors: 2

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))
- Ivan Ushatsky ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

---

# v3.3.3 (Fri Jul 09 2021)

#### 🐛 Bug Fix

- fix: Ограничить время ожидания стейта от аппа [#147](https://github.com/sberdevices/assistant-client/pull/147) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.3.2 (Thu Jul 08 2021)

#### 🐛 Bug Fix

- fix: Остановка воспроизведения озвучки и последующий старт работают некорректно [#151](https://github.com/sberdevices/assistant-client/pull/151) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.3.1 (Fri Jul 02 2021)

#### 🐛 Bug Fix

- fix: После закрытия аппа, логика взаимодействия с аппом продолжается [#145](https://github.com/sberdevices/assistant-client/pull/145) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.3.0 (Fri Jul 02 2021)

#### 🚀 Enhancement

- feat: Добавить возможность расширять meta [#146](https://github.com/sberdevices/assistant-client/pull/146) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.2.2 (Tue Jun 29 2021)

#### 🐛 Bug Fix

- fix: Не работает лавашар на ios safari [#143](https://github.com/sberdevices/assistant-client/pull/143) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.2.1 (Thu Jun 24 2021)

#### 🐛 Bug Fix

- fix: Не проигрывать озвучку в ответ на текстовые сообщения [#141](https://github.com/sberdevices/assistant-client/pull/141) ([@soulko](https://github.com/soulko))

#### Authors: 1

- Anton Kostenko ([@soulko](https://github.com/soulko))

---

# v3.2.0 (Wed Jun 23 2021)

#### 🚀 Enhancement

- fix: Отправлять настройки звука если был старт [#142](https://github.com/sberdevices/assistant-client/pull/142) ([@sasha-tlt](https://github.com/sasha-tlt))
- feat: Отключение приветствия - параметр для start [#142](https://github.com/sberdevices/assistant-client/pull/142) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.1.3 (Thu Jun 17 2021)

#### 🐛 Bug Fix

- fix: Вызов changeConfiguration крашит сокет [#139](https://github.com/sberdevices/assistant-client/pull/139) ([@sasha-tlt](https://github.com/sasha-tlt))
- fix: Отправка флага первой сессии [#138](https://github.com/sberdevices/assistant-client/pull/138) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.1.2 (Wed Jun 16 2021)

#### 🐛 Bug Fix

- fix: слушание и озвучка в safari ios [#137](https://github.com/sberdevices/assistant-client/pull/137) ([@sasha-tlt](https://github.com/sasha-tlt))
- fix: слушание не работает в firefox [#137](https://github.com/sberdevices/assistant-client/pull/137) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.1.1 (Wed Jun 09 2021)

#### 🐛 Bug Fix

- fix: export ActionCommandEvent type [#135](https://github.com/sberdevices/assistant-client/pull/135) ([@soulko](https://github.com/soulko))

#### Authors: 1

- Anton Kostenko ([@soulko](https://github.com/soulko))

---

# v3.1.0 (Wed Jun 09 2021)

#### 🚀 Enhancement

- feat: эмитить ActionCommand приходящие в systemMessage [#134](https://github.com/sberdevices/assistant-client/pull/134) ([@soulko](https://github.com/soulko))

#### Authors: 1

- Anton Kostenko ([@soulko](https://github.com/soulko))

---

# v3.0.1 (Tue Jun 08 2021)

#### 🐛 Bug Fix

- fix: Отправлять appInfo в ответ на запрос пермишенов [#133](https://github.com/sberdevices/assistant-client/pull/133) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v3.0.0 (Mon Jun 07 2021)

#### 💥 Breaking Change

- BREAKING: createAssistantClient [#129](https://github.com/sberdevices/assistant-client/pull/129) ([@sasha-tlt](https://github.com/sasha-tlt))

#### 🚀 Enhancement

- feat: Частичный переход на типы из @salutejs/types [#129](https://github.com/sberdevices/assistant-client/pull/129) ([@sasha-tlt](https://github.com/sasha-tlt))

#### 🐛 Bug Fix

- chore: конфигурация commitlint [#129](https://github.com/sberdevices/assistant-client/pull/129) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.16.1 (Mon May 24 2021)

#### 🐛 Bug Fix

- chore: тесты [#128](https://github.com/sberdevices/assistant-client/pull/128) ([@sasha-tlt](https://github.com/sasha-tlt))
- fix: обработка ошибок коннекта [#128](https://github.com/sberdevices/assistant-client/pull/128) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.16.0 (Mon May 24 2021)

#### 🚀 Enhancement

- feat: эмитить ошибку при неудачном реконекте сокета [#127](https://github.com/sberdevices/assistant-client/pull/127) ([@soulko](https://github.com/soulko))

#### Authors: 1

- Anton Kostenko ([@soulko](https://github.com/soulko))

---

# v2.15.4 (Mon May 24 2021)

#### 🐛 Bug Fix

- fix: корректная отправка сообщений из очереди после вызова updateDefaults [#126](https://github.com/sberdevices/assistant-client/pull/126) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

# v2.15.3 (Fri May 21 2021)

#### 🐛 Bug Fix

- fix: added sendCancel method [#125](https://github.com/sberdevices/assistant-client/pull/125) ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

#### Authors: 1

- Ivan Ushatsky ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

---

# v2.15.2 (Fri May 21 2021)

#### 🐛 Bug Fix

- fix: updated typing.ts same as .proto [#124](https://github.com/sberdevices/assistant-client/pull/124) ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

#### Authors: 1

- Ivan Ushatsky ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

---

# v2.15.1 (Wed May 19 2021)

#### 🐛 Bug Fix

- fix: added field Message.content.cancel [#123](https://github.com/sberdevices/assistant-client/pull/123) ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

#### Authors: 1

- Ivan Ushatsky ([@ivan-ushatsky](https://github.com/ivan-ushatsky))

---

# v2.15.0 (Wed May 19 2021)

#### 🚀 Enhancement

- feat: assistant host postmessage for iframe [#119](https://github.com/sberdevices/assistant-client/pull/119) ([@Turanchoks](https://github.com/Turanchoks))

#### Authors: 1

- Pavel Remizov ([@Turanchoks](https://github.com/Turanchoks))

---

# v2.14.2 (Mon May 17 2021)

#### 🐛 Bug Fix

- fix: ssr снова работает [#121](https://github.com/sberdevices/assistant-client/pull/121) ([@sasha-tlt](https://github.com/sasha-tlt))

#### Authors: 1

- Alexander Salmin ([@sasha-tlt](https://github.com/sasha-tlt))

---

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
