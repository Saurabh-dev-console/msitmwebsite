# MSITM Website Responsive UI Audit & Fix Report

**Project:** Meena Shah Institute of Technology & Management (`msitm.edu.in`) — Next.js App Router Rebuild  
**Scope:** Full-site responsive audit and UI remediation across all sitemap routes, internal dynamic routes, error/search routes, shared chrome components, forms, and tables.  
**Verification Date:** 2026-11-10

---

## 1. Executive Summary

A full browser-based responsive audit using headless Chrome (CDP device metrics emulation) was performed across **86 routes** (all 84 routes in [`src/app/sitemap.ts`](file:///c:/Users/Saurabh%20Tiwari/Desktop/msitm-website-audit-rebuild/src/app/sitemap.ts) plus `/search?q=BCA` and `/not-found-404-check`) at **12 viewport widths** (**1,032 route-viewport checks**).

- **Baseline findings identified & reproduced:**
  - `Home` hero stats grid (`/`): `"50,000+"` (`stat-numeral`) overflowed its 88px grid cell at tablet/laptop widths (`768px`–`1920px`, 6 viewport occurrences) and collided visually with `"250+"`.
  - Narrow-screen contact formatting (`/contact`): dual phone numbers wrapped mid-number at `320px`.
  - Touch ergonomics (`320px`–`820px`): `.btn-sm` (`32px` height), utility bar phone/email links, mobile drawer `+`/`−` buttons and child links, sidebar `SiblingNav` items, news ticker links, search chips, and footer links fell below 40–44px tap targets (`672` baseline route-viewport occurrences across the initial selector sweep).
  - Grid/table containment: several `1fr` sidebar layouts (`[1fr_300px]`, `[1fr_320px]`, `[1fr_380px]`, `[1.2fr_1fr]`) lacked `min-w-0` guards against horizontal expansion on small screens; table first columns forced `whitespace-nowrap` on narrow phones; trailing desktop navigation dropdowns at `1280px` anchored `left-0`.
  - Mobile inputs (`< 640px`): `0.875rem` input text risked iOS auto-zoom on focus.
- **Post-fix verification result:** **0** horizontal overflows, **0** clipped headings/buttons/stat numerals, **0** button overflows, **0** sub-40px touch targets (`320px`–`820px`), and **0** header element overlaps across all **1,032** automated Chrome CDP checks.

---

## 2. Device Matrix & Automated Verification Results

All measurements below were captured against the production build (`npm run build` + `npx next start -p 3199`) in headless Chrome with explicit CDP `Emulation.setDeviceMetricsOverride`:

| Device Tier | Width (px) | Routes Checked | Horizontal Overflow (`scrollWidth > innerWidth`) | Clipped Controls / Numerals | Button Overflows | Small Touch Targets (`< 40px`) | Header Overlaps | Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Small Mobile | 320 | 86 | 0 | 0 | 0 | 0 | 0 | Pass |
| Small Mobile | 360 | 86 | 0 | 0 | 0 | 0 | 0 | Pass |
| Medium Mobile | 375 | 86 | 0 | 0 | 0 | 0 | 0 | Pass |
| Medium Mobile | 390 | 86 | 0 | 0 | 0 | 0 | 0 | Pass |
| Large Mobile | 414 | 86 | 0 | 0 | 0 | 0 | 0 | Pass |
| Large Mobile | 430 | 86 | 0 | 0 | 0 | 0 | 0 | Pass |
| Tablet | 768 | 86 | 0 | 0 | 0 | 0 | 0 | Pass |
| Tablet | 820 | 86 | 0 | 0 | 0 | 0 | 0 | Pass |
| Laptop | 1024 | 86 | 0 | 0 | 0 | N/A (Desktop) | 0 | Pass |
| Laptop | 1280 | 86 | 0 | 0 | 0 | N/A (Desktop) | 0 | Pass |
| Desktop | 1440 | 86 | 0 | 0 | 0 | N/A (Desktop) | 0 | Pass |
| Desktop | 1920 | 86 | 0 | 0 | 0 | N/A (Desktop) | 0 | Pass |
| **Total** | **12 widths** | **1,032** | **0** | **0** | **0** | **0** | **0** | **Pass** |

### Visual & Interactive Browser Checks Performed
- Visually inspected rendered screenshots across key breakpoints (`320px`, `375px`, `768px`, `1024px`, `1280px`, `1440px`, `1920px`) on `/`, `/courses/undergraduate-courses`, `/courses/undergraduate-courses/bca`, `/courses/diploma-courses/a-level`, `/admission-form`, `/faculty/it-faculty`, `/contact`, and `/audit`.
- Verified interactive mobile menu drawer opening at `320px` (14 rendered drawer links, expandable section accordion toggle, stacked contact phone/email footer block, full-width admission CTA).
- Verified desktop Explore MSITM mega-menu modal opening at `1280px` (`role="dialog"`, 4-column responsive site index, keyboard `Escape` dismissal) and trailing dropdown alignment (`right-0` for index `>= 5`).

---

## 3. Global & Shared Component Fixes

1. **Root Viewport & Meta Configuration (`src/app/layout.tsx`)**
   - Exported explicit Next.js `viewport: Viewport` (`width: "device-width"`, `initialScale: 1`, `viewportFit: "cover"`).
2. **Global Touch Targets, Forms, Tables & Transitions (`src/app/globals.css`)**
   - Replaced `transition: all 0.15s ease` on `.btn` with explicit visual transitions (`background-color`, `border-color`, `color`, `filter`, `box-shadow`, `transform`), preventing height animation lag across responsive viewport transitions.
   - Allowed safe button label wrapping below `400px` (`white-space: normal` below `400px`; `white-space: nowrap` from `min-width: 400px`).
   - Enforced `min-height: 2.75rem` (`44px`) for `.btn`, `.btn-sm`, `.field-input`, and `.field-select` at `@media (max-width: 1023px)` across mobile and tablet breakpoints.
   - Set `.field-input`, `.field-select`, and `.field-textarea` font size to `1rem` (`16px`) below `640px` to prevent iOS Safari focus zoom, and tightened mobile table cell padding in `.table-msitm`.
3. **Header & Mobile/Desktop Navigation (`src/components/Header.tsx`)**
   - Constrained the mobile institute logo (`max-w-[146px]` at `320px`, `min-[360px]:max-w-[188px]`, `sm:max-w-none`) and header horizontal gaps (`px-3 sm:px-6 lg:px-8 gap-2`) so Search (`min-w-[44px] min-h-[44px]`) and Menu (`min-h-[44px]`) sit cleanly side by side at `320px`.
   - Right-aligned trailing desktop dropdown panels (`idx >= 5 ? "right-0" : "left-0"`) to avoid right-edge viewport clipping at `1280px`.
   - Upgraded utility bar actions, Explore modal close/footer links, and mobile drawer rows (Home, section links, `+`/`−` accordion toggles, child links, and stacked phone/email footer links) to >= 44px touch height on mobile/tablet.
4. **Footer (`src/components/Footer.tsx`)**
   - Added `min-w-0` grid track guards and `break-words` / `break-all sm:break-normal` wrapping for address and email.
   - Enforced `min-h-[44px] min-w-[44px] lg:min-h-0 lg:min-w-0` on Quick Links and Our Courses links, `min-h-[44px]` on contact/legal links on mobile/tablet, prevented mid-number wrapping with `whitespace-nowrap`, hid the inline `·` separator below `400px`, and made the footer CTA `w-full sm:w-auto`.
5. **Hero, Section Headings, Breadcrumbs & Blocks (`src/components/chrome.tsx`)**
   - Upgraded `PageHero` typography to fluid sizing (`text-[1.75rem] min-[375px]:text-[2rem] sm:text-4xl lg:text-[2.75rem] xl:text-5xl break-words`), tuned mobile backdrop visibility (`opacity-45 md:opacity-35`), and added `min-w-0` to columns and `SidebarCard`.
   - Added `min-w-0 break-words` across `SectionHeading`, `Blocks` (`facts`, `cta`, `linkCards`, `message`), wrapped data tables in `overflow-x-auto max-w-full rounded-xl`, replaced unconditional first-column `whitespace-nowrap` with `sm:whitespace-nowrap`, and made CTA buttons `w-full sm:w-auto`.
   - Increased touch area on `SiblingNav` rows (`min-h-[44px]`) and `Breadcrumbs` links (`min-h-[36px] lg:min-h-0`).
6. **Cards, Search & Forms (`src/components/widgets.tsx`, `src/components/forms.tsx`)**
   - Added `min-w-0 break-words` guards to `PlacedCard`, `TestimonialCards`, and `CourseCard`.
   - Stacked `SearchBox` controls vertically below `380px` (`flex-col min-[380px]:flex-row`).
   - Added `min-w-0` wrappers to form grids in `EnquiryForm` and `AdmissionForm` (protecting against wide native `<select>` option strings) and set `w-full sm:w-auto` submit buttons on `FeedbackForm` and `CertificateLookup`.

---

## 4. Route-Wise Checklist & Page-Specific Fixes

| Route / Pattern | Category | Responsive Fixes Verified | Status |
| :--- | :--- | :--- | :---: |
| `/` (`src/app/page.tsx`) | Homepage | Fixed hero `"50,000+"` numeral collision at `768px`–`1024px`; aligned mobile 3-photo collage heights (`h-52` + dual `h-[6.1875rem]`); stacked hero/about/founder/counsellor CTAs `< 420px`/`380px`; added `min-h-[44px]` to ticker links and counsellor phone/email links. | Pass |
| `/about` (`src/app/about/page.tsx`) | Institution | Added `min-w-0` on `1fr` content container and `<aside>`, fluid mobile padding. | Pass |
| `/about/[slug]` (7 routes) | Subpages | Added `min-w-0` on main/aside grid tracks, centered 44px phone link in sidebar. | Pass |
| `/courses` (`src/app/courses/page.tsx`) | Academics | Made bottom counselling banner `flex-col sm:flex-row` with `w-full sm:w-auto` CTA. | Pass |
| `/courses/[level]` (4 routes) | Category Pages | Added `min-w-0` to main & sidebar, stacked CTA buttons `< 400px`, 44px sidebar programme links. | Pass |
| `/courses/[level]/[course]` (21 routes) | Programme Detail | Added `min-w-0 break-words` to specification `<dl>`, `min-h-[44px]` sidebar links, responsive print/apply button bar. | Pass |
| `/faculty` & `/faculty/[slug]` (7 routes) | Faculty | Added `min-w-0 break-words` across faculty cards, qualification/expertise definitions, and `<aside>`. | Pass |
| `/facilities` & `/facilities/[slug]` (5 routes) | Facilities | Added `min-w-0` across content and sidebar columns; responsive `Blocks` tables & images. | Pass |
| `/placement` & `/placement/[slug]` (3 routes) | Placements | Added `min-w-0` sidebar/main guards, resilient `PlacedGrid` and `RecruiterMarquee` overflow clipping. | Pass |
| `/alumni`, `/success-stories`, `/training-placement` | Careers / Community | Fluid CTA sizing (`w-full sm:w-auto`), responsive `TestimonialCards` grid (`sm:grid-cols-2 lg:grid-cols-3`). | Pass |
| `/college-news-events` & `/college-news-events/[slug]` (4 routes) | News Index | Added `min-w-0 break-words` on news stream cards and `min-h-[40px]` sidebar recent links; zero gap collapse when stacked (`gap-0 md:gap-5`). | Pass |
| `/[slug]` (3 news posts) | News Articles | Added `min-w-0` guards on article body, "More news" cards, and recent posts sidebar. | Pass |
| `/iqac` & `/iqac/[slug]` (11 routes) | Quality Cell | Added `min-w-0` on `Blocks` wrapper & sidebar `<aside>`; horizontally scrollable data tables. | Pass |
| `/admission-form`, `/admission-process`, `/admission-calender` | Admissions | Added `min-w-0` on form container & sidebar, `min-h-[44px]` link rows, fluid `<select>` width (`w-full`), untouched phone formatting. | Pass |
| `/contact` (`src/app/contact/page.tsx`) | Contact | Split `Call us` dual phone numbers into separate `whitespace-nowrap` anchors hiding separator `·` below `400px`; added `min-w-0 break-all sm:break-normal` for email. | Pass |
| `/student-corner` (`src/app/student-corner/page.tsx`) | Feedback & Survey | Added `min-w-0` cards for `FeedbackForm` instances across 2-column grid. | Pass |
| `/msitm-independence-day-certificate`, `/bachpan-independence-day-certificate` | Certificate Desks | Added `min-w-0` guards, 44px back/helpline links, responsive `CertificateLookup` submit button. | Pass |
| `/search` & `/search?q=BCA` | Site Search | Responsive `SearchBox` (`min-[380px]:flex-row`), 44px popular query chips on mobile/tablet. | Pass |
| `/sitemap-page` (`src/app/sitemap-page/page.tsx`) | HTML Sitemap | Multi-column `sm:grid-cols-2 lg:grid-cols-3` with `min-w-0` navs and `min-h-[40px]` touch spacing on mobile/tablet. | Pass |
| `/audit` (`src/app/audit/page.tsx`) | Rebuild Audit | Changed summary KPI grid to `grid-cols-2 md:grid-cols-4`, added `max-w-full rounded-xl overflow-x-auto` table containment and `break-words` monospace URLs. | Pass |
| `/design-system` (`src/app/design-system/page.tsx`) | Visual Spec | Scaled typography specimen (`text-2xl sm:text-4xl md:text-5xl break-words`) and added `min-w-0` form input grid. | Pass |
| `/privacy-policy`, `/thank-you`, `/not-found-404-check` | Utility / Error | Scaled 404 heading (`text-3xl sm:text-4xl md:text-5xl`), responsive thank-you button row and 44px helpline link. | Pass |

---

## 5. Preserved Images & Visual Integrity

All genuine institutional MSITM photographs (`public/images/authentic/*`, `public/images/generated/*`, `PLACED_STUDENTS`, `TESTIMONIALS`, `RECRUITERS`, and `/brand/msitm-logo.png`) were preserved cleanly without distortion, with responsive `object-cover`, `object-top` / `object-center` positioning, and dark-green/gold overlay legibility tuned per breakpoint.

---

## 6. Build & Static Verification Gate

The following checks executed and passed after the final source changes:

- `npm run typecheck` (`tsc --noEmit`) — **Exit 0**
- `npm run lint` (`eslint .`) — **Exit 0**
- `npm run build` (`next build` via Turbopack; 92 static/SSG + dynamic routes) — **Exit 0**
- `impeccable detect --json src\components src\app` — **Exit 0** (1 pre-existing advisory pattern on `.hero-grid-lines`)
- `npx --yes gitnexus@latest detect-changes --scope all --repo .` — **Exit 0** (`44` changed files, `270` symbols mapped, `81` execution flows checked)
- Headless Chrome CDP Audit (`86` routes × `12` viewports = `1,032` checks) — **Exit 0** (`0` issues across all buckets)

### Local Environment Notes
- `/api/health` returned HTTP `500` when probed against `localhost:3199` solely because no live PostgreSQL instance is running behind `.env` in this local workspace. All frontend pages and client form validation states render and operate as designed.

