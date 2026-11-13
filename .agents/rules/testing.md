---
trigger: glob
globs: "*.test.*, *.spec.*"
description: "Testing standards: unit, integration, and regression verification."
---
# Testing & Verification Standards

Follow @[testing](docs/engineering/TESTING_AND_VERIFICATION.md).

## Non-Negotiables:
1. **Defect-First Testing**: Every bug fix must begin with a minimal test that fails against the defect before applying code changes.
2. **Determinism**: Zero flaky tests permitted. Mock non-deterministic inputs (clocks, network, external IDs).
3. **Layered Verification**:
   - Unit tests: Business logic, pure functions, parsers, and data formatting.
   - Integration tests: API route handlers, database queries, and multi-step actions.
   - End-to-end tests: Critical user journeys (portal login, certificate verification, admission flow).
4. **Failure Branches**: Test rejection paths, unauthorized access attempts, and malformed inputs—not just happy paths.
5. **Clean Baseline**: The test runner (`npm test`) must exit code 0 before any PR or commit is ready.

