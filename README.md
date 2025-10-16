# ✈️ LaaSy Corporate Travel Platform – Full Stack Demo

> Enterprise-grade Corporate Travel Platform built with  
> **FastAPI + MySQL + JWT + Structured Logging** on the backend and  
> **React (Vite) + Tailwind + JWT + Client Logging** on the frontend.

---

## 🧩 Overview

Run the entire LaaSy stack locally in minutes.  
This release adds **structured logging, correlation IDs, and a client log sink** for end-to-end observability.

### Includes
- ✅ **FastAPI backend** with MySQL, JWT auth & structured logs  
- 💻 **React frontend** (Vite + Tailwind) with ErrorBoundary and client logging  
- 📊 Reports pages (Spend + Compliance)  
- 🧱 Dockerfiles for both services  
- 🔐 Role-based menu control (Admin & TravelManager see Reports)

---

## ⚙️ Architecture

```

laasy/
├── backend/         # FastAPI + SQLAlchemy + JWT + Logging + /logs sink
├── web/             # React + Vite + JWT auth + Reports + client logs
├── devcorptravel_sql/  # MySQL schema + seeds
└── docker-compose.yml  # optional combined stack

````

---

## 🚀 Quick Start

### 1️⃣ Backend

```bash
unzip laasy-backend-mysql-jwt-logging.zip && cd laasy-backend-mysql-jwt-logging
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

export DATABASE_URL="mysql+pymysql://root:root@127.0.0.1:3306/devcorptravel"
export ORG_EXTERNAL_ID="acme-001"
export JWT_SECRET="change-me"

uvicorn app.main:app --host 0.0.0.0 --port 8000 --no-access-log
# → http://localhost:8000/docs
````

### 2️⃣ Frontend

```bash
unzip laasy-webclient-logging.zip && cd laasy-webclient-logging
cp .env.example .env
npm install
npm run dev
# → http://localhost:5173
```

### 3️⃣ Optional (Compose All)

```bash
docker compose up --build
```

---

## 🔐 Auth Flow

| Step      | Endpoint              | Example                         |
| :-------- | :-------------------- | :------------------------------ |
| Register  | `POST /auth/register` | Form: `email`, `password`       |
| Token     | `POST /auth/token`    | Form: `username`, `password`    |
| Protected | Use Bearer token      | `Authorization: Bearer <token>` |

---

## 🧾 API Highlights

| Category | Endpoint                                | Description                         |       |                                    |
| :------- | :-------------------------------------- | :---------------------------------- | ----- | ---------------------------------- |
| Auth     | `/auth/register`, `/auth/token`         | JWT authentication                  |       |                                    |
| Search   | `/search/flights                        | hotels                              | cars` | Mock offers with policy evaluation |
| Booking  | `/booking`                              | Creates booking + trip records      |       |                                    |
| Trips    | `/trips`                                | View booked trips                   |       |                                    |
| Reports  | `/reports/spend`, `/reports/compliance` | Spend & policy analytics            |       |                                    |
| Logging  | `/logs`                                 | Accepts frontend client logs (JSON) |       |                                    |

---

## 🧠 Logging & Observability

### 🔹 Backend

* Structured JSON logs via `python-json-logger`
* Automatic `X-Request-Id` correlation for each request
* Context fields: `asctime level name message request_id path org`
* Sink: `POST /logs` for browser errors/events

Example:

```json
{"asctime":"2025-10-15T18:20:00Z",
 "levelname":"INFO",
 "name":"api",
 "message":{"event":"http_request","path":"/trips","status":200,"duration_ms":23},
 "request_id":"8a6...","org":"acme-001"}
```

### 🔹 Frontend

* `src/lib/logger.ts` adds:

  * `makeRequestId()` + `sendClientLog()` to `/logs`
  * `logInfo()`, `logError()` helpers (auto-send to backend)
* ErrorBoundary captures React runtime errors and posts structured logs
* Every API call includes `X-Request-Id` + duration metrics

---

## 📊 Reports Page

Accessible to `OrgAdmin` and `TravelManager` only.

* **Spend Report:** Monthly booking volume (USD, last 6 months)
* **Compliance Report:** In-policy vs total bookings rates

---

## 🧱 Environment Variables

| Variable               | Default                                                  | Purpose                |
| :--------------------- | :------------------------------------------------------- | :--------------------- |
| `DATABASE_URL`         | `mysql+pymysql://root:root@127.0.0.1:3306/devcorptravel` | Backend DB connection  |
| `ORG_EXTERNAL_ID`      | `acme-001`                                               | Tenant key             |
| `JWT_SECRET`           | `change-me`                                              | JWT signing secret     |
| `VITE_API_BASE`        | `http://localhost:8000`                                  | Frontend API URL       |
| `VITE_ORG_EXTERNAL_ID` | `acme-001`                                               | Frontend tenant header |

---

## 🧾 Example Logs End-to-End

1. Browser calls `GET /trips` with `X-Request-Id = 1234`.
2. Backend logs:

```json
{"message":{"event":"http_request","path":"/trips","status":200},"request_id":"1234"}
```

3. Frontend posts to `/logs`:

```json
{"level":"info","message":"api_ok","context":{"url":"/trips","status":200,"requestId":"1234"}}
```

4. Both records share the same `request_id` → full correlation.

---

## 🔧 Production Tips

* Output logs to stdout and ship via AWS CloudWatch, ELK, or Datadog.
* Redact PII before logging.
* Add sampling to `/logs` endpoint if traffic is high.
* Extend with OpenTelemetry for distributed tracing.

---

## 🧠 Next Steps

* [ ] Add dashboard charts (Recharts or ECharts)
* [ ] Integrate AI-based price recommendations
* [ ] Wire to RDS and Grafana for observability
* [ ] Add SSO (OIDC / Okta / Azure AD)

---

## 🖼 Docs & Screenshots

Store screenshots and banner in `/docs/` and reference in this README:
