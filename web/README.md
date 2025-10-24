# LaaSy Corporate Travel — Web Client (Desktop)

A React + TypeScript (Vite) implementation of the Phase‑1 **desktop web client**:

- **Login**
- **Unified booking**: Search → Results (in‑policy/out‑of‑policy) → Details → Checkout → Confirmation
- **Policy Management UI** (Admin)
- **Admin**: dashboard, users/roles (stub), reports (stub)
- **Arranger**: Book for Someone Else
- **My Trips** dashboard
- **Traveler Profile**

It ships with a modern Tailwind design, Zustand state, and an API client that can
run in **mock mode** (no backend required) or point to your FastAPI services.

---

## 1) Local Development

```bash
# Optional: set mock mode (recommended first run)
cp .env.example .env

npm install
npm run dev
# visit http://localhost:5173
```

- Log in with any email. Use `@laasy.com` domain to see admin menu in mock mode.
- Toggle real API by setting `VITE_MOCK_MODE=false` and `VITE_API_BASE=https://api.example.com`.

---

## 2) Production Build

```bash
npm run build
npm run preview   # local preview on a static server
```

The build artifacts are in `dist/`.

---

## 3) Docker (Nginx)

```bash
docker build -t laasy-web .
docker run -p 5173:80 laasy-web
# Open http://localhost:5173
```

---

## 4) Deploy Options

### A) Vercel / Netlify (simplest)
- Import the repo, set env vars (`VITE_API_BASE`, `VITE_MOCK_MODE`), and deploy.
- Framework preset: **Vite** (React).

### B) AWS S3 + CloudFront (static hosting)
1. `npm run build`
2. Upload `dist/` to an S3 bucket (enable static website hosting).
3. Create a CloudFront distribution with the S3 bucket as origin.
4. Add an error response mapping all 403/404 to `/index.html` for SPA routing.
5. Point your domain (Route53) to the CloudFront distribution.
6. Set `VITE_API_BASE` to your API domain (e.g., `https://api.yourdomain.com`).

### C) AWS ECS Fargate (containerized)
1. Build & push the image to ECR:
   ```bash
   docker build -t laasy-web:latest .
   docker tag laasy-web:latest <account>.dkr.ecr.<region>.amazonaws.com/laasy-web:latest
   docker push <account>.dkr.ecr.<region>.amazonaws.com/laasy-web:latest
   ```
2. Create an ECS task & service with port **80**, behind an ALB.
3. Configure ALB listener 443 (ACM cert) → target group for web.
4. Set env vars in task def (optional; static sites typically don’t need runtime envs).
   - For runtime config, consider serving a `/config.json` from the same domain.

### D) Nginx on a VM (EC2/GCE)
1. `npm run build`
2. Copy `dist/` to `/var/www/laasy-web/` on the server.
3. Configure Nginx (similar to `nginx.conf` here) to serve SPA with `try_files`.
4. Add reverse proxy for API if desired:
   ```nginx
   location /api/ {
     proxy_pass https://api.yourdomain.com/;
   }
   ```

---

## 5) Where to Plug in Real Services

- **Search & results**: `src/lib/api.ts::searchOffers` → call your `/search/flights|hotels|cars` endpoints.  
- **Policies**: `getPolicies`, `createPolicy`, `publishPolicy` → connect to FastAPI policy routes.  
- **Checkout**: `postBookingConfirm` → call your booking orchestration.  
- **Auth**: Replace mock `login` with real OIDC/SAML flow or your auth API.

---

## 6) UI Highlights & Accessibility

- In‑policy/out‑of‑policy badges with clear color, text, and icons-ready classes.
- Responsive, keyboard-friendly inputs; high‑contrast defaults via Tailwind.

---

## 7) Project Structure

```
src/
  components/         # shared UI
  lib/                # api client
  pages/              # route pages
  styles.css          # Tailwind entry + small utilities
```
