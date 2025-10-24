<<<<<<< HEAD
# LaaSyCorpTravel - Corporate Travel Management System

A comprehensive corporate travel management system with API key authentication, policy management, booking system, and real-time monitoring.

## 🚀 Features

### 🔐 Authentication & Security
- **API Key + Secret Authentication** - Secure API access with Bearer token format
- **Permission-based Access Control** - Granular permissions for different operations
- **Rate Limiting** - Configurable requests per hour per API key
- **Usage Tracking** - Comprehensive API usage monitoring

### 📊 Core Modules
- **Policy Management** - Create, publish, and enforce corporate travel policies
- **Booking System** - Unified booking flow for flights, hotels, and cars
- **Trip Management** - Centralized view of past and upcoming travel
- **Traveler Management** - User and traveler profile management
- **Search & Discovery** - Real-time travel option search
- **Reports & Analytics** - Comprehensive reporting and insights

### 🏗️ Architecture
- **Backend**: FastAPI + SQLAlchemy + MySQL
- **Frontend**: React + Vite (coming soon)
- **Database**: AWS RDS MySQL
- **Authentication**: API Key + Secret system
- **Deployment**: Docker + Docker Compose

## 🛠️ Quick Start

### Prerequisites
- Docker and Docker Compose
- AWS RDS MySQL database (or local MySQL)

### 1. Clone and Setup
```bash
git clone https://github.com/asimmohammad/corptravel.git
cd corptravel
```

### 2. Configure Database
Update the `DATABASE_URL` in `docker-compose.yml` with your AWS RDS credentials:
```yaml
environment:
  DATABASE_URL: "mysql+pymysql://username:password@your-rds-endpoint:3306/database"
```

### 3. Start the Application
```bash
docker compose up --build -d
```

### 4. Bootstrap Admin API Key
```bash
curl -X POST "http://localhost:8000/api-keys/bootstrap"
```

### 5. Access the API
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/healthz

## 🔑 API Authentication

### Generate API Key
```bash
# Bootstrap first admin key
curl -X POST "http://localhost:8000/api-keys/bootstrap"

# Generate additional keys (requires admin permissions)
curl -H "Authorization: Bearer <api_key>:<api_secret>" \
     -X POST "http://localhost:8000/api-keys/generate?app_name=MyApp&permissions=bookings&permissions=trips"
```

### Use API Key
```bash
curl -H "Authorization: Bearer <api_key>:<api_secret>" \
     "http://localhost:8000/policies"
```

## 📚 API Endpoints

### Authentication
- `POST /api-keys/bootstrap` - Create first admin API key
- `POST /api-keys/generate` - Generate new API keys
- `GET /api-keys/` - List all API keys
- `GET /api-keys/my/status` - Get current API key status

### Core APIs
- `GET /policies` - List travel policies
- `POST /policies` - Create new policy
- `POST /bookings` - Create booking
- `GET /trips` - List trips
- `GET /travelers` - List travelers
- `GET /search/flights` - Search flights
- `GET /search/hotels` - Search hotels
- `GET /search/cars` - Search cars

## 🔐 Permission System

| Permission | Description |
|------------|-------------|
| `admin` | Full system access |
| `users` | User management |
| `policies` | Policy management |
| `bookings` | Booking operations |
| `trips` | Trip management |
| `reports` | Report generation |

## 📊 Monitoring & Observability

### API Usage Tracking
- All API calls are logged with timestamps, endpoints, and response codes
- Rate limiting prevents abuse with configurable limits
- Usage statistics available via API

### Health Monitoring
- Health check endpoint: `/healthz`
- Database connection monitoring
- API key status tracking

## 🏗️ Database Schema

The system uses a comprehensive MySQL schema with the following key tables:
- `api_keys` - API key management and permissions
- `api_key_usage` - API usage tracking
- `users` - User management
- `policies` - Travel policies
- `bookings` - Booking records
- `trips` - Trip management
- `travelers` - Traveler profiles

## 🚀 Deployment

### Local Development
```bash
docker compose up --build
```

