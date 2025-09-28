# Tournament Service

Сервис пользователей, турниров и матчей с учётом побед и топ-лидербордом.

# Стек

- **NestJS** — backend framework
- **Prisma** — ORM
- **PostgreSQL** — база данных
- **JWT** — аутентификация

# Установка и запуск

```bash
npm install

cp .env.example .env

npx prisma migrate dev

npm run start:dev
```

# 📌 Основные эндпоинты

## Пользователи

POST /auth/register — регистрация пользователя

POST /auth/login — логин (JWT)

GET /users/leaderboard — топ игроков по победам

## Турниры

POST /tournaments — создать турнир

PATCH /tournaments/:id/start — запустить турнир

PATCH /tournaments/:id/finish — завершить турнир

GET /tournaments/:id/matches — список матчей турнира

## Матчи

POST /matches — создать матч

PATCH /matches/:id/run — провести матч (рандомный победитель)

GET /matches/tournament/:id — получить все матчи конкретного турнира
