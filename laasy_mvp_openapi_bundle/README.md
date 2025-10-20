
Perfect — below is the **updated and complete README.md** for your GitHub repository.
This version includes a clear **“Quick Start (Locally)”** section that guides new developers through setting up the backend, frontend, and database on their own machines.

---

# 🧭 LaaSyCorpTravel-MVP

### **Corporate Travel Platform (MVP Phase)**

**Stack:** Python (FastAPI) · MySQL · Redis · React (Vite) · Tailwind · AWS ECS · OpenTelemetry

---

## 📖 Overview

**LaaSyCorpTravel-MVP** is the foundational phase of the **LaaSy Corporate Travel Platform**, a multi-tenant SaaS solution enabling organizations to manage employee travel bookings, define travel policies, and analyze spend compliance.

The MVP establishes the **core architecture** for:

* Authentication & RBAC
* Policy definition and enforcement
* Mock search for travel inventory
* Booking and trip management
* Reporting and logging/observability

---

## 🚀 Objectives

1. Deliver a complete, end-to-end corporate travel workflow (Auth → Policy → Search → Booking → Reporting).
2. Build a cloud-native foundation (Python FastAPI + AWS ECS).
3. Provide observability, traceability, and audit logging from day one.
4. Support rapid iteration for enterprise-grade features (SSO, integrations, AI modules).

---

## ⚙️ System Architecture (MVP)

| Layer                   | Technology                         | Description                                                                       |
| ----------------------- | ---------------------------------- | --------------------------------------------------------------------------------- |
| **Frontend (SPA)**      | React + Vite + Tailwind            | Traveler/Admin portal (JWT-based session, policy UI, reports).                    |
| **Backend (API)**       | Python 3.11 + FastAPI + SQLAlchemy | Stateless services: Auth, Policy, Search, Booking, Trips, Reports, Notifications. |
| **Database**            | MySQL 8 (AWS RDS)                  | Multi-tenant transactional storage with strict org scoping.                       |
| **Cache / Idempotency** | Redis (ElastiCache)                | Caches active policies, prevents duplicate bookings.                              |
| **Email (Stub)**        | AWS SES (sandbox)                  | Sends booking confirmation emails.                                                |
| **Observability**       | OpenTelemetry + CloudWatch/Datadog | Structured logs, traces, metrics, dashboards.                                     |
| **Infrastructure**      | AWS ECS + ALB + CloudFront + WAF   | Containerized deployment with CI/CD via GitHub Actions.                           |

---

## 🧩 Core MVP Modules

| Module                        | Description                                                                  |
| ----------------------------- | ---------------------------------------------------------------------------- |
| **Auth & RBAC**               | JWT-based authentication, role-based access control, multi-tenant isolation. |
| **Policy Engine (v1)**        | CRUD + publish for travel policies, simple rules (e.g., hotel rate caps).    |
| **Search (Mock)**             | Mock results for flights, hotels, cars, labeled by policy compliance.        |
| **Booking & Trips**           | Idempotent booking creation, trip generation, “My Trips” view.               |
| **Reports (Lite)**            | Spend and compliance dashboards for admins.                                  |
| **Logging & Observability**   | JSON structured logs, OpenTelemetry traces, performance dashboards.          |
| **Admin Console (Policy UI)** | React UI for policy management and org settings.                             |
| **Notifications (Stub)**      | Booking confirmation emails via SES sandbox.                                 |

---

## 🧱 Repository Structure

```
.
├── backend/
│   ├── models/
│   │   └── pydantic_models.py       # Pydantic DTOs for FastAPI
│   └── ...
├── openapi/
│   └── laasy-mvp.yaml               # OpenAPI 3.0 API contract
├── performance_observability/       # k6 tests, dashboards
├── docs/
│   ├── architecture/                # PlantUML diagrams
│   └── data_design.md               # Schema & ER diagrams
└── README.md
```

---

# ⚡️ Quick Start (Locally)

This section walks you through running the **LaaSyCorpTravel-MVP** backend and frontend on your local environment for development and testing.

---

## **1️⃣ Prerequisites**

Ensure you have the following installed:

* **Python 3.11+**
* **Node.js 20+**
* **MySQL 8.0+**
* **Redis** (optional, for caching/idempotency)
* **Docker Desktop** *(optional, for isolated setup)*

---

## **2️⃣ Clone the Repository**

```bash
git clone https://github.com/your-org/LaaSyCorpTravel-MVP.git
cd LaaSyCorpTravel-MVP
```

---

## **3️⃣ Backend Setup (Python / FastAPI)**

