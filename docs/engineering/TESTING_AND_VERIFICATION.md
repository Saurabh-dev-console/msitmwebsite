# Production Testing & Verification Standards (v3.0)

**Specification**: Antigravity Engineering Environment v3.0  
**Completion Rule**: An implementation is never reported complete without successful verification: the commands, their exit codes, and the relevant output must be quoted. Unrun checks must be listed as unrun, not implied.

---

## 1. Automated Verification Pipeline

Every code modification must pass this five-stage verification pipeline before committing:

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. TypeScript Static Typecheck                              │
│    npm run typecheck  (tsc --noEmit)                        │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 2. ESLint Static Analysis                                   │
│    npm run lint  (eslint .)                                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 3. Automated Test Suite                                     │
│    npm test  (node --test / vitest)                         │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 4. Next.js Turbopack Production Build                       │
│    npm run build  (next build)                              │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 5. CodeGraph Index & Impact Sync                            │
│    npx @colbymchenry/codegraph sync                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Nine Production Engineering Domains & Verifiable Gates

| Domain | Engineering Standard | Verifiable Gate |
| :--- | :--- | :--- |
| **1. Architecture & Code Quality** | Clear boundaries (UI -> domain -> data); inward dependency flow; small named functions; ADR for architectural choices. | `npm run lint` clean; zero circular dependencies; no duplicate abstractions. |
| **2. Security & Data Protection** | OWASP ASVS Level 2 baseline; server-side auth on every request; deny by default; Zod validation at boundaries; no secrets in code or git. | `npm audit` exit 0; secret scan clean; route authorization tests passing. |
| **3. Database Reliability** | Versioned migrations; expand-and-contract for zero-downtime changes; foreign keys and constraints in PostgreSQL; transaction wrapping. | Migration apply & rollback verified; query EXPLAIN plans inspected; zero unindexed N+1 queries. |
| **4. API Design** | Consistent resource model; pagination; idempotency keys for unsafe retries; RFC 9457 error details; structured schemas. | API contract tests passing; error shape tests; no breaking schema drift. |
| **5. Performance & Scalability** | Measure before optimizing; route-level code splitting; cache invalidation strategy; move slow work off request path. | Lighthouse proxy benchmarks recorded; Core Web Vitals targets met: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1. |
| **6. Error Handling & Observability** | Typed errors; zero swallowed exceptions; structured log output with correlation IDs; health endpoints. | Failure-path tests executed; request traced end-to-end; errors logged with context. |
| **7. Automated Testing** | Unit tests for logic; integration tests against realistic data; E2E for critical paths; bug fixes begin with failing test. | `npm test` exit 0 in CI/CD; changed behavior covered; zero quarantined flaky tests. |
| **8. CI/CD & Deployment** | Pipeline order: lint -> types -> unit -> build -> integration -> security; reproducible installs via `npm ci`. | Production build succeeds; zero deployment without explicit user sign-off. |
| **9. Component Reusability** | Primitives -> components -> patterns -> pages; variants over copies; accessibility built into primitives (`lucide-react`, Base UI). | CodeGraph search shows zero duplicate components; existing components reused first. |

---

## 3. Strict Evidence Standard (Section 8.4)

| Claim | Acceptable Evidence |
| :--- | :--- |
| **Code change works** | Exact test command, exit code, and passing lines; for bugs, test failing before and passing after. |
| **Type safety** | `npm run typecheck` command, exit code 0, zero diagnostics. |
| **Production build** | `npm run build` command, exit code 0, route summary table. |
| **UI correctness** | Verified across 3 breakpoints (360px mobile, 768px tablet, 1280px desktop); accessibility scan; performance metrics. |
| **Security fix** | Test exercising the specific attack/vulnerability path; scan output before and after. |
| **Tool / skill installed** | Discovery in Antigravity plus one real functional test output. |
| **Not verified** | Stated plainly with exact reason; never implied or assumed. |

---

## 4. Verification Commands Reference

```bash
# 1. Typecheck
npm run typecheck

# 2. Lint
npm run lint

# 3. Test
npm test

# 4. Production Build
npm run build

# 5. CodeGraph Status & Sync
npx @colbymchenry/codegraph status
npx @colbymchenry/codegraph sync
```
