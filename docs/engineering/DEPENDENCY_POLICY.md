# Dependency Policy & Package Management Standard

This document establishes the dependency vetting process, version locking rules, and security policies for all external libraries.

---

## 1. Package Manager & Lockfile Standard

- **Approved Package Manager**: `npm` (v10.9+) running on Node.js (v22.18+).
- **Lockfile Policy**: `package-lock.json` is mandatory and committed to version control.
- **Strict Prohibition**: Never run alternative package managers (`yarn`, `pnpm`, `bun`) inside this repository to avoid creating competing lockfiles or corrupted `node_modules` trees.

---

## 2. Dependency Vetting Protocol

Before installing any new dependency, the engineer or AI agent must verify:

1. **React 19 Compatibility**: React 19 introduces strict peer dependency requirements. Verify with:
   ```bash
   npm info <package-name> peerDependencies
   ```
2. **Next.js 16 Turbopack Compatibility**: Ensure the package supports ES Modules (ESM) and React Server Components (RSC) without requiring legacy Webpack hacks.
3. **Ponytail Minimal-Code Test**: Can the desired behavior be achieved with 10–20 lines of standard TypeScript or existing project utilities? If yes, **do not install an external dependency**.
4. **Duplicate Capability Check**: Never install a library whose capability already exists in the stack:
   - *Icons*: Only `lucide-react`. No `react-icons`, `@heroicons/react`, or FontAwesome.
   - *Class Merging*: Only `clsx` and `tailwind-merge` via `@/lib/utils`.
   - *Database*: Only `drizzle-orm` and `pg`. No Prisma, TypeORM, or raw query builders.
   - *CSS*: Only Tailwind CSS v4 and `@tailwindcss/postcss`. No Emotion, styled-components, or external Sass.

---

## 3. Approved Production Dependencies

| Package | Version | Status | Architectural Justification |
| :--- | :--- | :--- | :--- |
| `next` | 16.2.6 | Approved | Core full-stack framework with Turbopack |
| `react` / `react-dom` | 19.2.6 | Approved | Core UI component runtime |
| `drizzle-orm` / `pg` | 0.45.2 / 8.20.0 | Approved | Type-safe SQL database layer |
| `dotenv` | 17.3.1 | Approved | Environment variable loading |
| `lucide-react` | 1.16.x | Approved | Centralized SVG icon system |
| `clsx` / `tailwind-merge` | Latest | Approved | Standard conditional className utilities |

---

## 4. Security Auditing & Vulnerability Remediation

- Run `npm audit` periodically.
- Never use `npm audit fix --force` blindly, as it can introduce breaking major version upgrades.
- Any dependency with a known CVE or high/critical vulnerability must be reviewed and upgraded safely through targeted patch versions.

