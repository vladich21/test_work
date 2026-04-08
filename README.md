<<<<<<< HEAD
# Тестовое задание

## Структура проекта

- `server/` — API ипотечного калькулятора (NestJS, Drizzle ORM, MySQL, Redis, Bull)
- `task.fund/server/` — API фонда с Telegram-ботом (NestJS, Sequelize)
- `client/` — Telegram Mini App «Open Foundation» (Next.js, Effector, Tailwind)

---

## Быстрый старт

**Нужно:** Docker Desktop, Node.js 18+

### 1. Запустить базу данных и Redis

```bash
docker compose up -d
```

Подождать ~15 секунд пока MySQL поднимется:
```bash
docker compose ps  # оба сервиса должны быть Up
```

### 2. Запустить серверы (каждый в отдельной вкладке терминала)

**Fund API (порт 5094)**
```bash
cd task.fund/server
cp .env.example .env
# заполнить .env: HOST=127.0.0.1 PORT=3307 USERNAME=appuser PASSWORD=apppass DATABASE=fund_db
# TELEGRAM_BOT_TOKEN и APP_URL — любые значения для локального запуска
npm install
npm run db:migrate
npm run dev
```

**Клиент (порт 3000)**
```bash
cd client
cp .env.local.example .env.local
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000)

**Mortgage API (порт 5095)**
```bash
cd server
cp .env.example .env
# заполнить .env: HOST=127.0.0.1 PORT=3307 USERNAME=appuser PASSWORD=apppass DATABASE=mortgage_db
# REDIS_HOST=localhost REDIS_PORT=6379
npm install
npm run db:migrate
npm run dev
```

### Docker: данные для подключения

```
MySQL:  127.0.0.1:3307  user=appuser  password=apppass
        БД: fund_db, mortgage_db (создаются автоматически)
Redis:  localhost:6379
```

---

## API ипотечного калькулятора

### POST `/api/mortgage-profiles` — создать расчёт

Тело запроса:
```json
{
  "propertyPrice": 5000000,
  "propertyType": "apartment_in_new_building",
  "downPaymentAmount": 1000000,
  "matCapitalAmount": 600000,
  "matCapitalIncluded": true,
  "mortgageTermYears": 20,
  "interestRate": 12.5
}
```

Ответ: `{ "id": "1" }`

Допустимые значения `propertyType`: `apartment_in_new_building`, `apartment_in_secondary_building`, `house`, `house_with_land_plot`, `land_plot`, `other`

Можно передать заголовок `X-User-Id: <uuid>` для привязки к пользователю.

### GET `/api/mortgage-profiles/:id` — получить результат

```json
{
  "monthlyPayment": "38628.78",
  "totalPayment": "9270906.89",
  "totalOverpaymentAmount": "5870906.89",
  "possibleTaxDeduction": "650000.00",
  "savingsDueMotherCapital": "1636042.39",
  "recommendedIncome": "96571.95",
  "mortgagePaymentSchedule": {
    "1": {
      "1": {
        "totalPayment": 38628.78,
        "repaymentOfMortgageBody": 3212.11,
        "repaymentOfMortgageInterest": 35416.67,
        "mortgageBalance": 3396787.89
      }
    }
  }
}
```

> `mortgagePaymentSchedule` может быть `null` 1–2 секунды пока воркер считает график. Повторить запрос через секунду.

---

## Диаграммы

- Диаграмма последовательностей (FigJam): _ссылка_
- Диаграмма зависимостей (FigJam): _ссылка_
=======
# Тестовое задание

## Структура проекта

- `server/` — API ипотечного калькулятора (NestJS, Drizzle ORM, MySQL, Redis, Bull)
- `task.fund/server/` — API фонда с Telegram-ботом (NestJS, Sequelize)
- `client/` — Telegram Mini App «Open Foundation» (Next.js, Effector, Tailwind)

---

## Быстрый старт

**Нужно:** Docker Desktop, Node.js 18+

### 1. Запустить базу данных и Redis

```bash
docker compose up -d
```

Подождать ~15 секунд пока MySQL поднимется:
```bash
docker compose ps  # оба сервиса должны быть Up
```

### 2. Запустить серверы (каждый в отдельной вкладке терминала)

**Fund API (порт 5094)**
```bash
cd task.fund/server
cp .env.example .env
# заполнить .env: HOST=127.0.0.1 PORT=3307 USERNAME=appuser PASSWORD=apppass DATABASE=fund_db
# TELEGRAM_BOT_TOKEN и APP_URL — любые значения для локального запуска
npm install
npm run db:migrate
npm run dev
```

**Клиент (порт 3000)**
```bash
cd client
cp .env.local.example .env.local
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000)

**Mortgage API (порт 5095)**
```bash
cd server
cp .env.example .env
# заполнить .env: HOST=127.0.0.1 PORT=3307 USERNAME=appuser PASSWORD=apppass DATABASE=mortgage_db
# REDIS_HOST=localhost REDIS_PORT=6379
npm install
npm run db:migrate
npm run dev
```

### Docker: данные для подключения

```
MySQL:  127.0.0.1:3307  user=appuser  password=apppass
        БД: fund_db, mortgage_db (создаются автоматически)
Redis:  localhost:6379
```

---

## API ипотечного калькулятора

### POST `/api/mortgage-profiles` — создать расчёт

Тело запроса:
```json
{
  "propertyPrice": 5000000,
  "propertyType": "apartment_in_new_building",
  "downPaymentAmount": 1000000,
  "matCapitalAmount": 600000,
  "matCapitalIncluded": true,
  "mortgageTermYears": 20,
  "interestRate": 12.5
}
```

Ответ: `{ "id": "1" }`

Допустимые значения `propertyType`: `apartment_in_new_building`, `apartment_in_secondary_building`, `house`, `house_with_land_plot`, `land_plot`, `other`

Можно передать заголовок `X-User-Id: <uuid>` для привязки к пользователю.

### GET `/api/mortgage-profiles/:id` — получить результат

```json
{
  "monthlyPayment": "38628.78",
  "totalPayment": "9270906.89",
  "totalOverpaymentAmount": "5870906.89",
  "possibleTaxDeduction": "650000.00",
  "savingsDueMotherCapital": "1636042.39",
  "recommendedIncome": "96571.95",
  "mortgagePaymentSchedule": {
    "1": {
      "1": {
        "totalPayment": 38628.78,
        "repaymentOfMortgageBody": 3212.11,
        "repaymentOfMortgageInterest": 35416.67,
        "mortgageBalance": 3396787.89
      }
    }
  }
}
```

> `mortgagePaymentSchedule` может быть `null` 1–2 секунды пока воркер считает график. Повторить запрос через секунду.

---

## Диаграммы

- Диаграмма последовательностей (FigJam): _ссылка_
- Диаграмма зависимостей (FigJam): _ссылка_
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