### Production (AWS)
The system is designed to work with AWS RDS MySQL. Update the `DATABASE_URL` in `docker-compose.yml` with your production database credentials.

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL` - MySQL connection string
- `LOG_LEVEL` - Logging level (default: INFO)

### Database Configuration
The system automatically creates database tables on startup using SQLAlchemy models.

## 📈 Future Enhancements

- [ ] Frontend React application
- [ ] OIDC/SSO integration
- [ ] Advanced reporting dashboards
- [ ] AI-powered price recommendations
- [ ] Mobile application
- [ ] Real-time notifications
- [ ] Integration with travel providers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

© 2025 **LaaSy Inc.** – All Rights Reserved. Use restricted to internal demo, client proof-of-concept, and evaluation.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ by the LaaSy team**
=======
This version now includes:

* 🚀 **CloudWatch + Datadog log streaming setup**
* 📈 **Recharts-based dashboard support**
* 🤖 **AI-based price recommendation integration hooks**
* ☁️ **AWS ECS + RDS deployment template**
* 🔐 **SSO (OIDC/Okta/Azure AD) integration guidance**
* 📊 **Grafana observability guidance**

---

```markdown
# ✈️ LaaSy Corporate Travel Platform – Production Edition

> A modern, enterprise-ready corporate travel management platform built with  
> **FastAPI + MySQL + JWT + Structured Logging** (backend) and  
> **React (Vite) + Tailwind + JWT + Recharts + Observability** (frontend).

---

## 🧩 Overview

The LaaSy stack provides:
- 💼 **Corporate Travel Booking & Policy Management**
- 🔐 **Role-based Access + SSO (OIDC/Okta/Azure AD)**
- 📊 **Reports + AI-based Insights**
- 🧱 **End-to-End Observability** (structured logging, CloudWatch, Datadog)
- 🚀 **Production-grade Deployment on AWS ECS + RDS**

---

## 🧱 Architecture

