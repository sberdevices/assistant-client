[![npm ui](https://img.shields.io/npm/v/@sberdevices/assistant-client)](https://www.npmjs.com/package/@sberdevices/assistant-client)

<img src="https://user-images.githubusercontent.com/982072/97004635-0888a900-1546-11eb-8f25-283a0693608e.png" height="150px" width="150px">


Assistant Client — это инструмент для локального тестирования и отладки [Сanvas App](https://smartapp-code.sberdevices.ru/documentation/#/docs/ru/methodology/research/canvasapp) c виртуальным ассистентом. Он реализован в виде JavaScript протокола, который эмулирует среду Android и вызывает нативные методы. Такой подход не требует от разработчика наличия физических устройств и позволяет запустить виртуального ассистента через браузер.

Пример: [Todo смартап](https://github.com/sberdevices/assistant-client/tree/main/examples/todo-canvas-app), который демонстрирует взаимодействие с Assistant Client.

## Оглавление
   * [Конфигурация](#Конфигурация)
     * [Аутентификация](#Аутентификация)
     * [Требования](#требования-к-устройствам)
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
     * [AssistantThemeCommand](#AssistantThemeCommand)
     * [AssistantSmartAppError](#AssistantSmartAppError)
     * [AssistantSmartAppCommand](#AssistantSmartAppCommand)
   * [Пульт](#пульт)
     * [Нажатие кнопок на пульте](#нажатие-кнопок-на-пульте)
     * [Навигация по смартапу](#навигация-по-смартапу)
   * [Утилиты для тестирования](#утилиты-для-тестирования)
     * [Имитация команд ассистента](#имитация-команд-ассистента)
     * [Запись лога сообщений](#запись-лога-сообщений)
     * [Воспроизведение лога сообщений](#воспроизведение-лога-сообщений)
* [FAQ](#faq)

____

## Конфигурация

### Аутентификация

Для работы с Assistant Client необходимо:

1. Завести аккаунт в [SmartApp Studio](https://smartapp-studio.sberdevices.ru/).
2. Создать смартап типа [Сanvas App](https://smartapp-code.sberdevices.ru/documentation/#/docs/ru/methodology/research/canvasapp).
3. Получить токен. Для этого необходимо перейти в *Настройки профиля* > пункт *Auth Token* > опция *Скопировать ключ*.
4. Передать полученный токен в методе `createSmartappDebugger` в параметре `token`.


### Требования к устройствам

Смартапы должны корректно отображаться на разных устройствах (SberBox, SberPortal и др). Для этого необходимо проверять смартап на следующих разрешениях: 559x568, 768x400, 959x400, 1920x1080. Настроить эти разрешения можно на [вкладке Devices Chrome](https://developers.google.com/web/tools/chrome-devtools/device-mode#custom).


### Установка

Для установки Assistant Client выполните следующую команду:

```sh
$ npm i @sberdevices/assistant-client
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
            // Пример фразы для запуска смартапа
            initPhrase: 'Хочу попкорн',
            // Текущее состояние смартапа
            getState,
            // Состояние смартапа, с которым он будет восстановлен при следующем запуске
            getRecoveryState,
            // Необязательные параметры панели, имитирующей панель на реальном устройстве
            nativePanel: {
                // Стартовый текст в поле ввода пользовательского запроса
                defaultText: 'Покажи что-нибудь',
                // Позволяет включить вид панели, максимально приближенный к панели на реальном устройстве
                screenshotMode: false,
                // Атрибут `tabindex` поля ввода пользовательского запроса
                tabIndex: -1,
            },
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
    // Отправка сообщения бэкенду с возможностью подписки на ответ.
    // В обработчик assistant.on('data') сообщение не передается
    const unsubscribe = assistant.sendAction(
        { type: 'some_action_name', payload: { param: 'some' } },
        (data: { type: string; payload: Record<string, unknown> }) => {
            // Обработка данных, переданных от бэкенд
            unsubscribe();
        },
        (error: { code: number; description: string }) => {
            // Обработка ошибки, переданной от бэкенд
        });
}
```

### Альтернативное подключение

Assitant Client доступен для подключения через `<script>`.
Версию assistant сlient можно поменять в src. Доступ к API осуществляется через глобальную переменную `assistant`.

Пример, для разработки и отладки в браузере (в этом случае обязательно подключение react):
```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@sberdevices/assistant-client@4.7.0/umd/assistant.development.min.js"></script>
<script>
  const client = assistant.createSmartappDebugger({
            // Токен из Кабинета разработчика
            token: 'token',
            // Пример фразы для запуска смартапа
            initPhrase: 'Хочу попкорн',
            // Текущее состояние смартапа
            getState: () => ({}),
            // Состояние смартапа, с которым он будет восстановлен при следующем запуске
            getRecoveryState: () => ({}),
        });
</script>
```

Пример, для использования на устройствах:
```html
<script src="https://unpkg.com/@sberdevices/assistant-client@4.7.0/umd/assistant.production.min.js"></script>
<script>
  const client = assistant.createAssistant({ getState: () => ({}), getRecoveryState: () => ({}), });
</script>
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
* голосовые сообщения через кнопку «Салют».

`createSmartappDebugger` используется для локальной отладки и разработки в development среде.

| Параметр         | Обязательный | Описание                                                                   |
| :--------------- | :----------: | :------------------------------------------------------------------------- |
| token            | Да           |  Токен из SmartApp Studio                                             |
| initPhrase       | Да           |  Фраза, которая запускает смартап                                |
| getState         | Да           |  Функция, которая возвращает актуальное состояние смартапа                 |
| getRecoveryState | Нет          |  Функция, которая сохраняет состояние смартапа на момент последнего закрытия |
| settings         | Нет          |  Объект [настроек ассистента](#AssistantSettings)                          |
| nativePanel      | Нет          |  Объект настроек панели ассистента                          |
| surface          | Нет          |  Строка, название поверхности. Возможные значения: `SBERBOX` (SberBox), `STARGATE` (SberPortal), `SATELLITE` (SberBox Top) `SBOL` (приложение СберБанк Онлайн), `COMPANION` (приложение Салют), `TV` (Салют ТВ), `TV_HUAWEI` (Huawei Vision), `TIME` (SberBox Time)  |

#### Свойства [Settings](#AssistantSettings)

| Свойство | Значения     | По умолчанию | Описание                      |
| :------- | :----------: | :----------: | :---------------------------- |
| dubbing  | true / false | true         | Озвучивание ответа ассистента |

#### Свойства `nativePanel`

Все свойства являются необязательными.

| Свойство        | Тип значения  | По умолчанию | Описание                                                                                |
| :-------------- | :-----------: | :----------: | :-------------------------------------------------------------------------------------- |
| defaultText     | string        | Покажи что-нибудь | Стартовый текст в поле ввода пользовательского запроса                          |
| screenshotMode  | boolean       | false        | Позволяет включить вид панели, максимально приближенный к панели на реальном устройстве |
| tabIndex        | number        | -1           | Атрибут `tabindex` поля ввода пользовательского запроса                                 |

### AssistantClient

### cancelTts(): void

Опциональный метод. Вызывается со стороны смартапа для остановки озвучивания ответа (pronounceText). Имеет значение undefined, если устройство не поддерживает данную функцию.

#### close(): void

Вызывается со стороны смартапа для завершения работы.

#### getInitialData(): [AssistantCommands](#AssistantCommands)[]

Возвращает данные, полученные при инициализации смартапа. Передает в Assistant Client текущего ассистента, а не ассистента, выставленного по умолчанию.
Если при запуске смартапа не вызвать команду `getInitialData()`, то команды из `appInitialData` будут отправляться в `on('data')`.

#### getRecoveryState(): unknown

Возвращает состояние, сохраненное при закрытии смартапа. Устройство запоминает последнее состояние, которое возвращает функция `getRecoveryState` при инициализации Assistant Client.

#### on('start', cb: () => void): void

Осуществляет подписку на событие готовности ассистента к работе.

#### on('data', cb: (data: [AssistantCharacterCommand](#AssistantCharacterCommand) | [AssistantNavigationCommand](#AssistantNavigationCommand) | [AssistantInsetsCommand](#AssistantInsetsCommand) | [AssistantThemeCommand](#AssistantThemeCommand) | [AssistantSmartAppError](#AssistantSmartAppError) | [AssistantSmartAppCommand](#AssistantSmartAppCommand)) => {}): void

Осуществляет подписку на событие получения данных с бэкенда. Получает команды из `appInitialData`, если при запуске смартапа не была вызвана команда `getInitialData()`.

#### sendAction({ type: string; payload: Record<string, unknown> }, params?: { name?: string; requestId?: string }) => void

Передает ошибки и обработчики ответа от бэкенда. <br>
`sendAction` — отправляет server-action и типизирует сообщения data и error.<br>
`clear()` — делает отписку от сообщений бэкенда. Это означает, что сообщения не будут переданы в обработчик `assistant.on('data')`


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

Отправляет события с фронтенда на бэкенд через ассистента.
Первый параметр (обязательный) принимает данные для отправки.
Второй параметр (опциональный) принимает обработчик ответа (на переданные первым параметром данные). В этом случае в `on('data')` ответ не приходит.
Возвращает функцию, вызов которой отменяет обработчик ответа.

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

Подменяет callback, который возвращает актуальное состояние смартапа.

#### setGetRecoveryState(nextGetRecoveryState: () => unknown)

Подменяет callback, который возвращает объект, доступный только при следующем запуске смартапа. Данные приходят при вызове `getRecoveryState`.


____


## Форматы объектов

### `AssistantAppState`

Объект `AssistantAppState` — текущее состояние смартапа, которое не хранится в платформе или сценарии. Каждый раз, когда пользователь начинает говорить, Assistant Client вызывает `getState`, чтобы получить и передать в бэкенд состояние экрана пользователя.
То, что происходит на экране у пользователя и как он взаимодействует со смартапом в конкретный момент времени — ответственность смартапа. Assistant Client в данном случае — это буфер, который только передает состояние платформе или сценарию.


```typescript
interface AssistantAppState {
  // Любые данные, которые могут потребоваться в бэкенде для принятия решений
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
  action?: Action | { type: string };
  // Дополнительные данные для бэкенд
  [key: string]: unknown;
}
```

Например, когда пользователь говорит «Покажи 1», бэкенд должен понимать, что скрывается за единицей (то есть, какой элемент у пользователя пронумерован этой цифрой). Ниже пример состояния, который позволяет понять бэкенду, что, называя «1», пользователь хочет чипсы.

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

Объект `AssistantServerAction` — это любое сообщение, которое отправляется с фронтенда на бэкенд. Оно может быть привязано к ui-элементу и приходить с бэкенд, или формироваться самостоятельно фронтовой частью при обработке событий внутри WebView смартапа.

```typescript
interface AssistantServerAction {
  // Тип Server Action
  type: string;
  // Любые параметры
  payload?: Record<string, unknown>;
}
```

### `AssistantCharacterCommand`

Объект `AssistantCharacterCommand` — информирует смартап о текущем персонаже (Сбер, Афина или Джой). Персонаж может быть изменен в любой момент по инициативе пользователя. Поэтому разработчик может дополнительно добавить обработку таких изменений.

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

Объект `AssistantNavigationCommand` — команда навигации пользователя по смартапу (вперед, назад, дальше и т. д.). В платформе виртуального ассистента есть стандартные фразы, которые приходят и обрабатываются одинаково для всех смартапов.

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

Объект `AssistantInsetsCommand` — команда, которая сообщает смартапу о том, что поверх него будет отображен нативный UI и его размеры. В `insets` передаются отступы от краев экрана. Их нужно соблюдать, чтобы не было наложения нативных UI элементов и контента смартапа.

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

### `AssistantThemeCommand`

Объект `AssistantInsetsCommand` - команда, которая сообщает смартапу текущую тему платформы — тёмная или светлая. По умолчанию нужно использовать тёмную тему.

```typescript
interface AssistantThemeCommand {
   type: 'theme';
   theme: {
      name: 'dark' | 'light'
   }
}
```

### `AssistantSmartAppError`

Объект `AssistantSmartAppError` — это уведомление об ошибке.

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

Объект `AssistantSmartAppCommand` — это команда передачи смартапу любых данных с бэкенда.

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

### Нажатие кнопок на пульте

Для получения и обработки нажатия кнопок на пульте от SberBox необходимо подписаться на события нажатия клавиш клавиатуры. Пример ниже:

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

### Навигация по страницам смартапа

Для корректной обработки кнопки `back` и навигации по страницам смартапа необходимо построить историю переходов, используя `History API`. Например, подписываемся на `window.onpopstate` и реализуем изменение страницы в обработчике этого события. Когда хотим выполнить изменение страницы, вызываем `window.history.pushState`:

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

Для имитации команд от ассистента используйте утилиту `createAssistantHostMock`. Ниже приведен пример использования. Полный пример доступен [по ссылке](https://github.com/sberdevices/assistant-client/tree/main/examples/todo-canvas-app).

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

`createAssistantHostMock` можно вызывать только при использовании [`createAssistant`](#createAssistant). Например, при использовании `cypress` функция инициализации ассистента может выглядеть следующим образом:

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

Подписка на экшены фронтенда с определенным type, который передается первым параметром.

#### removeActionHandler(actionType: string): void

Отмена подписки от экшенов фронтенда.

#### receiveCommand(command: AssistantClientCommand): Promise<void>

Эмуляция команды, полученной от бэкенда. Команда приходит подписчикам `AssistantClient.onData`.

#### waitAction(onAction?: () => void): Promise<{ state: AssistantAppState; action: AssistantServerAction; name?: string; requestId?: string; }>

Получение `promise`, который будет разрезолвлен при следующем вызове `AssistantClient.sendData`

#### onReady(cb: () => void): void

Подписка на события готовности утилиты. Параметр `cb` будет вызван по готовности к работе.


### Запись лога сообщений

В режиме разработки есть возможность записать и скачать лог сообщений.
Управление записью осуществляется кнопками `start` и `stop`. Кнопка `save` сохранит файл с логом в загрузки браузера. Пример активации панели управления записью лога:

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

### Воспроизведение лога сообщений

Пример пошагового воспроизведения лога сообщений. Входящие сообщения от ассистента будут последовательно переданы подписчикам `AssistantClient.on('data')`.

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

Передает следующее сообщение от ассистента в AssistantClient (может содержать несколько команд). Возвращает флаг наличия в логе следующих сообщений от ассистента.

#### play(): void

Последовательно передает все сообщения лога от ассистента в AssistantClient.

#### getNextAction: { action: AssistantServerAction; name?: string; requestId?: string; }

Возвращает следующее сообщение от AssistantClient (вызов `sendData`) в ассистент. Можно использовать для сравнения эталонного сообщения (из лога) и текущего в тесте.

#### setRecord(record: AssistantRecord): void

Загружает указанную запись в плеер.


____


## FAQ

### Не работает озвучка и/или микрофон в браузере

Нужно перейти в [настройки сайта](https://support.google.com/chrome/answer/114662) и разрешить доступ к звуку и микрофону.
