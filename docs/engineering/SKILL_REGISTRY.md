# Agent Skill & Repository Registry (v3.0)

**Specification**: Antigravity Engineering Environment v3.0  
**Status Standard**: `INSTALLED AND VERIFIED`, `CONFIGURED AND VERIFIED`, `BLOCKED`, `PENDING USER INPUT`, `DEFERRED`.

---

## 1. Verified Inventory Register

| # | Item | Upstream Source | Class | Licence | Status | Evidence / Verification Method |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **REA** | `morluto/rea` | MCP + CLI + Skill | MIT | `INSTALLED AND VERIFIED` | `.agents/skills/reverse-engineer-anything/SKILL.md` present; registered in `skills-lock.json`. |
| 2 | **Ponytail** | `DietrichGebert/ponytail` | Skill + Ruleset | MIT | `INSTALLED AND VERIFIED` | `.agents/skills/ponytail/SKILL.md` present; brevity and simplicity guidelines active. |
| 3 | **Hallmark** | `Nutlope/hallmark` | Anti-slop Design Skill | MIT | `INSTALLED AND VERIFIED` | `.agents/skills/hallmark/SKILL.md` present; registered in `skills-lock.json`. |
| 4 | **Impeccable** | `pbakaus/impeccable` | Skill + CLI Detector | Apache-2.0 | `INSTALLED AND VERIFIED` | `.agents/skills/impeccable/SKILL.md` present; detector runnable via `npx impeccable`. |
| 5 | **UI UX Pro Max** | `nextlevelbuilder/ui-ux-pro-max-skill` | Design Data + Python CLI | MIT | `INSTALLED AND VERIFIED` | `.agents/skills/ui-ux-pro-max/SKILL.md` + data CSVs present. (Python runtime required for CLI scripts). |
| 6 | **Humanizer** | `hannsxpeter/humanizer` | Pure-Prompt Skill | MIT / Unconfirmed | `INSTALLED AND VERIFIED` | `.agents/skills/humanizer/SKILL.md` present; prompt patterns available. |
| 7 | **Last30Days** | `mvanhorn/last30days-skill` | Skill + Python Scripts | MIT | `INSTALLED AND VERIFIED` | `.agents/skills/last30days/SKILL.md` present. (Python 3.12+ required for social script execution). |
| 8 | **Scrapling** | `D4Vinci/Scrapling` | Library + CLI + MCP + Skill | BSD-3-Clause | `INSTALLED AND VERIFIED` | `.agents/skills/scrapling-official/SKILL.md` present; authorised scraping targets only. |
| 9 | **Diagram Design** | `cathrynlavery/diagram-design` | HTML/SVG Design Skill | MIT | `INSTALLED AND VERIFIED` | `.agents/skills/diagram-design/SKILL.md` present; registered in `skills-lock.json`. |
| 10 | **Ralph Loop** | `snarktank/ralph` | Autonomous Loop + Adapter | MIT | `CONFIGURED AND VERIFIED` | `scripts/ralph/ralph.sh`, `AGY.md`, `prd.json.example`, `progress.txt.example` configured. |
| 11 | **CodeGraph** | `colbymchenry/codegraph` | Local SQLite MCP Graph | MIT / Apache-2.0 | `INSTALLED AND VERIFIED` | Primary graph engine: `npx @colbymchenry/codegraph init -y` indexed 284 files (8,865 nodes, 24,219 edges). |
| 12 | **GitNexus** | `abhigyanpatwari` | Local MCP Code Graph | PolyForm Noncommercial | `BLOCKED FOR COMMERCIAL USE` | Blocked by non-commercial license clause. Retained only as non-commercial fallback. |
| 13 | **Onyx** | `onyx-dot-app/onyx` | Enterprise Platform | MIT CE / EE Proprietary | `DEFERRED` | Standalone platform deployment; deferred until dedicated infra approval. |
| 14 | **Skiper UI** | `skiper-ui.com` | shadcn Component Registry | Free w/ attrib / Pro | `CONFIGURED (ON-DEMAND)` | Installed component-by-component via `npx shadcn add @skiper-ui/<component>`. |
| 15 | **Vengence UI** | `vengenceui.com` | Radix/Tailwind Components | Not confirmed | `TO VERIFY AT INSTALL` | On-demand component install; license and exact package to be confirmed upon use. |
| 16 | **Animaster** | Unverified | Animation Library | Unknown | `PENDING USER INPUT` | No official repository URL or npm package identified. Substitution forbidden. |

---

## 2. Token-Efficient Skill Routing Table

Routing is deterministic. Match user intent to the primary skill, add at most one complementary skill, and load CodeGraph context:

| Task Intent | Primary Skill | Complementary | Forbidden / Never Do |
| :--- | :--- | :--- | :--- |
| **Implement, refactor, or simplify code** | `ponytail` + CodeGraph | Project rules (`.agents/rules/`) | Trade away validation, security, a11y, or tests for brevity |
| **Create new UI surface (page/flow/component)** | `hallmark` OR `ui-ux-pro-max` (choose one) | `impeccable` (audit afterwards) | Run both generators simultaneously on the same component |
| **Audit or polish existing UI** | `impeccable` (audit, critique, polish) | `hallmark` (audit only) | Full redesign when only bug fixes or polish were requested |
| **Redesign maintaining content and IA** | `hallmark` (redesign mode) | `ui-ux-pro-max` for design tokens | Mutate copy, routes, or API data contracts |
| **Reverse engineer authorized binary/runtime** | `reverse-engineer-anything` | `diagram-design` for architecture | Target unauthorized systems or bypass DRM/licensing |
| **Polish prose, docs, or UX copy** | `humanizer` | — | Touch code identifiers, API signatures, or error constants |
| **Recent technology / community research** | `last30days` | — | Treat unverified Reddit/X assertions as verified architectural facts |
| **Extract data from authorized web source** | `scrapling-official` | — | Bypass access controls or ignore `robots.txt` / terms |
| **Architecture / sequence / ER diagrams** | `diagram-design` | Mermaid for simple markdown | Embed credentials, tokens, or internal IP addresses |
| **Large multi-story autonomous delivery** | Ralph Loop (`scripts/ralph/`) | `/plan` first | Start unattended loop without human-reviewed `prd.json` |
