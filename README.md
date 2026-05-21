# 📝 Блог с постами (SPA + REST API)

[![GitHub repo size](https://img.shields.io/github/repo-size/SergeyGro/blog-app)](https://github.com/SergeyGro/blog-app)
[![GitHub last commit](https://img.shields.io/github/last-commit/SergeyGro/blog-app)](https://github.com/SergeyGro/blog-app)

**Блог с постами** - одностраничное приложение (SPA) для управления постами с полноценным CRUD и локальным REST API на `json-server`. Проект демонстрирует навыки работы с асинхронными запросами, пагинацией, поиском и адаптивной вёрсткой.

> **Важно:** Для работы необходима локальная установка `json-server` (см. инструкцию ниже).

## 🛠️ Стек технологий

| Технология | Что использовалось |
|------------|---------------------|
| **HTML5** | Семантическая вёрстка, доступность |
| **CSS3** | Flexbox, Grid, адаптив (медиазапросы) |
| **JavaScript (ES6+)** | `async/await`, `fetch`, модули, события |
| **JSON Server** | Локальный REST API (CRUD, пагинация, поиск) |

## 📦 Функционал

### Посты
- ✅ Просмотр списка постов (пагинация - 6 постов на страницу)
- ✅ Поиск по заголовку (без перезагрузки)
- ✅ Добавление нового поста
- ✅ Редактирование существующего поста
- ✅ Удаление поста

### Технические особенности
- 🧩 Модульная архитектура (`api.js`, `render.js`, `router.js`)
- 🔄 Асинхронные запросы с обработкой ошибок
- 📱 Адаптивная вёрстка
- 💾 Данные хранятся в `data/posts.json` (синхронизируются с `json-server`)

## ⚙️ Запуск проекта

### Инструкция по установке и запуску
```bash
# Клонируй репозиторий
git clone https://github.com/SergeyGro/blog-app.git
cd blog-app

# Установи зависимости
npm install

# Запусти JSON Server
npx json-server --watch data/posts.json --port 3000
```

### После этого открой браузер и перейди по адресу http://localhost:3000.
