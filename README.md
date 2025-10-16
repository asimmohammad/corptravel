# 🧭 LaaSy Corporate Travel Platform

> A modern, multi-tenant **Corporate Travel Platform** built with **FastAPI**, **MySQL**, **JWT auth**, and **React (Vite)** for the web client.
> Includes CI/CD via GitHub Actions, database migrations (Flyway & Liquibase), and a ready-to-use demo dataset.

---

## 🚀 Overview

The platform enables organizations to:

* Manage corporate travel policies (rules, limits, in/out-of-policy)
* Search and book flights, hotels, and cars
* Handle arranger and traveler roles
* View bookings, trips, and reports
* Generate compliance and spend insights

---

## 🧩 Architecture

```
frontend/           → React + Vite web client (mock/offline or live API)
backend/            → FastAPI + SQLAlchemy + JWT (MySQL connected)
devcorptravel_sql/  → Database schema, seeds, migrations (Flyway + Liquibase)
.github/workflows/  → CI/CD pipelines for DB migrations
```

**Stack:**

* **Backend:** FastAPI · SQLAlchemy · Alembic · PyMySQL
* **Database:** MySQL 8 (schema: `devcorptravel`)
* **Auth:** JWT + bcrypt password hashing
* **Frontend:** React (Vite, Tailwind)
* **CI/CD:** GitHub Actions (Flyway & Liquibase)
* **Infra:** Docker-ready for local or ECS deployment

---

## 🗄 Database

**Schema name:** `devcorptravel`

Run migrations using either Flyway or Liquibase.

### Option 1 — Flyway

```bash
flyway -url="jdbc:mysql://localhost:3306/devcorptravel" \
  -user=root -password=root migrate
```

### Option 2 — Liquibase

```bash
liquibase --url="jdbc:mysql://localhost:3306/devcorptravel" \
  --username=root --password=root \
  --changeLogFile=devcorptravel_sql/liquibase/changelog-master.yaml update
```

### Seeds

```bash
# Reference data (roles, permissions)
mysql -u root -p < devcorptravel_sql/devcorptravel_reference_seed.sql

# Optional demo (Acme Corporation)
mysql -u root -p < devcorptravel_sql/devcorptravel_demo_seed.sql
```

---

## ⚙️ Backend (FastAPI)

### Run locally

```bash
cd laasy-backend-mysql-jwt
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

export DATABASE_URL="mysql+pymysql://root:root@127.0.0.1:3306/devcorptravel"
export ORG_EXTERNAL_ID="acme-001"
export JWT_SECRET="change-me"

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# → http://localhost:8000/docs
```

### Docker

```bash
docker build -t laasy-backend .
docker run -p 8000:8000 \
  -e DATABASE_URL="mysql+pymysql://root:root@host.docker.internal:3306/devcorptravel" \
  -e ORG_EXTERNAL_ID=acme-001 \
  -e JWT_SECRET=change-me laasy-backend
```

---

## 🔐 Auth Flow

| Step      | Endpoint              | Example                                                                               |
| --------- | --------------------- | ------------------------------------------------------------------------------------- |
| Register  | `POST /auth/register` | `curl -F email=admin@acme.com -F password=secret http://localhost:8000/auth/register` |
| Token     | `POST /auth/token`    | `curl -d 'username=admin@acme.com&password=secret' http://localhost:8000/auth/token`  |
| Protected | Add header            | `Authorization: Bearer <token>`                                                       |

---

## 📊 Reports

| Endpoint                  | Description                                 |
| ------------------------- | ------------------------------------------- |
| `GET /reports/spend`      | Monthly booking spend (USD, 6-month window) |
| `GET /reports/compliance` | Policy compliance ratio from booking items  |

---

## 💻 Frontend

```bash
cd laasy-webclient
cp .env.example .env
# set VITE_MOCK_MODE=false
# set VITE_API_BASE=http://localhost:8000
npm install
npm run dev
```

---

## 🔁 CI/CD Workflows

| Workflow                | Trigger       | Description                             |
| ----------------------- | ------------- | --------------------------------------- |
| `db-flyway-pr.yml`      | Pull Request  | Validates migrations in ephemeral MySQL |
| `db-flyway-prod.yml`    | Merge to main | Runs Flyway migration in production     |
| `db-liquibase-pr.yml`   | Pull Request  | Validates Liquibase changelogs          |
| `db-liquibase-prod.yml` | Merge to main | Updates DB via Liquibase                |
| `db-flyway-demo.yml`    | Manual        | Seeds or cleans demo data               |

**Secrets required**

```
MYSQL_HOST, MYSQL_PORT, MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD
```

---

## 🧱 Alembic (for future DB diffs)

```bash
alembic -x DATABASE_URL="$DATABASE_URL" revision --autogenerate -m "add new column"
alembic -x DATABASE_URL="$DATABASE_URL" upgrade head
```

---

## 🧠 Next Steps

* [ ] Wire web login to JWT auth flow
* [ ] Add refresh tokens & role-based access guards
* [ ] Extend reports (top suppliers, OOP by team)
* [ ] Add AI-driven price-ranking service

---

## 🧾 License

© 2025 LaaSy Inc. — All rights reserved.
For internal and demo purposes only.

---

Would you like me to include **badges** (e.g. Python, FastAPI, MySQL, Flyway, Docker) and a **project banner image** section at the top for GitHub presentation?
