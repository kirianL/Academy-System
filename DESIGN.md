# NEXUS — Visual Design System & Specification
*Derived from Visual Synthesis of Reference Set & Emil Kowalski Design Engineering Foundations*

---

## 1. Synthesis & Anatomy of Reference Imagery

After analyzing the full set of reference interfaces:
- **Reference 1 (Integrations / Settings)**: Warm stone background with pure white inset cards, clean pill badges (`INSTALLED`), high contrast pill buttons (`Install App` dark charcoal, `Uninstall` soft outlined red), and segmented category navigation.
- **Reference 2 (Engineering Workstream / Pipeline)**: Window container with 24px-28px radius, omnibar-style multi-token search pills (`Work Impact contains 2 levels [x]`), stage badges (`Code Review`, `Active Development`), discrete vertical bar progress sparklines (`12/32 +3`), metadata grids on task cards (`Origin`, `Priority`, `Date`), and user anchor dock.
- **Reference 3 (KPI Dashboard / Overview)**: Discrete matrix-histogram sales chart with micro-block bars and interactive hover tooltip (`Jun 2025: New User 38k, Existing User 18k`), KPI cards with vertical mini-bars, segmented pill period switcher (`Weekly`, `Monthly`, `Yearly`), and pure white active navigation item floating over an off-white sidebar.
- **Reference 4 (Unified Inbox / Messaging)**: 3-column / 4-column master-detail email experience with an ultra-compact icon rail (leftmost), folder list with active count badges, rich thread list with user avatars and verified badges, and expansive reading pane with top utility bar (`Archive`, `Delete`, `Move`) and attachment cards.
- **Reference 5 (Inspector & Metric Scales)**: High-contrast metric score display (`Readability 85`), multi-segment continuous visual scale (`Action Scale` with pastel capsules indicating states: `Static`, `Active`, `Overload`), and stacked feedback cards with colored semantic indicator dots.

---

## 2. Core Visual Foundations

### 2.1 The Canvas & Surface Hierarchy
Rather than using sterile `#FFFFFF` everywhere or generic blue-gray `#F8FAFC`, NEXUS adopts an ultra-refined **warm stone & linen** palette:
- **Canvas / App Shell**: Warm neutral tone `#F6F6F4` (HSL: `40, 8%, 96.5%`). Gives tactile warmth, making white surfaces visibly lift off the background.
- **Master Surface / Nested Containers**: Crisp pure `#FFFFFF` with ultra-fine borders.
- **Secondary Surfaces (Recessed / Muted)**: `#F0EFEB` (HSL: `40, 10%, 94%`) for sidebars, table headers, and pill track backgrounds.
- **Subtle Layering Over Drop Shadows**: Tactile depth is created by 1px borders with fine alpha values (`rgba(24, 24, 27, 0.07)` or `#E6E5E0`) rather than heavy blurred drop shadows.

### 2.2 Color Palette & Semantic Tints
| Token | Hex / HSL | Usage |
|---|---|---|
| `--color-canvas` | `#F6F6F4` | App frame, window background |
| `--color-surface` | `#FFFFFF` | Cards, modals, active items, tables |
| `--color-surface-subtle`| `#F0EFEB` | Sidebar rails, pill tabs, recessed panels |
| `--color-border-subtle` | `#E8E7E2` | Container borders, subtle dividers |
| `--color-border-strong` | `#D4D3CB` | Form inputs, active control borders |
| `--color-ink-primary` | `#18181B` | High-contrast headings, main metric figures |
| `--color-ink-secondary` | `#52525B` | Subheaders, table rows, labels |
| `--color-ink-tertiary` | `#71717A` | Captions, timestamps, disabled elements |
| `--color-ink-faint` | `#A1A1AA` | Placeholder text, icon neutral outlines |
| `--color-accent-dark` | `#1C1917` | Primary CTA buttons, active state fill |
| `--color-emerald` | `#059669` / `#ECFDF5` | Success, Presente, Approved, Positive Growth |
| `--color-amber` | `#D97706` / `#FEF3C7` | Pending, Ausente Justificado, Warning |
| `--color-rose` | `#E11D48` / `#FFF1F2` | Ausente Injustificado, Failed, Danger CTA |
| `--color-indigo` | `#2563EB` / `#EFF6FF` | Tareas, Academic Badges, Active Workstreams |
| `--color-violet` | `#7C3AED` / `#F5F3FF` | Evaluations, AI Suggestions, Honors |

---

