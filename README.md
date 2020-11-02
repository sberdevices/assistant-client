<img src="https://user-images.githubusercontent.com/982072/97004635-0888a900-1546-11eb-8f25-283a0693608e.png" height="150px" width="150px">


Assistant Client - это инструмент для локального тестирования и отладки [Сanvas App](https://smartapp-code.sberdevices.ru/documentation/#/docs/ru/methodology/research/canvasapp) c виртуальным ассистентом. Он реализован в виде JavaScript протокола, который эмулирует среду Android и вызывает нативные методы. Такой подход не требует от разработчика наличия физических устройств и позволяет запустить виртуального ассистента через браузер. 


## Оглавление
   * [Конфигурация](#Конфигурация)
     * [Аутентификация](#Аутентификация)
     * [Установка](#Установка)
     * [Использование](#Пример)
   * [API](#API)
     * [createAssistant](#createAssistant)
     * [createSmartappDebugger](#createSmartappDebugger)
     * [getInitialData](#getInitialData) 
     * [getRecoveryState](#getRecoveryState)
   * [Форматы объектов](#Форматы)
     * [AssistantAppState](#AssistantAppState)
     * [AssistantServerAction](#AssistantServerAction)
     * [AssistantCharacterCommand](#AssistantCharacterCommand)
     * [AssistantNavigationCommand](#AssistantNavigationCommand)
     * [AssistantSmartAppCommand](#AssistantSmartAppCommand)     
   * [Требования](#Требования)

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
    assistant.sendData({ action: { action_id: 'some_action_name' } });
};
```

____


## API

### `createAssistant`

Создает экземпляр [`AssistantClient`](#AssistantClient) для запуска виртуального ассистента. Используется на устройствах в production среде.

| Параметр         | Обязательный | Описание                                                                   |
| :--------------- | :------: | :------------------------------------------------------------------------- |
| getState         | Да           |  Функция, которая возвращает актуальное состояние смартапа                 |
| getRecoveryState | Нет          |  Функция, которая сохраняет состояние смартапа на момент последнего закрытия |



### `createSmartappDebugger`

Создает экземпляр [`AssistantClient`](#AssistantClient) и добавляет на экран браузера панель с голосовым ассистентом (подобно устройствам). Панель ассистента находится в нижней части отрисованного экрана и позволяет отправлять виртуальному ассистенту следующие типы сообщений:
* текстовые сообщения через текстовое поле ввода; 
* голосовые сообщения через кнопку "Салют". 

`createSmartappDebugger` используется для локальной отладки и разработки в development среде (Dev).

| Параметр         | Обязательный | Описание                                                                   |
| :--------------- | :------: | :------------------------------------------------------------------------- |
| token            | Да           |  Токен из Кабинета Разработчика                                             |
| initPhrase       | Да           |  Фраза, которая запускает приложение                                |
| getState         | Да           |  Функция, которая возвращает актуальное состояние смартапа                 |
| getRecoveryState | Нет          |  Функция, которая сохраняет состояние смартапа на момент последнего закрытия |



### getInitialData(): [AssistantCommands](#AssistantCommands)[]

Возвращает данные, полученные при инициализации смартапа.


### getRecoveryState(): any

Возвращает состояние, сохраненное при закрытии приложения. Устройство запоминает последнее состояние, которое возвращает функция getRecoveryState при инициализации Assistant Client.

#### on('start', cb: () => void): void

Осуществляет подписку на событие готовности ассистента к работе.

#### on('data', cb: (data: [AssistantCharacterCommand](#AssistantCharacterCommand) | [AssistantNavigationCommand](#AssistantNavigationCommand) | [AssistantSmartAppCommand](#AssistantSmartAppCommand)) => {}): void

Осуществляет подписку на событие получения данных с бэкенд.

#### sendData({ action: [AssistantServerAction](#AssistantServerAction) }): void

Отправляет события с фронтенд на бэкенд через ассистента.

#### setGetState(nextGetState: () => [AssistantAppState](#AssistantAppState)): void

Подменяет callback, который возвращает актуальное состояние приложения.

#### setGetRecoveryState(nextGetRecoveryState: () => any)

Подменяет callback, который возвращает объект, доступный только при следующем запуске приложения. Данные приходят при вызове getRecoveryState.


____


## Форматы объектов 

### `AssistantAppState`

Объект `AssistantAppState` — текущее состояние смартапа, которое не хранится в платформе или сценарии. Каждый раз, когда пользователь начинает говорить, Assistant Client вызывает getState, чтобы получить и передать в бэкенд состояние экрана пользователя. 
То, что происходит на экране у пользователя и как он взаимодействует со смартапом в конкретный момент времени - ответственность смартапа. Assistant Client в данном случае - это буфер, который только передает состояние платформе или сценарию.


```typescript
interface AssistantAppState {
  // Любые данные, которые могут потребоваться в бэкенд для принятия решений
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
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
  [key: string]: any;
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
  action_id: string;
  // Любые параметры
  parameters?: Record<string, any>;
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
  sdkMeta: {
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
  navigation: { command: "UP" | "DOWN" | "LEFT" | "RIGHT" | "FORWARD" | "BACK" };
  sdkMeta: {
    requestId: string;
  };
}
```

### `AssistantSmartAppCommand`

Объект `AssistantSmartAppCommand` - это команда передачи смартапу любых данных с бэкенд.

```typescript
interface AssistantSmartAppCommand {
  // Тип команды 
  type: "smart_app_data";
  // Любые данные, которые нужны смартапу
  smart_app_data: Record<string, any>;
  sdkMeta: {
    requestId: string;
  };
}
```

____


## Требования к устройствам

Смартапы должны корректно отображаться на разных устройствах (SberBox, SberPortal и др). Для этого необходимо проверять смартап на следующих разрешениях: 559x568, 768x400, 959x400, 1920x1080. Настроить эти разрешения можно на [вкладке Devices Chrome](https://developers.google.com/web/tools/chrome-devtools/device-mode#custom).
