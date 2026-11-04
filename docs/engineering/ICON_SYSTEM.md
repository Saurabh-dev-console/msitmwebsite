# Centralized Icon System & Usage Standard

This document details the icon system, import conventions, accessibility rules, and prohibition of hardcoded icons across the MSITM web platform.

---

## 1. Zero Hardcoded Icons Policy (Phase 7 Rule 1)

### Prohibited Patterns (Strictly Forbidden)
```tsx
// ❌ FORBIDDEN: Hardcoded Unicode characters
<span>☰</span> Menu
<button>Close ✕</button>
<p>▶ Watch video</p>

// ❌ FORBIDDEN: Emoji icons in application UI
<span>📞 +91 9415...</span>
<span>✉️ info@msitm.edu.in</span>

// ❌ FORBIDDEN: Raw inline SVG blocks
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <path d="M3 12h18M3 6h18M3 18h18" />
</svg>

// ❌ FORBIDDEN: Direct unvetted icon library imports
import { FaPhone } from "react-icons/fa";
```

### Approved Standard Pattern
```tsx
// ✅ APPROVED: Import from centralized icons module
import { Icons } from "@/components/icons";

<Icons.Menu className="h-5 w-5" aria-hidden="true" />
<Icons.Phone className="h-4 w-4" aria-hidden="true" />
<Icons.Close className="h-4 w-4" aria-hidden="true" />
```

---

## 2. Centralized Icon Registry (`src/components/icons.tsx`)

All icons used across the project are centralized in `src/components/icons.tsx`. This ensures uniform sizing, stroke widths, and accessibility affordances.

```typescript
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Phone,
  Mail,
  Search,
  Check,
  CheckCircle,
  ExternalLink,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  GraduationCap,
  Building,
  ArrowRight,
  ArrowLeft,
  Clock,
  User,
  Users,
  FileText,
  AlertCircle,
  Info,
  Download,
  Share2,
} from "lucide-react";

export const Icons = {
  Menu,
  Close: X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Phone,
  Mail,
  Search,
  Check,
  CheckCircle,
  ExternalLink,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  GraduationCap,
  Building,
  ArrowRight,
  ArrowLeft,
  Clock,
  User,
  Users,
  FileText,
  AlertCircle,
  Info,
  Download,
  Share: Share2,
};
```

---

## 3. Sizing & Styling Standards

Icons must use standard Tailwind CSS utility classes:

| Context | Tailwind Classes | Dimensions | Example |
| :--- | :--- | :--- | :--- |
| **Inline with Small Text / Buttons** | `h-3.5 w-3.5` or `h-4 w-4` | 14px–16px | `<Icons.Phone className="h-4 w-4" />` |
| **Standard Navigation / Badges** | `h-5 w-5` | 20px | `<Icons.Menu className="h-5 w-5" />` |
| **Feature Cards / Section Highlights** | `h-6 w-6` or `h-8 w-8` | 24px–32px | `<Icons.GraduationCap className="h-8 w-8 text-gold-600" />` |

---

## 4. Accessibility Rules for Icons

1. **Decorative Icons**: When an icon accompanies visible text (e.g., `<Icons.Phone /> Call Us`), it is decorative and MUST have `aria-hidden="true"`.
2. **Interactive Standalone Icons**: When an icon is the only child of an interactive element (e.g., a close button or search trigger), the parent `<button>` or `<a>` MUST have an explicit `aria-label`:
   ```tsx
   <button
     type="button"
     onClick={onClose}
     aria-label="Close dialog"
     className="btn btn-outline-dark btn-sm"
   >
     <Icons.Close className="h-5 w-5" aria-hidden="true" />
   </button>
   ```

