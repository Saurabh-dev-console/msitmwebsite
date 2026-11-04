# Approved UI Libraries & Component Integration Guide

This guide establishes the approved UI component libraries, installation mechanisms, registry configurations, and design integration standards for the MSITM web platform.

---

## 1. Approved UI Component Sources

The MSITM engineering standard approves three specific UI component sources:

| Source | Primary Focus | Installation Mechanism | Registry URL / Source |
| :--- | :--- | :--- | :--- |
| **Skiper UI** | Interactive, high-polish UI components & widgets | shadcn Registry CLI | `https://skiper-ui.com/r/{name}.json` |
| **Vengence UI** | Modern animated cards, rays, interactive containers | shadcn Registry CLI | `https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/{name}.json` |
| **Animaster Lib** | High-end WebGL shaders, motion primitives, hero animations | Copy-paste modular integration | `https://animmasterlib.dev` |

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
  },
  "registries": {
    "@skiper-ui": "https://skiper-ui.com/r/{name}.json",
    "@vengeanceui": "https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/{name}.json"
  }
}
```

---

## 3. Library-Specific Installation Protocols

### 3.1 Skiper UI

- **Documentation**: [https://skiper-ui.com/docs/quick-start](https://skiper-ui.com/docs/quick-start)
- **Supported Mechanism**: Free components are installed using the shadcn CLI:
  ```bash
  npx shadcn add @skiper-ui/[component-id]
  ```
  *Example*: `npx shadcn add @skiper-ui/skiper40`
- **Pro Components**: If a Pro component is required, add `SKIPER_LICENSE_KEY` in `.env.local` and authenticate requests as documented in the official guide.
- **Placement**: Installed components reside under `src/components/ui/skiper-ui/` or `src/components/v1/`.

### 3.2 Vengence UI

- **Official Website**: [https://www.vengenceui.com/](https://www.vengenceui.com/)
- **Supported Mechanism**: Install via the configured `@vengeanceui` registry namespace:
  ```bash
  npx shadcn@latest add @vengeanceui/[component-name]
  ```
  Alternatively, install directly via the official raw registry URL:
  ```bash
  npx shadcn@latest add https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/[component-name].json
  ```
- **Placement**: Component files are placed under `src/components/ui/`.

### 3.3 Animaster Lib

- **Official Repository/Domain**: [https://animmasterlib.dev](https://animmasterlib.dev)
- **Framework Compatibility**: Built for modern React 19 / Next.js / Tailwind CSS environments.
- **Supported Mechanism**: Copy-paste modular integration. High-FPS shader and canvas effects are installed selectively into `src/components/ui/animaster/`.
- **Pre-requisite Check**: Before adding canvas or WebGL components, verify that peer animation libraries (e.g., Framer Motion / Motion) do not conflict with existing React 19 dependencies. Never substitute an unverified third-party npm package.

---

## 4. UI Component Selection Rules

1. **Install Only What Is Needed**: Never import or install entire component libraries as dependencies. Only install individual requested components via registry CLI or modular source files.
2. **Search First**: Before pulling any new component, inspect `src/components/` to verify whether an equivalent card, banner, or drawer already exists.
3. **Preserve Design Tokens**: Any installed component must be adapted to use the project's color palette (`--color-navy-*`, `--color-gold-*`, `--color-parchment`) and typography (`Fraunces` editorial serif and `Inter` sans) defined in `src/app/globals.css`.
4. **No Conflicting Animation Engines**: Do not run multiple heavy physics or animation runtimes concurrently. Prioritize lightweight CSS transitions and Tailwind utility classes (`globals.css`) for standard UI interactions.
5. **Accessibility Mandatory**: Review all imported components for keyboard accessibility (`Tab`, `Escape`), ARIA roles, and high-contrast focus rings before deployment.

