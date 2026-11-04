# Antigravity Skills Registry

This document records the official sources, installation mechanisms, security assessments, and verification statuses for all skills configured in this workspace.

---

## 1. Primary Engineering Skills

| Skill Name | Repository / Source | License | Classification | Status | Verified Function |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ponytail** | `github.com/DietrichGebert/ponytail` | MIT | Agent Skill | **INSTALLED AND VERIFIED** | Minimal-code engineering, prevents overengineering and bloat |
| **task-chunking** | Local Workflow / Master Spec | MIT | Agent Skill | **CONFIGURED AND VERIFIED** | 6-stage sequential task decomposition with verification gates |
| **reverse-engineering** | `github.com/morluto/rea` (adapted) | MIT | Agent Skill | **CONFIGURED AND VERIFIED** | Clean-room UI & interaction reconstruction protocol |
| **reverse-engineer-anything** | `github.com/morluto/rea` | MIT | Agent Skill / REA | **INSTALLED AND VERIFIED** | Runtime/binary inspection, bundle analysis |
| **code-graph** | GitNexus Code Intelligence | MIT | Graph / CLI / MCP | **CONFIGURED AND VERIFIED** | AST symbol context, call paths, blast radius impact analysis |

---

## 2. Complementary Frontend & Design Skills

| Skill Name | Repository / Source | License | Classification | Status | Verified Function |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ui-ux-pro-max** | `github.com/nextlevelbuilder/ui-ux-pro-max-skill` | MIT | Agent Skill | **INSTALLED AND VERIFIED** | Design systems, WCAG accessibility, color and typography profiles |
| **hallmark** | `github.com/Nutlope/hallmark` | MIT | Agent Skill | **INSTALLED AND VERIFIED** | Bespoke web design & page layout generation |
| **impeccable** | `github.com/pbakaus/impeccable` | MIT | Agent Skill | **INSTALLED AND VERIFIED** | Frontend UI critique, UX hardening, layout polish |
| **humanizer** | `github.com/hannsxpeter/humanizer` | MIT | Agent Skill | **INSTALLED AND VERIFIED** | Natural language copywriting, de-slopping AI text |
| **diagram-design** | `github.com/cathrynlavery/diagram-design` | MIT | Agent Skill | **INSTALLED AND VERIFIED** | Technical architecture, ER, sequence, and system diagrams |
| **last30days** | `github.com/mvanhorn/last30days-skill` | MIT | Agent Skill | **INSTALLED AND VERIFIED** | Recent web, GitHub, and community technical research |

---

## 3. GitNexus Code Intelligence Skills

| Skill Name | Source | Classification | Status | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **gitnexus-cli** | GitNexus Embedded | Agent Skill | **INSTALLED AND VERIFIED** | CLI indexing, status, and graph wiki commands |
| **gitnexus-impact-analysis** | GitNexus Embedded | Agent Skill | **INSTALLED AND VERIFIED** | Blast radius calculations before file edits |
| **gitnexus-debugging** | GitNexus Embedded | Agent Skill | **INSTALLED AND VERIFIED** | Bug tracing and error origin traversal |
| **gitnexus-exploring** | GitNexus Embedded | Agent Skill | **INSTALLED AND VERIFIED** | Architecture and execution flow exploration |
| **gitnexus-refactoring** | GitNexus Embedded | Agent Skill | **INSTALLED AND VERIFIED** | Call-graph safe symbol renaming and extractions |
| **gitnexus-guide** | GitNexus Embedded | Agent Skill | **INSTALLED AND VERIFIED** | Tool schemas, MCP protocol, and query references |

---

## 4. Evaluated External Services / Non-Skill Platforms

| Target | Upstream Source | Classification | Current Status | Disposition / Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Onyx** | `github.com/onyx-dot-app/onyx` | Enterprise RAG Platform | **NOT INSTALLED (DEFERRED)** | Full platform requiring Docker/WSL2 and dedicated host services. Documented in `docs/engineering/ONYX_INTEGRATION.md`. |
| **Scrapling** | `github.com/D4Vinci/Scrapling` | Python Scraping Toolkit | **NOT INSTALLED (DEFERRED)** | Python-based web scraper. Deferred to prevent adding unneeded Python runtime dependencies to this TypeScript/Next.js repository. |
| **Animaster** | `animmasterlib.dev` | UI Component Registry | **PENDING USER INPUT** | Copy-paste UI source documented in `docs/engineering/UI_LIBRARY_GUIDE.md`. No monolithic npm package installed. |
| **Task-Chunking Upstream Repo** | Separate URL from project owner | Upstream Repository | **PENDING USER INPUT** | Runs as a fully verified local workflow in `.agents/skills/task-chunking/SKILL.md` pending owner URL. |