```

laasy/
├── backend/             # FastAPI + SQLAlchemy + JWT + structured logs + /logs sink
├── web/                 # React + Vite + JWT auth + Recharts dashboards
├── devcorptravel_sql/   # MySQL schema, reference & demo data
├── docker-compose.yml   # Local orchestration
└── aws/ecs-task.json    # ECS deployment definition (example)

````

**Tech Stack**
| Layer | Technologies |
|:--|:--|
| Backend | FastAPI · SQLAlchemy · Alembic · JWT · Python JSON Logger |
| Database | MySQL 8 / AWS RDS |
| Frontend | React (Vite) · Tailwind · Zustand · Recharts |
| Auth | JWT + OIDC (Okta, Azure AD, Google Workspace) |
| Infra | Docker · ECS Fargate · CloudWatch · Datadog · Grafana |
| AI | Price recommendation service (OpenAI/Vertex) |

---

## 🚀 Quick Start

### Backend

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

### Frontend

```bash
unzip laasy-webclient-logging.zip && cd laasy-webclient-logging
cp .env.example .env
npm install
npm run dev
# → http://localhost:5173
```

---

## 🔐 Auth Flow

| Step       | Endpoint              | Example                                   |
| ---------- | --------------------- | ----------------------------------------- |
| Register   | `/auth/register`      | Form: `email`, `password`                 |
| Token      | `/auth/token`         | Form: `username`, `password`              |
| Protected  | Add header            | `Authorization: Bearer <token>`           |
| SSO (OIDC) | `/auth/oidc/callback` | Handles Okta/Azure AD redirect (optional) |

OIDC support can be enabled by setting:

```bash
export OIDC_ISSUER_URL=https://dev-xxxxx.okta.com
export OIDC_CLIENT_ID=...
export OIDC_CLIENT_SECRET=...
export OIDC_REDIRECT_URI=https://yourdomain.com/auth/oidc/callback
```

---

## 📊 Features

| Module          | Description                                            |
| :-------------- | :----------------------------------------------------- |
| **Policies**    | Create, publish, and enforce corporate travel policies |
| **Bookings**    | Unified flow for flights, hotels, cars                 |
| **Trips**       | Centralized view of past and upcoming travel           |
| **Reports**     | Monthly spend and compliance dashboards                |
| **Logging**     | JSON logs, correlation IDs, CloudWatch export          |
| **AI Insights** | Price competitiveness and anomaly detection            |

---

## 🧠 Logging & Observability

### 🔹 Backend

* Structured JSON logs via `python-json-logger`
* Correlation using `X-Request-Id`
* Centralized sink `/logs` for frontend reports
* CloudWatch/Datadog forwarding via stdout

#### Example

```json
{
  "asctime": "2025-10-15T18:30:00Z",
  "levelname": "INFO",
  "name": "api",
  "message": {"event": "http_request", "path": "/trips", "status": 200, "duration_ms": 34},
  "request_id": "d12f-99aa",
  "org": "acme-001"
}
```

### 🔹 Frontend

* `src/lib/logger.ts` sends `logInfo()` / `logError()` to `/logs`
* `ErrorBoundary` captures React runtime errors
* All API calls send `X-Request-Id` + duration metrics

#### Example frontend event

```json
{
  "level": "info",
  "message": "api_ok",
  "context": { "url": "/trips", "status": 200, "requestId": "d12f-99aa" }
}
```

---

## ☁️ Production Deployment (AWS ECS + RDS)

### ECS Task Definition (snippet)

```json
{
  "family": "laasy-backend",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "your-ecr-repo/laasy-backend:latest",
      "portMappings": [{ "containerPort": 8000 }],
      "environment": [
        {"name":"DATABASE_URL","value":"mysql+pymysql://admin:pwd@rds-host:3306/devcorptravel"},
        {"name":"JWT_SECRET","value":"super-secret"},
        {"name":"LOG_LEVEL","value":"INFO"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/laasy-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### RDS Configuration

* Engine: MySQL 8
* Public access: Disabled
* Backup: Enabled
* Parameter group: `utf8mb4_unicode_ci`
* Connection from ECS via VPC security group

### CloudWatch Logs

Logs are automatically aggregated under `/ecs/laasy-backend`.

For Datadog, add a sidecar container:

```json
{
  "name": "datadog-agent",
  "image": "gcr.io/datadoghq/agent:latest",
  "environment": [
    {"name":"DD_API_KEY","value":"<your_key>"},
    {"name":"DD_LOGS_ENABLED","value":"true"}
  ]
}
```

---

## 📈 Dashboards (Recharts + Grafana)

### Frontend Recharts Integration

The `Reports` page uses `Recharts` for visual trends:

```tsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={spend.months}>
    <XAxis dataKey="ym" />
    <YAxis />
    <Line type="monotone" dataKey="total_usd" stroke="#0ea5e9" />
  </LineChart>
</ResponsiveContainer>
```

### Grafana Metrics

* Import CloudWatch data source in Grafana
* Create panels for:

  * API Latency (`duration_ms`)
  * API Error Rate (`status >= 400`)
  * Client Logs (`event="react_error_boundary"`)

---

## 🤖 AI Price Recommendation Service

Add an optional microservice for dynamic pricing suggestions:

**Route:** `GET /ai/pricing/{sku}`

```python
# example stub
@app.get("/ai/pricing/{sku}")
def ai_price(sku: str):
    # mock integration
    return {"sku": sku, "recommended_price": 198.5, "confidence": 0.92}
```

Future extension: integrate OpenAI, VertexAI, or Bedrock for real recommendations.

---

## 🔧 Security & Maintenance

| Practice                  | Implementation                     |
| :------------------------ | :--------------------------------- |
| 🔒 Secrets Management     | AWS Secrets Manager / SSM          |
| 🧰 CI/CD                  | GitHub Actions → ECR → ECS deploy  |
| 🔍 Vulnerability Scanning | Dependabot + Snyk                  |
| 📦 Backups                | Daily RDS snapshot                 |
| 🔐 SSO Integration        | Okta, Azure AD, or Google OIDC     |
| 🧠 Monitoring             | Grafana dashboards, Datadog traces |
| 🔄 Log Rotation           | CloudWatch retention: 30 days      |

---

## 🧾 Environment Variables Summary

| Variable               | Description                           |
| ---------------------- | ------------------------------------- |
| `DATABASE_URL`         | Full MySQL connection string          |
| `ORG_EXTERNAL_ID`      | Tenant key (e.g. `acme-001`)          |
| `JWT_SECRET`           | Signing secret                        |
| `JWT_EXPIRE_MIN`       | Token TTL                             |
| `VITE_API_BASE`        | Backend API URL                       |
| `VITE_ORG_EXTERNAL_ID` | Frontend tenant header                |
| `OIDC_*`               | Okta/Azure OIDC integration variables |
| `DD_API_KEY`           | Datadog API key (optional)            |

---

## 📊 Example End-to-End Log Correlation

1. Frontend calls `/booking` with `X-Request-Id = 6789`.
2. Backend logs structured `http_request` event.
3. Frontend logs `api_ok` → `/logs`.
4. Grafana dashboard visualizes duration + error trends.
5. Correlation by `request_id` across both services.

---

## 🧠 Future Enhancements

* [x] Structured JSON logging
* [x] CloudWatch + Datadog support
* [x] Recharts dashboards
* [x] Grafana integration
* [x] AI price recommendations
* [x] AWS ECS + RDS templates
* [x] OIDC/SSO support

---

## 🖼 Docs & Screenshots

```markdown
![Dashboard](docs/dashboard.png)
![Reports](docs/reports.png)
![Architecture](docs/architecture.png)
```

---

## 🧾 License

© 2025 **LaaSy Inc.** – All Rights Reserved.
Use restricted to internal demo, client proof-of-concept, and evaluation.
>>>>>>> origin/main
