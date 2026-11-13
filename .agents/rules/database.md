---
trigger: model_decision
description: "Apply when writing or reviewing database migrations, Drizzle schema, or SQL queries."
---
# Database Reliability & Migration Standards

Follow @[architecture](docs/engineering/ARCHITECTURE.md).

## Non-Negotiables:
1. **Schema Authority**: `src/db/schema.ts` is the single source of truth for Drizzle ORM definitions and relationships.
2. **Expand-and-Contract Migrations**:
   - Never drop or rename a column in a single deploy. Expand with the new column, backfill data, switch reads/writes, then contract.
   - Migrations must apply and roll back cleanly in CI/CD without data loss.
3. **Database-Enforced Integrity**:
   - Enforce foreign keys, unique constraints, and non-null checks at the database engine level, not merely in application code.
4. **Transactions & Idempotency**:
   - Wrap all multi-step mutation operations in database transactions.
   - Use idempotency keys or upsert patterns for retried mutations.
5. **Query Optimization**:
   - Add indexes justified by query patterns and EXPLAIN plans.
   - Avoid N+1 queries by joining relations or utilizing batch loading.