## 3. Typography & Hierarchy
NEXUS uses **Inter** with tailored optical tracking and tabular numerical figures:
- `font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11', 'tnum'`.
- All metrics, currency, percentages, and counters strictly use `tabular-nums` so numbers don't jitter during updates.

| Level | Size | Weight | Line Height | Tracking | Application |
|---|---|---|---|---|---|
| **Display KPI** | 30px / 1.875rem | Bold 700 | 1.1 | -0.03em | Primary dashboard metrics (`568`, `94.2%`) |
| **Page Title** | 22px / 1.375rem | Semibold 600 | 1.25 | -0.02em | Section headers (`Expediente Estudiantil`) |
| **Card Title** | 15px / 0.9375rem | Medium 500 / 600 | 1.35 | -0.01em | Modal headers, card titles |
| **Body Primary** | 14px / 0.875rem | Regular 400 | 1.45 | 0 | Standard table text, form values, prose |
| **Body Secondary**| 13px / 0.8125rem | Regular 400 | 1.4 | 0 | Descriptions, metadata chips, timestamps |
| **Micro Caption** | 11px / 0.6875rem | Medium 500 / 600 | 1.3 | +0.02em | KPI category labels (`TOTAL ESTUDIANTES`) |

---

## 4. Radii, Borders & Elevation
- **Outer Application Frame**: `24px` (`rounded-3xl`) with outer canvas margin for desktop viewport framing.
- **Master Cards & Panels**: `16px` (`rounded-2xl`).
- **Inner Sub-Cards & Modals**: `12px` to `14px` (`rounded-xl`).
- **Interactive Controls (Inputs, Buttons, Tabs)**: `8px` to `10px` (`rounded-lg`) or full pill `9999px` (`rounded-full`) for status chips and search omnibars.
- **Shadow Scale**:
  - `shadow-xs`: `0 1px 2px rgba(0, 0, 0, 0.04)`
  - `shadow-card`: `0 1px 3px rgba(0, 0, 0, 0.03), 0 6px 16px -4px rgba(0, 0, 0, 0.025)`
  - `shadow-popover`: `0 10px 30px -4px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)`

---

## 5. Signature Component Patterns (Extracted from References)

### 5.1 Discrete Vertical Sparklines & Progress Matrix
Instead of smooth continuous line charts that obscure precise quantities, cards use:
- **Segmented Vertical Pill Bars**: A series of micro-pills (e.g. 16 vertical segments) indicating completion ratio (filled amber/emerald vs muted stone).
- **Matrix Histograms**: Pixel-grid bar charts with sharp borders and hover tooltips for high-density academic distributions (e.g. attendance streaks, grade distributions).

### 5.2 Multi-Token Omnibar Filter
- Compact search input with interactive chip tokens: `[Nivel: 10° Año ✕] [Sección: 10-A ✕] [Condición: Regular ✕]`.
- Trigger button with instant popover to add additional dimensions (`Profesor`, `Estado de Matrícula`, `Riesgo Académico`).

### 5.3 Tri-Column Master-Detail Inbox
- Leftmost 56px icon rail.
- 280px navigation & folder sidebar (`Recibidos`, `Enviados`, `Borradores`, `Comunicados Institucionales`).
- 340px scrollable thread list with sender avatars, verified indicators, and preview snippets.
- Responsive right detail view with full message body, attachments, and inline quick-reply.

### 5.4 Segmented Capsule Scales
- Horizontal multi-segment indicator (similar to Reference 5's Action Scale) indicating academic standing: `En Riesgo` (Rose) | `Alerta` (Amber) | `Regular` (Slate) | `Sobresaliente` (Emerald).

---

## 6. Interaction & Animation Rules (Emil Kowalski & Apple Design Principles)

1. **Button Feedback**:
   - `:active { transform: scale(0.97); }`
   - `transition: transform 120ms cubic-bezier(0.23, 1, 0.32, 1);`
2. **Never Animate from scale(0)**:
   - Modals and popovers enter from `scale(0.95)` and `opacity: 0` to `scale(1)` and `opacity: 1`.
3. **Trigger-Aware Popovers**:
   - Popovers scale from their trigger button location (`transform-origin: var(--radix-popover-content-transform-origin)`).
4. **Keyboard Shortcuts / Command Palette**:
   - Toggle instantly (0ms delay / no heavy transition) for Raycast-like instantaneous response.
5. **No `transition: all`**:
   - Always declare composite properties explicitly: `transition: transform 180ms ease-out, opacity 180ms ease-out`.
6. **Respect `prefers-reduced-motion`**:
   - Strictly fall back to simple opacity fades with no translation on user-requested reduced motion.

