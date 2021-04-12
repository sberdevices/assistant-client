[![npm ui](https://img.shields.io/npm/v/@sberdevices/assistant-client)](https://www.npmjs.com/package/@sberdevices/assistant-client)

<img src="https://user-images.githubusercontent.com/982072/97004635-0888a900-1546-11eb-8f25-283a0693608e.png" height="150px" width="150px">


Assistant Client - это инструмент для локального тестирования и отладки [Сanvas App](https://smartapp-code.sberdevices.ru/documentation/#/docs/ru/methodology/research/canvasapp) c виртуальным ассистентом. Он реализован в виде JavaScript протокола, который эмулирует среду Android и вызывает нативные методы. Такой подход не требует от разработчика наличия физических устройств и позволяет запустить виртуального ассистента через браузер.

Пример использования - [небольшое Todo приложение](https://github.com/sberdevices/assistant-client/tree/main/examples/todo-canvas-app), демонстрирует пример взаимодействия с Assistant Client.

## Оглавление
   * [Конфигурация](#Конфигурация)
     * [Аутентификация](#Аутентификация)
     * [Установка](#Установка)
     * [Использование](#пример-использования)
   * [API](#API)
     * [createAssistant](#createAssistant)
     * [createSmartappDebugger](#createSmartappDebugger)
     * [AssistantClient](#assistantclient)
   * [Форматы объектов](#форматы-объектов)
     * [AssistantAppState](#AssistantAppState)
     * [AssistantServerAction](#AssistantServerAction)
     * [AssistantCharacterCommand](#AssistantCharacterCommand)
     * [AssistantNavigationCommand](#AssistantNavigationCommand)
     * [AssistantInsetsCommand](#AssistantInsetsCommand)
     * [AssistantSmartAppError](#AssistantSmartAppError)
     * [AssistantSmartAppCommand](#AssistantSmartAppCommand)
   * [Пульт](#пульт)
     * [Навигация по страницам приложения](#навигация-по-страницам-приложения)
   * [Утилиты для тестирования](#утилиты-для-тестирования)
   * [Требования](#требования-к-устройствам)
   * [FAQ](#faq)

____

## Конфигурация

### Аутентификация

Для работы с Assistant Client необходимо:

1. Завести аккаунт в [SmartApp Studio](https://smartapp-studio.sberdevices.ru/).
2. Создать приложение с типом [Сanvas App](https://smartapp-code.sberdevices.ru/documentation/#/docs/ru/methodology/research/canvasapp).
3. Получить токен в Кабинете разработчика и передать его в запросе.

Для получения токена необходимо авторизоваться в [SmartApp Studio](https://smartapp-studio.sberdevices.ru/login) и в рамках Кабинета разработчика перейти в *Настройки профиля* > пункт *Auth Token* > опция *Скопировать ключ*. Полученный токен необходимо передавать в методе `createSmartappDebugger` в параметре `token`.


### Установка

Для установки Assistant Client выполните следующую команду:

```sh
$ npm i @sberdevices/assistant-client
```

#### Альтернативное подключение

Assitant-client доступен для подключения через `<script>`. В этом случае, подключение react обязательно. Версии react и assistant-client можно поменять в src.
```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@sberdevices/assistant-client@2.1.0/umd/assistant.min.js"></script>
```


### Пример использования

```typescript
// Функция createSmartappDebugger используется в development среде. В production среде необходимо использовать createAssistant.
import { createAssistant, createSmartappDebugger } from '@sberdevices/assistant-client';

const initialize = (getState, getRecoveryState) => {
    if (process.env.NODE_ENV === 'development') {
        return createSmartappDebugger({
            // Токен из Кабинета разработчика
            token: 'token',
            // Пример фразы для запуска приложения
            initPhrase: 'Хочу попкорн',
            // Функция, которая возвращает текущее состояние приложения
            getState,
            // Функция, возвращающая состояние приложения, с которым приложение будет восстановлено при следующем запуске
            getRecoveryState,
        });
    }

	  // Только для среды production
    return createAssistant({ getState, getRecoveryState });
}

...

const assistant = initialize(() => state, () => recoveryState);
assistant.on('data', (command) => {
    // Подписка на команды ассистента, в т.ч. команда инициализации смартапа.
    // Ниже представлен пример обработки голосовых команд "ниже"/"выше"
    if (command.navigation) {
        switch(command.navigation.command) {
            case 'UP':
                window.scrollTo(0, 0);
                break;
            case 'DOWN':
                window.scrollTo(0, 1000);
                break;
        }
    }
});

const handleOnClick = () => {
    // Отправка сообщения ассистенту с фронтенд.
    // Структура может меняться на усмотрение разработчика, в зависимости от бэкенд
    assistant.sendData({ action: { type: 'some_action_name', payload: { param: 'some' } } });
};

const handleOnRefreshClick = () => {
    // Отправка сообщения бэкенду, с возможностью подписки на ответ.
    // В обработчик assistant.on('data'), сообщение передано не будет
    const unsubscribe = assistant.sendAction(
        { type: 'some_action_name', payload: { param: 'some' } },
        (data: { type: string; payload: Record<string, unknown> }) => {
            // здесь обработка данных, переданных от бэкенд
            unsubscribe();
        },
        (error: { code: number; description: string }) => {
            // обработка ошибки, переданной от бэкенд
        });
}
```

____


## API

### `createAssistant`

Создает экземпляр [`AssistantClient`](#assistantclient) для запуска виртуального ассистента. Используется на устройствах в production среде.

| Параметр         | Обязательный | Описание                                                                   |
| :--------------- | :------: | :------------------------------------------------------------------------- |
| getState         | Да           |  Функция, которая возвращает актуальное состояние смартапа                 |
| getRecoveryState | Нет          |  Функция, которая сохраняет состояние смартапа на момент последнего закрытия |



### `createSmartappDebugger`

Создает экземпляр [`AssistantClient`](#assistantclient) и добавляет на экран браузера панель с голосовым ассистентом (подобно устройствам). Панель ассистента находится в нижней части отрисованного экрана и позволяет отправлять виртуальному ассистенту следующие типы сообщений:
* текстовые сообщения через текстовое поле ввода;
* голосовые сообщения через кнопку "Салют".

`createSmartappDebugger` используется для локальной отладки и разработки в development среде (Dev).

| Параметр         | Обязательный | Описание                                                                   |
| :--------------- | :----------: | :------------------------------------------------------------------------- |
| token            | Да           |  Токен из Кабинета Разработчика                                             |
| initPhrase       | Да           |  Фраза, которая запускает приложение                                |
| getState         | Да           |  Функция, которая возвращает актуальное состояние смартапа                 |
| getRecoveryState | Нет          |  Функция, которая сохраняет состояние смартапа на момент последнего закрытия |
| settings         | Нет          |  Объект [настроек ассистента](#AssistantSettings)                          |

#### Свойства [Settings](#AssistantSettings)

| Свойство | Значения     | По умолчанию | Описание                      |
| :------- | :----------: | :----------: | :---------------------------- |
| dubbing  | true / false | true         | Озвучивание ответа ассистента |


### AssistantClient

#### close(): void

Вызывается со стороны смартапа для завершения работы.

#### getInitialData(): [AssistantCommands](#AssistantCommands)[]

Возвращает данные, полученные при инициализации смартапа.

#### getRecoveryState(): unknown

Возвращает состояние, сохраненное при закрытии приложения. Устройство запоминает последнее состояние, которое возвращает функция getRecoveryState при инициализации Assistant Client.

#### on('start', cb: () => void): void

Осуществляет подписку на событие готовности ассистента к работе.

#### on('data', cb: (data: [AssistantCharacterCommand](#AssistantCharacterCommand) | [AssistantNavigationCommand](#AssistantNavigationCommand) | [AssistantInsetsCommand](#AssistantInsetsCommand) | [AssistantSmartAppError](#AssistantSmartAppError) | [AssistantSmartAppCommand](#AssistantSmartAppCommand)) => {}): void

Осуществляет подписку на событие получения данных с бэкенд.

#### sendAction({ type: string; payload: Record<string, unknown> }, params?: { name?: string; requestId?: string }) => void

Отправляет команду бэкенду, позволяет передать обработчики ответа бэкенда и ошибки, полученной от бэкенд. Возвращает функцию для отписки.
`sendAction` - дженерик, позволяет типизировать сообщения data и error. Вызов `clear()` выполняет отписку от сообщений бэкенда.
Обработчик assistant.on('data') не получит эти сообщения бэкенда.


Пример:
```ts
import { AssistantSmartAppCommand } from '@sberdevices/assistant-client';

interface SomeBackendMessage extends AssistantSmartAppCommand['smart_app_data'] {
  type: 'target_action',
  payload: {
    data: ['some_data'],
  },
}

const unsubscribe = assistant.sendAction<SomeBackendMessage>({ type: 'some_action_name', payload: { someParam: 'some_value' } },
  ({ payload }) => {
    // обработка payload.data
    unsubscribe();
  }, (error) => {});
```

#### sendData({ action: [AssistantServerAction](#AssistantServerAction), requestId?: string }, onData?: data: [AssistantCharacterCommand](#AssistantCharacterCommand) | [AssistantNavigationCommand](#AssistantNavigationCommand) | [AssistantSmartAppError](#AssistantSmartAppError) | [AssistantSmartAppCommand](#AssistantSmartAppCommand)) => void): () => void

Отправляет события с фронтенд на бэкенд через ассистента.
Первым параметром (обязательным) - принимает данные для отправки.
Вторым параметром (опциональным) - принимает обработчик ответа (на переданные первым параметром данные); в этом случае - в on('data') ответ не придет.
Возвращает функцию - вызов которой отменяет обработчик ответа.

Пример с обработкой ответа:
```ts
...

const unsubscribe = assistant.sendData({ action: { type: 'some_action_name' } }, (data: command) => {
  if (data.type === 'smart_app_data' && data.smart_app_data.type === 'target_action') {
    unsubsribe();
    ... // обработка команды
  }
});

```

#### setGetState(nextGetState: () => [AssistantAppState](#AssistantAppState)): void

Подменяет callback, который возвращает актуальное состояние приложения.

#### setGetRecoveryState(nextGetRecoveryState: () => unknown)

Подменяет callback, который возвращает объект, доступный только при следующем запуске приложения. Данные приходят при вызове getRecoveryState.


____


## Форматы объектов

### `AssistantAppState`

Объект `AssistantAppState` — текущее состояние смартапа, которое не хранится в платформе или сценарии. Каждый раз, когда пользователь начинает говорить, Assistant Client вызывает getState, чтобы получить и передать в бэкенд состояние экрана пользователя.
То, что происходит на экране у пользователя и как он взаимодействует со смартапом в конкретный момент времени - ответственность смартапа. Assistant Client в данном случае - это буфер, который только передает состояние платформе или сценарию.


```typescript
interface AssistantAppState {
  // Любые данные, которые могут потребоваться в бэкенд для принятия решений
  [key: string]: unknown;
  item_selector?: {
    ignored_words?: string[];
    // Список соответствий между голосовыми командами и действиями в приложении
    items: AssistantViewItem[];
  };
}

interface AssistantViewItem {
  // Уникальный (в рамках items) порядковый номер элемента, который назначается смартапом
  number?: number;
  // Уникальный id элемента
  id?: string;
  // Ключевая фраза, которая должна приводить к данному действию
  title?: string;
  // Фразы-синонимы, которые должны приводить к данному действию
  aliases?: string[];
  // Проксирование action обратно на бэкенд
  server_action?: AssistantServerAction;
  // Выполнение действия от имени пользователя
  action?: AssistantAction | { type: string };
  // Дополнительные данные для бэкенд
  [key: string]: unknown;
}
```

Например, когда пользователь говорит "Покажи 1", бэкенд должен понимать, что скрывается за единицей (то есть, какой элемент у пользователя пронумерован этой цифрой). Ниже пример состояния, который позволяет понять бэкенду, что, называя "1", пользователь хочет чипсы.

```js
{
  item_selector: {
    ignored_words: ["покажи"],
    items: [
      { title: 'Сладкий попкорн' },
      { title: 'Соленый попкорн' },
      { title: 'Чипсы', number: 1 },
      { title: 'Начос', number: 2 },
      { title: 'Кола', number: 3 }
    ]
  }
}
```

### `AssistantServerAction`

Объект `AssistantServerAction` - это любое сообщение, которое отправляется с фронтенда на бэкенд. Оно может быть привязано к ui-элементу и приходить с бэкенд, или формироваться самостоятельно фронтовой частью приложения при обработке событий внутри WebView смартапа.

```typescript
interface AssistantServerAction {
  // Тип Server Action
  type: string;
  // Любые параметры
  payload?: Record<string, unknown>;
}
```

### `AssistantCharacterCommand`

Объект `AssistantCharacterCommand` - информирует смартап о текущем персонаже (Сбер, Афина или Джой). Персонаж может быть изменен в любой момент по инициативе пользователя. Поэтому разработчик может дополнительно добавить обработку таких изменений.

```typescript
interface AssistantCharacterCommand {
  type: "character";
  character: {
    id: "sber" | "eva" | "joy";
  };
  sdk_meta: {
    requestId: string;
  };
}
```

### `AssistantNavigationCommand`

Объект `AssistantNavigationCommand` - команда навигации пользователя по смартапу (например, "вперед, назад, дальше" и т.д.). В платформе виртуального ассистента есть стандартные фразы, которые приходят и обрабатываются одинаково для всех смартапов.

```typescript
interface AssistantNavigationCommand {
  // Тип команды
  type: "navigation";
  // Навигационная команда (направление навигации)
  navigation: { command: "UP" | "DOWN" | "LEFT" | "RIGHT" | "FORWARD" };
  sdk_meta: {
    requestId: string;
  };
}
```

### `AssistantInsetsCommand`

Объект `AssistantInsetsCommand` - команда, которая сообщает смартапу о том, что поверх него будет отображен нативный UI и его размеры.

```typescript
interface AssistantInsetsCommand {
  type: 'insets';
  insets: {
    left: number;    //px
    top: number;     //px
    right: number;   //px
    bottom: number;  //px
  };
}
```

### `AssistantSmartAppError`

Объект `AssistantSmartAppError` - это уведомление об ошибке.

```typescript
interface AssistantSmartAppError {
  type: 'smart_app_error';
  smart_app_error: {
    code: number;
    description: string;
  };
}
```

### `AssistantSmartAppCommand`

Объект `AssistantSmartAppCommand` - это команда передачи смартапу любых данных с бэкенд.

```typescript
interface AssistantSmartAppCommand {
  // Тип команды
  type: "smart_app_data";
  smart_app_data: {
    type: string;
    // Любые данные, которые нужны смартапу
    payload: Record<string, unknown>;
  };
  sdk_meta: {
    requestId: string;
  };
}
```

____


## Пульт

Для получения и обработки нажатия клавиш пульта сбербокс необходимо подписаться на события нажатия клавиш клавиатуры. Пример ниже:

```javascript
window.addEventListener('keydown', (event) => {
  switch(event.code) {
    case 'ArrowDown':
      // вниз
      break;
     case 'ArrowUp':
      // вверх
      break;
     case 'ArrowLeft':
      // влево
      break;
     case 'ArrowRight':
      // вправо
      break;
     case 'Enter':
      // ок
     break;
  }
});
```

### Навигация по страницам приложения

Для корректной обработки кнопки `back` и навигации по страницам приложения - необходимо строить историю переходов, используя `History API`. Например, подписываемся на `window.onpopstate` и реализуем изменение страницы в обработчике этого события; когда хотим выполнить изменение страницы вызываем `window.history.pushState`:

```typescript

const [page, setPage] = useState<string>('previous');

const handleNext = () => {
  window.history.pushState({ page: 'next' }, ''); // инициируем переход на следующую страницу
}

useEffect(() => {
  window.history.replaceState({ page: 'previous' }, ''); // устанавливаем текущую страницу
  window.onpopstate = ({ state }) => {
    setPage(state.page); // выполняем переход на заданную страницу: next - по вызову handleNext или previous - по нажатию кнопки back
  }
}, []);

```
____


## Утилиты для тестирования

### Имитация команд ассистента

Для имитации команд от ассистента реализована утилита `createAssistantHostMock`. Ниже приведен пример использования, полный пример можно посмотреть [здесь](https://github.com/sberdevices/assistant-client/tree/main/examples/todo-canvas-app).

```typescript
import { createAssistantHostMock } from '@sberdevices/assistant-client';

const ITEMS = [
  {
    id: 1,
    title: 'Купить молоко',
    number: 1,
  },
  {
    id: 2,
    title: 'Купить хлеб',
    number: 2,
  },
];

describe('Мой список дел', () => {
  it('По клику на чекбокс - ожидаем экшен "done" c заголовком выбранного элемента', (done) => {
    cy.visit('/')
      .window()
      .then((window) => {
        const mock = createAssistantHostMock({ context: window });
        const selected = ITEMS[1];
        mock.onReady(() => {
          // эмулируем инициализационную команду от бэкенда со списком задач
          mock.receiveCommand({
            type: 'smart_app_data',
            action: {
              type: 'init',
              notes: [...ITEMS],
            },
          })
          .then(() =>
            // ожидаем вызов assistantClient.sendData
            mock.waitAction(() =>
                // эмулируем отметку выполнения пользователем, который должен вызвать sendData({ action: { type: 'done } })
                window.document.getElementById(`checkbox-note-${selected.id}`).click(),
            ),
          )
          .then(({ action, state }) => {
            expect(action.type).to.equal('done'); // ожидаем экшен data_note
            expect(action.payload?.title).to.equal(selected.title); // ожидаем в параметрах title экшена
            expect(state?.item_selector.items).to.deep.equal(ITEMS); // ожидаем отправку списка в стейте
            done();
          });
        });
      });
  });
});
```

Вызывать `createAssistantHostMock` только при использовании [`createAssistant`](#createAssistant). Например, при использовании cypress, функция инициализации ассистента может выглядеть следующим образом:

```typescript
import { createAssistant, createSmartappDebugger } from '@sberdevices/assistant-client';

const initializeAssistant = (getState: AssistantAppState) => {
    if (process.env.NODE_ENV === 'development' && window.Cypress == null) {
        return createSmartappDebugger({
            token: process.env.REACT_APP_TOKEN ?? '',
            initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
            getState,
        });
    }
    
    if (window.cypress) {
      window.appInitialData = [];
    }

    return createAssistant({ getState });
};
```

#### addActionHandler(actionType: string, handler: (action: AssistantServerAction) => void): void

Подписаться на экшены фронтенда с определенным type, переданным первым параметром.

#### removeActionHandler(actionType: string): void

Отписаться от экшенов фронтенда.

#### receiveCommand(command: AssistantClientCommand): Promise<void>

Эмулирует команду, полученную от бэкенда. Команда придет подписчикам `AssistantClient.onData`.

#### waitAction(onAction?: () => void): Promise<{ state: AssistantAppState; action: AssistantServerAction; name?: string; requestId?: string; }>

Возвращает `promise`, который будет разрезолвлен при следующем вызове `AssistantClient.sendData`

#### onReady(cb: () => void): void

Подписаться на события готовности утилиты, cb будет вызван по готовности к работе.


### Запись лога сообщений между ассистентом и фронтендом

В режиме разработки есть возможность записать и скачать лог сообщений.
Управление записью осуществляется кнопками start и stop, кнопка save сохранит файл с логом в загрузки браузера. Пример активации панели управления записью лога:

```typescript
import { createSmartappDebugger } from '@sberdevices/assistant-client';

const assistant = createSmartappDebugger({
    token: process.env.REACT_APP_TOKEN ?? '',
    initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
    getState,
    enableRecord: true, // активируем функцию записи лога
    recordParams: {
      defaultActive: true, // включать запись при старте приложения (по-умолчанию = true)
    }
  });
```

### Воспроизведение лога сообщений между ассистентом и фронтендом

Пример пошагового воспроизведения лога сообщений, входящие сообщения, от ассистента, будут последовательно переданы подписчикам AssistantClient.on('data').

```typescript
import { createRecordPlayer } from '@sberdevices/assistant-client';
import assistantLog from './assistant-log.json';

const player = createRecordPlayer(assistantLog);
let end = false;

while(!end) {
  end = !player.continue();
}
```

#### continue(): boolean

Передает следующее сообщение от ассистента в AssistantClient (может содержать несколько команд), возвращает флаг наличия в логе следующих сообщений от ассистента.

#### play(): void

Последовательно передает все сообщения лога от ассистента в AssistantClient.

#### getNextAction: { action: AssistantServerAction; name?: string; requestId?: string; }

Возвращает следующее сообщение от AssistantClient (вызов sendData) в ассистент. Можно использовать для сравнения эталонного сообщения (из лога) и текущего в тесте.

#### setRecord(record: AssistantRecord): void

Загрузить указанную запись в плеер.

____


## Требования к устройствам

Смартапы должны корректно отображаться на разных устройствах (SberBox, SberPortal и др). Для этого необходимо проверять смартап на следующих разрешениях: 559x568, 768x400, 959x400, 1920x1080. Настроить эти разрешения можно на [вкладке Devices Chrome](https://developers.google.com/web/tools/chrome-devtools/device-mode#custom).

____


## FAQ

### Не работает озвучка и/или микрофон в браузере

Нужно перейти в [настройки сайта](https://support.google.com/chrome/answer/114662) и разрешить доступ к звуку и микрофону.
