# Onyx Knowledge Platform Integration Guide (Deferred Evaluation)

This document provides architectural analysis and integration prerequisites for Onyx (`github.com/onyx-dot-app/onyx`) as an optional enterprise knowledge search and RAG platform.

---

## 1. Architectural Distinction: Platform vs. Skill

> **IMPORTANT ARCHITECTURAL NOTICE**: Onyx is an enterprise-scale search and RAG application platform, NOT an Agent Skill or single npm package. It must NOT be added as a mock skill folder with a `SKILL.md`.

Onyx consists of multiple containerized services:
- **Onyx Web Frontend / Admin UI**: Next.js management console.
- **Onyx Backend API**: FastAPI Python service coordinating indexing and search.
- **Background Ingestion Workers**: Celery / background pipelines for crawling documentation.
- **Vector Search Engine**: Vespa / Qdrant for dense embedding retrieval.
- **Relational Storage**: PostgreSQL for user, permission, and credential management.
- **Cache Layer**: Redis for message queues and temporary states.

---

## 2. Infrastructure & Resource Assessment

Deploying Onyx locally requires:
- **Runtime Environment**: Docker Desktop with WSL2 backend (Windows 11/10).
- **Compute Resources**: Minimum 4 dedicated CPU cores, 16 GB RAM, and 30 GB available SSD storage.
- **Network Ports**: Default bindings on ports `80` (HTTP web proxy) and `8080` (API server).
- **Security Prerequisite**: Must not index sensitive `.env` files, database credentials, or student PII.

---

## 3. MCP Integration Strategy (Post-Deployment)

Once an Onyx instance is officially provisioned:
1. **MCP Server**: Onyx includes a built-in MCP server under `backend/onyx/mcp_server`.
2. **Authentication**: Use scoped, read-only API tokens generated from the Onyx Admin Console.
3. **Antigravity Configuration**: Configure the remote SSE or Streamable HTTP MCP endpoint in Antigravity settings:
   ```json
   {
     "mcpServers": {
       "onyx": {
         "url": "http://localhost:8080/mcp",
         "headers": {
           "Authorization": "Bearer ${ONYX_API_KEY}"
         }
       }
     }
   }
   ```
4. **Token Security**: Store `ONYX_API_KEY` in user-level environment variables, never in project version control.

---

## 4. Current Status: Deferred

- **Status**: **NOT INSTALLED (DEFERRED)**
- **Reason**: The MSITM website audit and rebuild project does not currently require a multi-gigabyte containerized RAG platform for core website development. GitNexus provides complete local code knowledge graph capabilities without external service overhead.

