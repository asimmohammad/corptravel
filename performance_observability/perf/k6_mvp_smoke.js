import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomSeed, uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

const BASE = __ENV.BASE_URL || 'http://localhost:8000';
const ORG = __ENV.ORG || 'acme-001';
const USER = __ENV.USER || 'admin@acme.com';
const PASS = __ENV.PASS || 'secret';

function token() {
  const res = http.post(`${BASE}/auth/token`, {
    username: USER, password: PASS
  }, { headers: { 'X-Org-External-Id': ORG }});
  check(res, { 'token 200': r => r.status === 200 });
  return res.json().access_token;
}

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800'],
  },
  scenarios: {
    auth_burst: { executor: 'constant-arrival-rate', rate: 50, timeUnit: '1m', duration: '3m', preAllocatedVUs: 5, exec: 'authScenario' },
    search_steady: { executor: 'constant-arrival-rate', rate: 200, timeUnit: '1m', duration: '5m', preAllocatedVUs: 20, exec: 'searchScenario' },
    booking_soak: { executor: 'constant-arrival-rate', rate: 30, timeUnit: '1m', duration: '5m', preAllocatedVUs: 10, exec: 'bookingScenario' },
    reports_read: { executor: 'constant-arrival-rate', rate: 100, timeUnit: '1m', duration: '5m', preAllocatedVUs: 10, exec: 'reportsScenario' },
  },
};

export function authScenario() {
  const res = http.post(`${BASE}/auth/token`, { username: USER, password: PASS }, { headers: { 'X-Org-External-Id': ORG }});
  check(res, { 'auth 200': r => r.status === 200 });
  sleep(1);
}

export function searchScenario() {
  const tok = token();
  const h = { 'Authorization': `Bearer ${tok}`, 'X-Org-External-Id': ORG };
  const res = http.get(`${BASE}/search/flights?origin=ORD&dest=JFK&date=2025-11-25`, { headers: h });
  check(res, { 'search 200': r => r.status === 200 });
  sleep(0.5);
}

export function bookingScenario() {
  const tok = token();
  const h = { 'Authorization': `Bearer ${tok}`, 'X-Org-External-Id': ORG, 'Content-Type': 'application/json', 'X-Request-Id': uuidv4() };
  const payload = JSON.stringify({
    traveler_email: USER,
    items: [{ id: 'flights-1', mode: 'flights', price: 350, currency: 'USD' }]
  });
  const res = http.post(`${BASE}/booking`, payload, { headers: h });
  check(res, { 'booking 200': r => r.status === 200 });
  // follow-up validation: trips query
  const res2 = http.get(`${BASE}/trips`, { headers: { 'Authorization': `Bearer ${tok}`, 'X-Org-External-Id': ORG } });
  check(res2, { 'trips 200': r => r.status === 200 });
  sleep(1);
}

export function reportsScenario() {
  const tok = token();
  const h = { 'Authorization': `Bearer ${tok}`, 'X-Org-External-Id': ORG };
  const s = http.get(`${BASE}/reports/spend`, { headers: h });
  const c = http.get(`${BASE}/reports/compliance`, { headers: h });
  check(s, { 'spend 200': r => r.status === 200 });
  check(c, { 'compliance 200': r => r.status === 200 });
  sleep(0.5);
}
