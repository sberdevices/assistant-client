# Sberdevices Assistant Client

Assistant Client - это инструмент для тестирования и отладки СanvasApps c Виртуальным Ассистентом (ВА).

Технически Assistant Client представляет собой интегрируемый в WebView JS-код, который связан биндингами с нативным кодом операционной системы. В режиме разработки используется реализация протокола на JavaScript (эмулирует среду Android), что позволяет запускать ВА в браузере.

Установка:

```sh
$ npm install @sberdevices/assistant-client
```

## Quickstart

```typescript
import { createAssistant, createAssistantDev, AssistantServerAction, AssistantCharacterCommand, AssistantNavigationCommand, AssistantSmartAppCommand, AssistantAppState } from '@sberdevices/assistant-client';

const initialize = (getState: AssistantAppState): {
    getInitialData: () => AssistantCommands[];
    on: ('start' || 'data', cb: (data?: AssistantCharacterCommand | AssistantNavigationCommand | AssistantSmartAppCommand) => void) => void;
    sendData: (data: AssistantServerAction) => void;
    setGetState: (getState: () => AssistantAppState) => void;
} => {
    if (process.env.NODE_ENV === 'development') {
        return createAssistantDev({
            url: 'wss://...', // стенд
            surface: '...', // поверхность
            channel: '...', // канал
            getState,
            initPhrase: 'Хочу попкорн', // фраза для запуска аппа
            nativePanel: {
                defaultText: 'Кутузовский д.32', // текст в панели
            },
        });
    }

    return createAssistant({ getState });
}

...

const assistant = initialize(() => state);
assistant.on('data', (command: AssistantNavigationCommand) => {
    // подписка на команды ассистента, в т.ч. команда инициализации смартапа
    if (command.navigation) {
        switch(command.navigation.command.direction) {
            case 'UP':
                window.scrollTo(0, 0);
                break;
            case 'DOWN':
                window.scrollTo(0, 1000);
                break;
            ...
        }
    }
    ...
});

const handleOnClick = () => {
    // отправка ServerAction
    assistant.sendData({ action_id: 'some_action_name' });
};
```

## API

### `createAssistant`

