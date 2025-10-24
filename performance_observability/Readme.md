# LaaSyCorpTravel-MVP – Performance & Observability Package

## Contents
- `perf/k6_mvp_smoke.js` – k6 load test for Auth, Search, Booking, Reports
- `observability/datadog_mvp_dashboard.json` – Datadog dashboard template
- `observability/cloudwatch_queries.txt` – CloudWatch Insights queries

## Usage
1. Install k6 → https://k6.io/docs/get-started/installation/
2. Run smoke suite:
   ```bash
   k6 run -e BASE_URL=http://localhost:8000 -e ORG=acme-001 -e USER=admin@acme.com -e PASS=secret perf/k6_mvp_smoke.js
Import datadog_mvp_dashboard.json into Datadog → Dashboards → Import.

Copy queries from cloudwatch_queries.txt into CloudWatch Logs Insights.

Expected Thresholds
Auth/CRUD p95 < 500 ms

Search p95 < 800 ms

Error rate < 1 %
