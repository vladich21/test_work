# РўРµСЃС‚РѕРІРѕРµ Р·Р°РґР°РЅРёРµ

## РЎС‚СЂСѓРєС‚СѓСЂР° РїСЂРѕРµРєС‚Р°

- `server/` вЂ” API РёРїРѕС‚РµС‡РЅРѕРіРѕ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂР° (NestJS, Drizzle ORM, MySQL, Redis, Bull)
- `task.fund/server/` вЂ” API С„РѕРЅРґР° СЃ Telegram-Р±РѕС‚РѕРј (NestJS, Sequelize)
- `client/` вЂ” Telegram Mini App В«Open FoundationВ» (Next.js, Effector, Tailwind)

---

## Р‘С‹СЃС‚СЂС‹Р№ СЃС‚Р°СЂС‚

**РќСѓР¶РЅРѕ:** Docker Desktop, Node.js 18+

### 1. Р—Р°РїСѓСЃС‚РёС‚СЊ Р±Р°Р·Сѓ РґР°РЅРЅС‹С… Рё Redis

```bash
docker compose up -d
```

РџРѕРґРѕР¶РґР°С‚СЊ ~15 СЃРµРєСѓРЅРґ РїРѕРєР° MySQL РїРѕРґРЅРёРјРµС‚СЃСЏ:
```bash
docker compose ps  # РѕР±Р° СЃРµСЂРІРёСЃР° РґРѕР»Р¶РЅС‹ Р±С‹С‚СЊ Up
```

### 2. Р—Р°РїСѓСЃС‚РёС‚СЊ СЃРµСЂРІРµСЂС‹ (РєР°Р¶РґС‹Р№ РІ РѕС‚РґРµР»СЊРЅРѕР№ РІРєР»Р°РґРєРµ С‚РµСЂРјРёРЅР°Р»Р°)

**Fund API (РїРѕСЂС‚ 5094)**
```bash
cd task.fund/server
cp .env.example .env
# Р·Р°РїРѕР»РЅРёС‚СЊ .env: HOST=127.0.0.1 PORT=3307 USERNAME=appuser PASSWORD=apppass DATABASE=fund_db
# TELEGRAM_BOT_TOKEN Рё APP_URL вЂ” Р»СЋР±С‹Рµ Р·РЅР°С‡РµРЅРёСЏ РґР»СЏ Р»РѕРєР°Р»СЊРЅРѕРіРѕ Р·Р°РїСѓСЃРєР°
npm install
npm run db:migrate
npm run dev
```

**РљР»РёРµРЅС‚ (РїРѕСЂС‚ 3000)**
```bash
cd client
cp .env.local.example .env.local
npm install
npm run dev
```

РћС‚РєСЂС‹С‚СЊ [http://localhost:3000](http://localhost:3000)

**Mortgage API (РїРѕСЂС‚ 5095)**
```bash
cd server
cp .env.example .env
# Р·Р°РїРѕР»РЅРёС‚СЊ .env: HOST=127.0.0.1 PORT=3307 USERNAME=appuser PASSWORD=apppass DATABASE=mortgage_db
# REDIS_HOST=localhost REDIS_PORT=6379
npm install
npm run db:migrate
npm run dev
```

### Docker: РґР°РЅРЅС‹Рµ РґР»СЏ РїРѕРґРєР»СЋС‡РµРЅРёСЏ

```
MySQL:  127.0.0.1:3307  user=appuser  password=apppass
        Р‘Р”: fund_db, mortgage_db (СЃРѕР·РґР°СЋС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё)
Redis:  localhost:6379
```

---

## API РёРїРѕС‚РµС‡РЅРѕРіРѕ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂР°

### POST `/api/mortgage-profiles` вЂ” СЃРѕР·РґР°С‚СЊ СЂР°СЃС‡С‘С‚

РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°:
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

РћС‚РІРµС‚: `{ "id": "1" }`

Р”РѕРїСѓСЃС‚РёРјС‹Рµ Р·РЅР°С‡РµРЅРёСЏ `propertyType`: `apartment_in_new_building`, `apartment_in_secondary_building`, `house`, `house_with_land_plot`, `land_plot`, `other`

РњРѕР¶РЅРѕ РїРµСЂРµРґР°С‚СЊ Р·Р°РіРѕР»РѕРІРѕРє `X-User-Id: <uuid>` РґР»СЏ РїСЂРёРІСЏР·РєРё Рє РїРѕР»СЊР·РѕРІР°С‚РµР»СЋ.

### GET `/api/mortgage-profiles/:id` вЂ” РїРѕР»СѓС‡РёС‚СЊ СЂРµР·СѓР»СЊС‚Р°С‚

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

> `mortgagePaymentSchedule` РјРѕР¶РµС‚ Р±С‹С‚СЊ `null` 1вЂ“2 СЃРµРєСѓРЅРґС‹ РїРѕРєР° РІРѕСЂРєРµСЂ СЃС‡РёС‚Р°РµС‚ РіСЂР°С„РёРє. РџРѕРІС‚РѕСЂРёС‚СЊ Р·Р°РїСЂРѕСЃ С‡РµСЂРµР· СЃРµРєСѓРЅРґСѓ.

---

## Р”РёР°РіСЂР°РјРјС‹

- Р”РёР°РіСЂР°РјРјР° РїРѕСЃР»РµРґРѕРІР°С‚РµР»СЊРЅРѕСЃС‚РµР№ (FigJam): _СЃСЃС‹Р»РєР°_
- Р”РёР°РіСЂР°РјРјР° Р·Р°РІРёСЃРёРјРѕСЃС‚РµР№ (FigJam): _СЃСЃС‹Р»РєР°_
