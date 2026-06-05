# Code review — `Design patterns/` stories

Notes on the first light pass of the 33 pattern stories (`src/stories/pattern-*.stories.jsx`),
to revisit before these are treated as anything more than placeholders for design review.

## Context

These were generated as a fast, primitive-first pass off the spec in
`ref/Design Patterns Review Page/` (a Figma Make export). The ref's `example` fields are
inline-styled HTML mockups with hardcoded hex, fixed pixel sizes, and hand-built chrome
(fake toggles, pills, spinners). The stories rebuild each pattern with real base-vega
components instead — but in places they still inherited the mockup's ad-hoc aesthetic.

## Issues to clean up

### 1. Hardcoded semantic colors (blocked on a design-system decision)
The theme (`src/index.css`) exposes only: `primary, secondary, muted, accent, destructive`
(+ card/popover/sidebar/border/input/ring). **There is no `success` or `warning` token.**
Both the ref and these stories worked around that with hardcoded Tailwind color utilities:

- `pattern-autosave` — `border-emerald-200 bg-emerald-50 text-emerald-700`
- `pattern-inline-validation` — `text-emerald-600` ("valid" affirmation)
- `pattern-error-state` — `border-amber-300 text-amber-800 [&>svg]:text-amber-600` (warning alert)
- `pattern-progress-completeness` — `text-emerald-600` (checkmarks)
- `pattern-ai-sidebar` — `text-violet-600 bg-violet-50 text-violet-900` (AI accent)

**Decision needed (design counterpart):** either
(a) add `--success` / `--warning` (+ foreground) tokens to the theme and use them, or
(b) go token-pure — errors → `destructive`, everything else → `muted`/`foreground`, accepting
the loss of the green "valid/saved" and amber "warning" affordances.
Until decided, treat the emerald/amber/violet utilities as placeholders.

### 2. Arbitrary fixed widths copied from the mockup layout
`w-[36rem]`, `w-[40rem]`, `w-[28rem]`, `w-[34rem]`, `w-[26rem]`, etc. appear across many stories
(data-table, pagination, column-filter-sort, bulk-actions, error-state, settings, …).
These echo the demo's fixed-pixel canvas rather than the component's natural sizing.
Replace with natural sizing or a sensible `max-w-*`; let tables/cards be responsive.

### 3. Status-badge palette mapping is a guess
`pattern-status-badge` maps Active/Pending/Inactive/Draft/Archived onto base-vega Badge variants
(`secondary`/`outline`/`destructive`/`default`/`ghost`). The ref specifies specific semantic
hues (green/amber/red/blue/grey). Confirm the intended mapping — depends on issue #1.

### 4. Demo content carried over verbatim
Names (Hydro-Pro Series, HPR-001), people (Jonathan Pacheco, Kiana Williams), and meeting
references (05/27) come straight from the ref. Fine for review fidelity; revisit if these
become real examples.

### 5. Bits still echoing demo chrome rather than primitives
- `pattern-wizard` — stepper is a hand-built div/Separator/Badge composition (no shadcn
  stepper primitive exists). Candidate to extract into a real reusable component.
- `pattern-autosave` — uses `Spinner` (good) but the green status row is hand-styled (see #1).
- Inline `<a href="#">` links instead of a shared link treatment in several stories.

## Structural notes
- All 33 live under the `Design patterns/<Section>/<Name>` title root, intentionally separate
  from the exploratory `Patterns/*` stories (App shell, AI search, etc.).
- `pattern-two-level-sidebar` reuses the existing `AppShell` rather than re-implementing.
- Interactive patterns (Toast, Undo, Confirmation dialog, Detail drawer) render closed and
  open on click — by design, but worth noting they don't show their content at rest.

## Not yet verified
- No live build: `node_modules` is not installed in this checkout, so these have **not** been
  rendered in Storybook. Exports/APIs were checked against existing stories, but
  `npm i && npm run storybook` is needed to confirm they all mount.
