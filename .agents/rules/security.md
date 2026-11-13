---
trigger: model_decision
description: "Apply when writing, reviewing, or modifying authentication, authorization, APIs, secrets, or user input handling."
---
# Security & Data Protection Standards

Follow @[engineering-rules](docs/engineering/ENGINEERING_RULES.md).

## Non-Negotiables:
1. **OWASP ASVS Level 2 Target**:
   - Server-side authorization check on every data mutation and protected route (`deny by default`).
   - Never trust client-provided role or user IDs without session verification.
2. **Boundary Validation**:
   - Every API request body, query parameter, and route parameter must be strictly parsed with Zod schemas.
   - Encode output to prevent Cross-Site Scripting (XSS).
3. **Secret Hygiene**:
   - Zero hardcoded API keys, JWT secrets, database connection strings, or service tokens in source code, docs, git history, or logs.
   - Use `.env` with `.gitignore` and `.env.example` templates.
4. **Data Minimization & Privacy**:
   - PII (phone numbers, addresses, roll numbers) must be protected, masked where appropriate, and omitted from console logs.
5. **Dependency Audit**:
   - Regularly verify dependencies with `npm audit`. Zero critical/high known vulnerabilities allowed.

