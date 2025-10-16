
```markdown
<!-- PROJECT BANNER -->
<p align="center">
  <img src="docs/banner.png" alt="LaaSy Corporate Travel Banner" width="100%">
</p>

<h1 align="center">✈️ LaaSy Corporate Travel Platform</h1>
<p align="center">
  <strong>Modern Corporate Travel SaaS — built with FastAPI, MySQL, JWT Auth, and React.</strong><br>
  <em>Multi-tenant, Policy-Aware, AI-Ready.</em>
</p>

<p align="center">
  <a href="https://fastapi.tiangolo.com/"><img src="https://img.shields.io/badge/API-FastAPI-009688?logo=fastapi&logoColor=white" alt="FastAPI"></a>
  <a href="https://www.mysql.com/"><img src="https://img.shields.io/badge/DB-MySQL-00758F?logo=mysql&logoColor=white" alt="MySQL"></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Frontend-Vite-646CFF?logo=vite&logoColor=white" alt="Vite"></a>
  <a href="https://jwt.io/"><img src="https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens&logoColor=white" alt="JWT"></a>
  <a href="https://docs.github.com/actions"><img src="https://img.shields.io/badge/CI-CD-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white" alt="CI/CD"></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Container-Docker-2496ED?logo=docker&logoColor=white" alt="Docker"></a>
</p>

---

## 🚀 Overview

**LaaSy Corporate Travel** is a next-generation corporate booking and travel policy management platform.  
It allows organizations to:
- Create and manage **travel policies**
- Book **flights, hotels, and cars**
- Manage **arranger and traveler** roles
- Generate **compliance and spend** reports
- Integrate easily into enterprise systems via APIs

---

## 🧩 Architecture

```

frontend/           → React + Vite + Tailwind (mock or live API)
backend/            → FastAPI + SQLAlchemy + JWT + Alembic
devcorptravel_sql/  → MySQL schema, reference & demo seeds, migrations
.github/workflows/  → CI/CD pipelines for Flyway & Liquibase

````

**Tech Stack:**
| Layer | Technologies |
|-------|---------------|
| Backend | FastAPI · SQLAlchemy · Alembic · JWT |
| Frontend | React (Vite) · TailwindCSS |
| Database | MySQL 8 (`devcorptravel`) |
| Auth | JWT + bcrypt |
| CI/CD | GitHub Actions (Flyway + Liquibase) |
| Infra | Docker · ECS (optional) |

---

## 🗄 Database Setup

### Run with MySQL CLI
```bash
mysql -u root -p < devcorptravel_sql/devcorptravel_schema.sql
mysql -u root -p < devcorptravel_sql/devcorptravel_reference_seed.sql
mysql -u root -p < devcorptravel_sql/devcorptravel_demo_seed.sql
````

### Flyway

```bash
flyway -url="jdbc:mysql://localhost:3306/devcorptravel" \
  -user=root -password=root migrate
```

### Liquibase

```bash
liquibase --url="jdbc:mysql://localhost:3306/devcorptravel" \
  --username=root --password=root \
  --changeLogFile=devcorptravel_sql/liquibase/changelog-master.yaml update
```

---

## ⚙️ Backend (FastAPI + MySQL + JWT)

### Run locally

```bash
cd laasy-backend-mysql-jwt
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

export DATABASE_URL="mysql+pymysql://root:root@127.0.0.1:3306/devcorptravel"
export ORG_EXTERNAL_ID="acme-001"
export JWT_SECRET="change-me"

uvicorn app.main:app --reload --port 8000
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

| Step     | Endpoint              | Example                                                                               |
| -------- | --------------------- | ------------------------------------------------------------------------------------- |
| Register | `POST /auth/register` | `curl -F email=admin@acme.com -F password=secret http://localhost:8000/auth/register` |
| Token    | `POST /auth/token`    | `curl -d 'username=admin@acme.com&password=secret' http://localhost:8000/auth/token`  |
| Use      | Add header            | `Authorization: Bearer <token>`                                                       |

---

## 📊 Reports

| Endpoint                  | Description                                 |
| ------------------------- | ------------------------------------------- |
| `GET /reports/spend`      | Monthly booking spend (USD, 6-month window) |
| `GET /reports/compliance` | In-policy vs total bookings                 |

---

## 💻 Frontend (React + Vite)

```bash
cd laasy-webclient
cp .env.example .env
# Set:
# VITE_MOCK_MODE=false
# VITE_API_BASE=http://localhost:8000
npm install
npm run dev
# → http://localhost:5173
```

---

## 🔁 CI/CD Workflows

| Workflow                | Trigger       | Description                                    |
| ----------------------- | ------------- | ---------------------------------------------- |
| `db-flyway-pr.yml`      | Pull Request  | Validates Flyway migrations in ephemeral MySQL |
| `db-flyway-prod.yml`    | Merge to main | Runs Flyway migration in production            |
| `db-liquibase-pr.yml`   | Pull Request  | Validates Liquibase changelogs                 |
| `db-liquibase-prod.yml` | Merge to main | Updates DB via Liquibase                       |
| `db-flyway-demo.yml`    | Manual        | Seeds or cleans demo data                      |

**Secrets required**

```
MYSQL_HOST, MYSQL_PORT, MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD
```

---

## 🧱 Alembic (Schema Diffs)

```bash
# Create migration
alembic -x DATABASE_URL="$DATABASE_URL" revision --autogenerate -m "add new table"
# Apply
alembic -x DATABASE_URL="$DATABASE_URL" upgrade head
```

---

## 🧠 Roadmap

* [ ] Integrate full web JWT login flow
* [ ] Add refresh tokens + role-based route guards
* [ ] Extend reports: top suppliers, team-level spend
* [ ] Add AI-driven price ranking & disruption alerts
* [ ] Build admin dashboard (React + ShadCN UI)

---

## 🧾 License

© 2025 **LaaSy Inc.** — All rights reserved.
For internal demo and evaluation use.

---

## 📸 Screenshots & Demo

> Place images in `/docs` and reference here.

```markdown
![Dashboard](docs/dashboard.png)
![Policy Management](docs/policies.png)
![Reports](docs/reports.png)
```

---

## ❤️ Credits

Built with ❤️ by **LaaSy Engineering** — powered by OpenAI + FastAPI + MySQL.

```
