# Sberdevices Assistant Client

Assistant Client - это инструмент для тестирования и отладки СanvasApps c Виртуальным Ассистентом (ВА).

Assistant Client интегрирует в WebView JS-код, который предоставляет биндинги к нативным методам на устройствах. В режиме локальной отладки и разработки Assistant Client эмулирует нативные методы, что позволяет запускать ВА в браузере.

Установка:

```sh
$ npm i @sberdevices/assistant-client
```

## Quickstart

```typescript
import { createAssistant, createSmartappDebugger } from '@sberdevices/assistant-client';

const initialize = (getState) => {
    if (process.env.NODE_ENV === 'development') {
        return createSmartappDebugger({
            token: 'токен разработчика из Smartapp Studio', // Токен, 
            initPhrase: 'Хочу попкорн', // фраза для запуска аппа
            getState,
        });
    }

    return createAssistant({ getState });
}

...

const assistant = initialize(() => state);
assistant.on('data', (command) => {
    // подписка на команды ассистента, в т.ч. команда инициализации смартапа
    if (command.navigation) {
        switch(command.navigation.command.direction) {
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
    // отправка ServerAction
    assistant.sendData({ action_id: 'some_action_name' });
};
```

## API

### `createAssistant`

Создает экземпляр [`AssistantClient`](#AssistantClient), обязательный параметр `getState` - функция, которая возвращает актуальное состояние смартапа при каждом обращении к бэкенду. Используется в production среде на девайсах.

### `createSmartappDebugger`

Создает экземпляр [`AssistantClient`](#AssistantClient), добавляет на экран браузера панель с голосовым ассистентом, подобно устройствам. Панель позволяет вводить команды с клавиатуры и голосом. Также активируется озвучка ассистента. Используется в development среде для локальной отладки и разработки.

| Параметр      | Dev only | Описание                                                                |
| :------------ | :------: | :---------------------------------------------------------------------- |
| getState\*    |    []    | Функция, которая возвращает актуальное состояние смартапа.              |
| token\*       |   [x]    | Токен.                                                                  |
| initPhrase\*  |   [x]    | Фраза, которая запускает ваше приложение.                               |

#### Панель ассистента

<a name="AssistantPanel"></a>

По-умолчанию, в режиме разработки, панель отрисовывается. Вы можете посылать ВА сообщения, используя текстовое поле ввода в нижней панели. Чтобы отправить голосовое сообщение, нажмите на иконку салюта.

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