Создает экземпляр [`AssistantClient`](#AssistantClient), обязательный параметр `getState` - функция, которая возвращает актуальное состояние смартапа при каждом обращении к бэкенду.

### `createAssistantDev`

Создает экземпляр [`AssistantClient`](#AssistantClient), добавляет на экран браузера панель с голосовым ассистентом, подобно устройствам. Панель позволяет вводить команды с клавиатуры и голосом. Также активируется озвучка ассистента.

| Параметр      | Dev only | Описание                                                                |
| :------------ | :------: | :---------------------------------------------------------------------- |
| getState\*    |    []    | Функция, которая возвращает актуальное состояние смартапа.              |
| url\*         |   [x]    | Стенд.                                                                  |
| userChannel\* |   [x]    | Канал.                                                                  |
| surface\*     |   [x]    | Поверхность.                                                            |
| initPhrase\*  |   [x]    | Текст команды для запуска смартапа (закажи попкорн и т.п).              |
| nativePanel   |   [x]    | Конфигурация [панели ассистента](#AssistantPanel).                      |
| userId        |   [x]    | Идентификатор пользователя.                                             |
| token         |   [x]    | Токен.                                                                  |
| enableRecord  |   [x]    | Флаг активации функции [записи диалога](#AssistantRecord) (true/false). |

#### Панель ассистента

<a name="AssistantPanel"></a>

По-умолчанию, в режиме разработки, панель отрисовывается. Чтобы выключить панель ассистента в режиме разработки, необходимо установить значение `null`, соответствующему параметру.

```typescript
import { createAssistantDev } from '@sberdevices/assistant-client';

const assistant = createAssistantDev({ ..., nativePanel: null });
```

Первоначальный текст в панели ассистента конфигурируется установкой параметра `defaultText`.

```typescript
import { createAssistantDev } from '@sberdevices/assistant-client';

const assistant = createAssistantDev({ ..., nativePanel: { defaultText: 'Покажи 1' } });
```

#### Логирование диалога с ассистентом

<a name="AssistantRecord"></a>

В режиме разработки, в целях отладки и тестирования, есть возможность получить файл с записью разговора ассистента. По-умолчанию, эта возможность деактирована, для активации необходимо установить значение параметра `enableRecord: true`. В результате, на экране будут отрисованы кнопки управления записью диалога (start/stop/save).

```typescript
import { createAssistantDev } from '@sberdevices/assistant-client';

createAssistantDev({
    getState,
    ...
    enableRecord: true
});
```

`createRecordPlayer` - возвращает `RecordPlayer`, предоставляет возможность воспроизведения диалога. Принимает два необязательных параметра - запись и объект window (для взаимодействия с assistant-client).

```typescript
interface RecordPlayer {
  /* проиграть следующую реплику, возвращает флаг наличия следующей реплики */
  continue: () => boolean;
  /* проиграть весь диалог до конца */
  play: () => void;
  /* Установить запись */
  setRecord: (record: AssistantRecord) => void;
}
```

Пример интеграции с cypress:

```typescript
import { createRecordPlayer } from '@sberdevices/assistant-client';

describe('Тест', () => {
    it('Запуск аппа', () => {
        cy.fixture('app_start.json').then((record) => {
            cy.window().then((win) => {
                const player = createRecordPlayer(record, win);
                player.play();
            });
        });
    });
);
```

### AssistantClient

<a name="AssistantClient"></a>

#### getInitialData(): [AssistantCommands](#AssistantCommands)[]

Возвращает данные, полученные при инициализации смартапа.


#### on('start', cb: () => void): void

Подписка на событие готовности ассистента к работе.


#### on('data', cb: (data: [AssistantCharacterCommand](#AssistantCharacterCommand) | [AssistantNavigationCommand](#AssistantNavigationCommand) | [AssistantSmartAppCommand](#AssistantSmartAppCommand)) => {}): void

Подписка на событие получения данных от бэкенда.


#### sendData(data: [AssistantServerAction](#AssistantServerAction)): void

Отправляет сервер-экшен, который будет передан бэкенду.


#### setGetState(nextGetState: () => [AssistantAppState](#AssistantAppState)): void

Подменяет колбек, возвращаюший актуальное состояние приложения.


#### Формат объекта `AssistantAppState`

<a name="AssistantAppState"></a>

Объект `AssistantAppState` — текущее состояние смартапа, которое не хранится в платформе или сценарии. То, что происходит на экране у пользователя и как пользователь может взамодействовать с смартапа в конкретный момент времени - ответственность смартапа. Assistant Client, в данном случае, некий буфер, который хранит состояние и предоставляет его платформе и сценарию смартапа.

Каждый раз, когда пользователь начинает говорить, Assistant Client вызывает коллбек getState, чтобы получить и передать бэкенду состояние экрана пользователя.

```typescript
interface AssistantAppState {
  /* Любые данные, которые могут потребоваться Backend'у для принятия решений */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  item_selector?: {
    ignored_words?: string[];
    /* Список соответствий голосовых команд действиям в веб-приложении */
    items: AssistantViewItem[];
  };
}

interface AssistantViewItem {
  /* Порядковый номер элемента, назначается смартапом, уникален в рамках items */
  number?: number;
  /* Уникальный id элемента */
  id?: string;
  /* Ключевая фраза, которая должна приводить к данному действию */
  title?: string;
  /* Фразы-синонимы, которые должны быть расценены как данное действие */
  aliases?: string[];
  /* Сервер экшен, проксирует action обратно на бекэнд. */
  server_action?: AssistantServerAction;
  /* Экшен, выполяет действие от имени пользователя */
  action?: AssistantAction;
  /* Дополнительные данные для бэкенда */
  [key: string]: any;
}
```

Например, когда пользователь говорит "Покажи 1", бэкенду нужно понимать что скрывается за единицей (какой элемент у пользователя пронумерован единицей). Ниже пример стейта, который позволяет понять бэкенду, что пользователь хочет чипсы.

```js
{
  item_selector: {
    ignored_words: ["покажи"],
    items: [
      { title: 'Кола' },
      { title: 'Сладкий попкорн' },
      { title: 'Соленый попкорн' },
      { title: 'Чипсы', number: 1 },
      { title: 'Начос', number: 2 },
      { title: 'Пиво', number: 3 }
    ]
  }
}
```

#### Формат объекта `AssistantServerAction`

<a name="AssistantServerAction"></a>

`AssistantServerAction` - это любое сообщение, отправляемое от клиентской части приложения в бэкенд. Оно может быть как привязано к ui-элементу и приходить с бэка (в основном, для message-based аппов), так и формироваться самостоятельно фронтовой частью аппа при обработке событий внутри веб-вью аппа..

```typescript
interface AssistantServerAction {
  /* Тип сервер-экшена */
  action_id: string;
  /* любые параметры */
  parameters?: Record<string, any>;
}
```

#### Формат объекта `AssistantCharacterCommand`

<a name="AssistantCharacterCommand"></a>

`AssistantCharacterCommand` - информирует смартап о текущем ассистенте.

```typescript
interface AssistantCharacterCommand {
  type: "character";
  character: {
    id: "sber" | "eva" | "joy";
  };
}
```

#### Формат объекта `AssistantNavigationCommand`

<a name="AssistantNavigationCommand"></a>

`AssistantNavigationCommand` - команда навигации пользователя по смартапу. Большая часть навигационных команд может быть выполнена стандартным средствами Assistant Client. В платформе виртуального ассистента есть стандартные фразы, которые обрабатываются единым образом. Они обрабатываются и приходят одинаково для всех смартапов.

```typescript
interface AssistantNavigationCommand {
  /* Тип команды */
  type: "navigation";
  /* Навигационная команда (направление навигации) */
  navigation: { command: { direction: "UP" | "DOWN" | "LEFT" | "RIGHT" | "FORWARD" | "BACK" } };
}
```

#### Формат объекта `AssistantSmartAppCommand`

<a name="AssistantSmartAppCommand"></a>

`AssistantSmartAppCommand` - это команда для передачи смартапу любых данных с бэкенда.

```typescript
interface AssistantSmartAppCommand {
  /* Тип команды */
  type: "smart_app_data";
  /* Любые данные, которые нужны смартапу */
  smart_app_data: Record<string, any>;
}
```

## Разрешения устройств

Смартапы должны корректно отображаться на разных устройствах (SberBox, SberPortal и др). Для этого, необходимо проверять смартап на следующих разрешениях: 559x568, 768x400, 959x400, 1920x1080. Рекомендуется настроить эти разрешения на [вкладке Devices Chrome](https://developers.google.com/web/tools/chrome-devtools/device-mode#custom).