### Create a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate      # macOS/Linux
# or
.venv\Scripts\activate         # Windows PowerShell
```

### Install dependencies:

```bash
pip install fastapi uvicorn sqlalchemy pymysql pydantic redis boto3 python-json-logger
```

### Configure environment variables:

Create a `.env` file in the project root:

```bash
DATABASE_URL=mysql+pymysql://root:root@127.0.0.1:3306/devcorptravel
ORG_EXTERNAL_ID=acme-001
JWT_SECRET=change-me
AWS_REGION=us-east-1
```

### Start FastAPI server:

```bash
uvicorn app.main:app --reload --port 8000
```

API is now available at **[http://localhost:8000/docs](http://localhost:8000/docs)**

---

## **4️⃣ Database Setup (MySQL)**

### Option A – Docker

```bash
docker run --name laasy-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -p 3306:3306 -d mysql:8
```

### Option B – Local

```bash
mysql -u root -p
CREATE DATABASE devcorptravel;
```

(Optional) Load schema:

```bash
mysql -u root -p devcorptravel < devcorptravel_schema.sql
```

---

## **5️⃣ Frontend Setup (React / Vite)**

### Install dependencies:

```bash
cd web
npm install
```

### Configure environment file:

Create `.env` in `/web`:

```
VITE_API_BASE=http://localhost:8000
VITE_ORG_EXTERNAL_ID=acme-001
```

### Run local server:

```bash
npm run dev
```

Open your browser at **[http://localhost:5173](http://localhost:5173)**

---

## **6️⃣ Optional: Docker Compose (All-in-One)**

You can start the complete stack (API, MySQL, Redis, Web) via Docker:

```bash
docker compose up --build
```

This automatically provisions the database and runs all services.

---

## **7️⃣ Test the API**

Test a full flow:

1. Register → Login → Get JWT
2. Create a policy → Publish it
3. Search (mock flights/hotels)
4. Book a trip → View `/trips` → Check `/reports`

Example with `curl`:

```bash
curl -X POST http://localhost:8000/auth/register \
  -F email=admin@acme.com -F password=secret

curl -X POST http://localhost:8000/auth/token \
  -d "username=admin@acme.com&password=secret" \
  -H "X-Org-External-Id: acme-001"
```

---

## **8️⃣ Logs & Observability**

* **Local logs:** printed in JSON format on terminal.
* **Traces:** configured via OpenTelemetry.
* **Client logs:** captured via `/logs` endpoint.
* **Dashboards:**

  * CloudWatch Log Insights (local equivalent: Datadog / Loki).
  * Datadog dashboard: `observability/datadog_mvp_dashboard.json`.

---

## **9️⃣ Performance Test (Optional)**

Run the load test suite:

```bash
cd performance_observability/perf
k6 run k6_mvp_smoke.js
```

This tests:

* Auth latency
* Search mock throughput
* Booking idempotency
* Reports response times

---

# 🧠 Design Principles

1. **Stateless APIs:** Horizontal scalability across ECS tasks.
2. **Multi-Tenancy:** Data isolation using `org_id` and `X-Org-External-Id`.
3. **API-First Development:** OpenAPI contracts (`openapi/laasy-mvp.yaml`) drive clients.
4. **Secure by Default:** JWT + HTTPS; secrets stored in AWS Parameter Store.
5. **Observable from Day 1:** Structured JSON logs, trace IDs, p95 latency targets.
6. **AI-Ready Foundation:** Logging and schema optimized for future AI/ML features.

---

# 🧾 API Contract & DTOs

* **OpenAPI Spec:** `openapi/laasy-mvp.yaml`
* **Python Models:** `backend/models/pydantic_models.py`

Generate clients:

```bash
openapi-generator-cli generate -i openapi/laasy-mvp.yaml -g python -o clients/python
```

---

# 🧩 Contribution Guidelines

1. Branches: `feature/*`, `bugfix/*`, `docs/*`.
2. Run `pytest` and `flake8` before pushing.
3. Submit PRs with linked Jira tasks and reviewer assigned.
4. All PRs must pass CI (GitHub Actions).
5. Deployments auto-trigger to AWS ECS (staging).

---

# 🧰 Future Roadmap

| Phase    | Feature                                                      |
| -------- | ------------------------------------------------------------ |
| **V1**   | SSO (OIDC), live supplier connectors (GDS, Hotel, Car, PSP). |
| **V1.5** | AI-driven pricing and compliance insights.                   |
| **V2**   | ERP/Expense integrations (Concur, Workday).                  |
| **V3**   | PWA Mobile app and notification center.                      |

---

# 🪪 License

© 2025 LaaSy Inc. – All rights reserved.
For internal demonstration and evaluation use only.

---

Would you like me to include **PlantUML diagrams** (System Context + Components) as embedded `.puml` files under `/docs/architecture/` and reference them directly in this README?
