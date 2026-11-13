# Approved UI Libraries & Component Integration Guide (v3.0)

> [!NOTE]
> This guide is consolidated into @[ui-standards](./UI_STANDARDS.md). Follow `UI_STANDARDS.md` for complete design brief gates, tokens, motion policy, and anti-slop rules.

---

## 1. Approved UI Component Sources & Registry Status

| Source | Focus | Status | Installation Mechanism |
| :--- | :--- | :--- | :--- |
| **Skiper UI** | Interactive UI components & widgets | `CONFIGURED (ON-DEMAND)` | `npx shadcn add @skiper-ui/<component>` (attribution required for free tier) |
| **Vengence UI** | Modern animated cards & containers | `TO VERIFY AT INSTALL` | On-demand via shadcn registry alias (`vengenceui.com`) |
| **Animaster** | Animation library | `PENDING USER INPUT` | Upstream unverified. Do not install until official package/repository is provided. |

---

## 2. Registry Configuration (`components.json`)

To support modular component installation without polluting `package.json` with monolithic external packages, the project uses standard `components.json` registry aliases:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

---

## 3. Component Installation Invariants

1. **One Component at a Time**: Never install whole libraries. Add only the specific component required for an approved task.
2. **One Icon Library**: Always use `lucide-react` via `src/components/icons.tsx`.
3. **Token Alignment**: Ensure newly installed components consume tokens from `src/app/globals.css`.
