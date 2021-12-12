# todo-canvas-app

Это небольшое Todo приложение (добавление, выполнение и удаление задач. [См. видео](https://youtu.be/P-o2rwHhARo)) демонстрирует пример взаимодействия с [Assistant Client](https://github.com/sberdevices/assistant-client). Для работы необходимо [создать проект в "SmartApp Code" и смартап в "SmartApp Studio"](https://github.com/sberdevices/todo-canvas-app-backend), сгенерировать token и запустить проект.

## Генерация token:

1. Идём на страницу SmartApp Studio ([ссылка](https://developers.sber.ru/studio));
1. В меню пользователя (правый верхний угол) выбираем "Настройки профиля";
1. Нажимаем "Auth Token";
1. Нажимаем "Обновить ключ";
1. Нажимаем "Скопировать ключ" (сейчас token в буфере);
1. Указываем токен (предыдущий пункт) и имя проекта (из "SmartApp Studio") в файле ".env.sample", в строках "REACT_APP_TOKEN" и "REACT_APP_SMARTAPP" соответственно;
1. Переименовываем файл ".env.sample" в ".env".

## Запуск проекта:

```bash
npm install

npm start
```
