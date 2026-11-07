# NEXUS — Technical Architecture Specification

---

## 1. System Overview & Technology Stack

NEXUS is engineered as a modern, high-performance web application designed for enterprise education management.

| Layer | Technology | Justification |
|---|---|---|
| **Framework** | Next.js 15+ (App Router) | React Server Components (RSC), nested layouts, server actions, parallel routing for master-detail views |
| **Language** | TypeScript (Strict Mode) | Zero `any` policy, strict null checks, end-to-end typed domain models |
| **Styling** | Tailwind CSS + Custom CSS Variables | Granular design tokens, zero runtime CSS overhead, precise responsive breakpoints |
| **Component Primitives** | Radix UI / Headless primitives | Unstyled, fully accessible (WAI-ARIA WCAG 2.2 compliant) primitives (Dialog, Dropdown, Tabs, Popover, Tooltip, Select) |
| **Icons** | Lucide React | Consistent 24px/16px stroke icon set matching SaaS reference aesthetic |
| **Animation Engine** | Motion (`motion/react`) | Hardware-accelerated transforms, interruptible springs, layout transitions |
| **Data Tables** | TanStack Table v8 | Virtualization-ready, multi-column sorting, faceted filtering, pagination |
| **Data Visualization** | Recharts & Custom SVG Matrix | Custom block/matrix sparklines, attendance heatmaps, grade distribution charts |
| **Forms & Validation** | React Hook Form + Zod | Schema-first type validation, minimal re-renders, accessible inline error states |
| **Database & Persistence** | PostgreSQL (compatible with Prisma & Supabase) | Multi-tenant relational schema, foreign key integrity, row-level isolation |
| **Testing** | Vitest + Playwright | Unit testing for business logic/rubrics + End-to-end user journey tests |

---

## 2. Multi-Tenant Architecture & Data Isolation

### 2.1 Institutional Isolation Strategy
Every academic record belongs strictly to an `institution_id` (Tenant). All queries and mutations are guarded by an institutional context extracted server-side:

```typescript
// Core tenant boundary definition
export interface TenantContext {
  institutionId: string;
  institutionCode: string;
  academicYear: number;
  currentPeriodId: string;
}

export interface TenantScopedEntity {
  id: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}
```

### 2.2 Security & Authorization Guardrails
1. **Server-Side Verification**: Route handlers and Server Actions never trust client-supplied `institutionId`. The active institution is verified against the authenticated user's session claims.
2. **Role-Based Access Control (RBAC)**:
   - `SUPERADMIN`: Cross-tenant system operations.
   - `ADMIN_INSTITUCIONAL`: Full tenant administrative scope.
   - `DOCENTE`: Read/write access strictly scoped to assigned sections and academic subjects.
   - `ESTUDIANTE`: Read-only access strictly scoped to student's own enrollments and records.
   - `ENCARGADO`: Read-only access scoped to verified legal dependents.

---

## 3. Directory & Codebase Organization

```
/
├── .agents/                      # Installed AI skills (Emil Kowalski design eng, etc.)
├── public/                       # Static brand assets, demo avatars, icons
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Login, tenant selection, password reset
│   │   ├── (dashboard)/          # Authenticated workspace layout
│   │   │   ├── page.tsx          # Institutional Executive Dashboard
│   │   │   ├── estudiantes/      # Student Directory & 360° Profile
│   │   │   ├── docentes/         # Faculty Directory & Workload
│   │   │   ├── estructura/       # Academic levels, grades, sections, subjects
│   │   │   ├── matricula/        # Academic period enrollment & status
│   │   │   ├── asistencia/       # Daily roll-call matrix & monthly heatmaps
│   │   │   ├── calificaciones/   # Grade book, rubrics & evaluation instruments
│   │   │   ├── horarios/         # Interactive institutional schedules & calendar
│   │   │   ├── comunicaciones/   # Tri-column Omni-Inbox messaging suite
│   │   │   ├── reportes/         # Analytics, dropout risk & PDF/CSV export
│   │   │   └── configuracion/    # Tenant settings, audit log, RBAC permissions
│   │   └── api/                  # REST endpoints & serverless handlers
│   ├── components/
│   │   ├── ui/                   # Design system primitives (Button, Card, Badge, Input, Table, etc.)
│   │   ├── layout/               # AppShell, Sidebar, Topbar, UserDock, CommandPalette
│   │   ├── modules/              # Domain-specific components (AttendanceGrid, GradeBook, InboxView)
│   │   └── visual/               # DiscreteSparkline, MatrixHistogram, ActionScale
│   ├── lib/
│   │   ├── db/                   # Database client & schema definitions
│   │   ├── mock/                 # Costa Rican realistic demo dataset (568 students, 30 teachers)
│   │   ├── auth/                 # Session management & RBAC guards
│   │   └── utils.ts              # Class merging (cn), formatters, currency, dates
│   └── types/                    # Domain TypeScript contracts
├── PROJECT_CONTEXT.md
├── DESIGN.md
├── ARCHITECTURE.md
├── DATABASE.md
├── ROADMAP.md
└── PROGRESS.md
```

---

## 4. State Management & Data Flow
- **Server State**: RSC and Server Actions for data fetching and mutations, with optimistic updates on key actions (e.g. attendance toggle, quick message send).
- **Client UI State**: Lightweight URL state (`nuqs` or `useSearchParams`) for search query strings, active tab, active filters, and selected student/thread IDs so every view is 100% shareable and deep-linkable.
- **Micro-Interactions**: Local React state for uncommitted forms, keyboard navigation, and dialog visibility.

---

## 5. Performance & Accessibility (WCAG 2.2 AA)
1. **Frame Budget Compliance**:
   - Only composite properties (`transform`, `opacity`) are animated.
   - All animations run under 250ms with custom easing `cubic-bezier(0.23, 1, 0.32, 1)`.
   - Motion is strictly disabled on keyboard shortcut actions (`Ctrl + K`).
2. **Accessibility**:
   - Full keyboard navigation across data tables, menus, dialogs, and drawers.
   - Visible high-contrast focus rings (`ring-2 ring-zinc-900 ring-offset-2`).
   - Contrast ratio strictly exceeds 4.5:1 for normal text and 3:1 for large graphical elements.
   - Accessible ARIA labels on all icon-only buttons.

