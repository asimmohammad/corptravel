# LaaSy Corporate Travel — FastAPI Backend (Stub)

This FastAPI app matches the web client's API surface so you can run an end-to-end demo, then
incrementally replace stubs with real integrations (GDS/NDC, hotels, cars, payments, SSO, etc.).

## Features
- `/auth/login` — mock role assignment
- `/search/flights|hotels|cars` — mock offers with in-policy/out-of-policy flags
- `/policies` — in-memory policy CRUD + publish
- `/booking` — returns a confirmation id
- `/trips` — mock past/upcoming trips
- `/travelers` — basic traveler CRUD (in-memory)
- `/arranger` — delegate + traveler list
- `/reports` — simple spend/compliance
- `/notifications/test` — stubbed

---

## Run Locally

### 1) Python
```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# http://localhost:8000/docs
```

### 2) Docker
```bash
docker build -t laasy-backend .
docker run -p 8000:8000 laasy-backend
# http://localhost:8000/docs
```

---

## Hook up the Web Client

In the web project `.env`:
```
VITE_MOCK_MODE=false
VITE_API_BASE=http://localhost:8000
```

Run web and backend together (two terminals) or compose them yourself.
For a quick multi-service dev setup, create a root `docker-compose.yml` like:
```yaml
services:
  api:
    build: ./backend
    ports: ["8000:8000"]
  web:
    build: ./web
    environment:
      - VITE_API_BASE=http://api:8000
      - VITE_MOCK_MODE=false
    ports: ["5173:80"]
    depends_on: [api]
```
(Adjust paths to match your folder layout.)

---

## Deploy to AWS ECS Fargate (high level)

1. **ECR**: create a repository `laasy-backend` and push the image:
```bash
docker build -t laasy-backend:latest .
docker tag laasy-backend:latest <acct>.dkr.ecr.<region>.amazonaws.com/laasy-backend:latest
docker push <acct>.dkr.ecr.<region>.amazonaws.com/laasy-backend:latest
```
2. **ALB**: create an Application Load Balancer with HTTPS (ACM cert).  
3. **ECS**: task definition (container port 8000), service (desired count 2), health check `GET /healthz`.  
4. **Security**: open 443 to the ALB; tasks in private subnets with NAT or public if needed.  
5. **DNS**: `api.yourdomain.com` → ALB listener rule → target group → service.  

---

## Next Steps
- Replace in-memory stores with Postgres (SQLModel/SQLAlchemy).
- Implement auth (OIDC/SAML) and RBAC with real org/tenant model.
- Add real search adapters (NDC/GDS, hotels, cars) with normalization.
- Wire notifications (SES/SendGrid, Twilio, FCM/APNs).
- Add telemetry (OpenTelemetry) + logs/metrics/traces.
