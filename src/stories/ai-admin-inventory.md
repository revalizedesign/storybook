# AI Admin screens inventory — July 8–9, 2026

Compiled from 56 screenshots in `~/Desktop/Revalize` (33 from July 8, 23 from July 9). Two subjects: the **Intelligence for Configure One** prototype (Claude-built HTML artifacts "Aaa truck model workspace" and "Intelligence home", demoed in the "AI Admin Agent - Design DCI" Teams call), and **Workato** ("Revalize Admin" workspace) as integration reference. July 8 shots are Teams screen-share captures; July 9 shots are direct artifact captures.

**Recreation status:** ✅ = recreated in the [AI admin (July)](?path=/story/products-configure-one--ai-admin-july) story from `configureone-aiadmin-july.json`. Part 2 (Workato) is reference material — out of scope for recreation. Known simplifications: tab-bar attention dots omitted, graph views render node columns without edge lines, Verify/Commit are minimal (never opened in the screenshots), Home is an invented entry point, and Settings/Users/Roles/Entitlements are nav-only placeholders.

## Part 1 — Intelligence for Configure One (prototype)

### ✅ App shell

- **Sidebar nav** — brand "Intelligence for Configure One" with collapse chevron; Home, Products, Knowledge, Catalog; collapsible MANAGE group: Agent, Settings, Users, Roles, Entitlements; user chip footer (avatar, name, email, expander)

### ✅ Set up Knowledge wizard

- **Stepper header** — sparkle icon + title, 4 steps (Source → Extract → Review → Done) with active/completed states, close
- **Step 1 Source** — segmented tabs From a link / Upload files / Describe it; link tab: URL input, Analyze source button, extraction-scope chips (Company, Industry, Catalog); describe tab: Company name, What you make textarea, Industry (optional), disabled Continue
- **Step 2 Extract** — progress checklist (Reading your source ✓, Identifying company and industry ✓, Cataloging products and parts ⏳), progress bar
- **Step 3 Review** — area tabs Company / Industry / Catalog with status dots, "5 answers from 1 source" summary, Context / Sources sub-tabs, editable fields (Name, What the business does, Products and services, Voice and positioning, Key differentiators), vocabulary chip list, Back, Confirm and train agent
- **Step 4 Done** — green check hero, three capability cards, Build your first product button

### ✅ Knowledge

- **Context Layers tree** — hierarchy Company → Industry → Catalog → categories → products, per-node type label + status dot, legend Trained / Review / Empty
- **Layer detail header** — eyebrow type label, title, description, Needs review badge, tabs Sources (n) / Review (n)
- **Review queue** — "n blocks waiting for your call" banner, "only accepted blocks load into the context window" guidance, Accept all
- **Proposed block card** — Proposed badge, confidence + token count + source attribution, block text, Accept / Edit / Discard, token-meter bars
- **Reviewed blocks** — In context badge, confidence + tokens + source, Edit / Remove

### ✅ Catalog

- **Page header** — title, subtitle "Published, live products — configurable and quotable in Configure One"
- **Published products list** — rows with icon, name, category, "Published \<date\>", green Published badge, row chevron

### ✅ Agent (CONCEPT)

- **Review Cadence** — radio cards: Pause after every layer (recommended), Pause at key gates, Run straight through
- **Autonomy per capability** — Auto / Needs sign-off toggles: accept high-confidence context blocks, apply low-risk fixes, activate/deactivate logic; locked rows: publish to Catalog (always sign-off), bulk-delete spec columns (off by design)
- **Guardrails** — confidence threshold to auto-accept blocks (Low/Med/High), type-ahead option threshold field, locked toggles (always attach provenance, never delete flagged junk)
- **Model & Explainability** — builder model dropdown, Show reasoning toggle, Flag inferred values toggle
- **Footer** — per-build scope note with per-product override, Reset, Save changes

### ✅ New product build flow (chat-first)

- **Product header** — back chevron, product icon, name + category, status badge (Setup → Building… → paused for review)
- **AI Model Builder chat rail** — agent intro, uploaded-file chips as messages, staged-file chips with remove, per-file Build model → buttons, workflow progress checklist (reading files, detecting groups, building inputs, classifying specs), "Worked for ns · \<stage\>" activity lines, build summary messages with finding bullets, Staged change card with undo link, Continue to \<next tab\> → buttons, composer + send
- **Model canvas** — empty state ("upload files to begin") → building state (spinner)

### ✅ AI Model Builder workspace

- **Workspace header** — product avatar + title, "Built by agent · n source files · staged, not committed", Draft build badge, Open preview
- **Review banner** — % reviewed progress bar, chip counters (contradictions, agent decisions, inferred items, test configs ready), Continue review
- **Tab bar** — BUILD group (Overview, Files) | REVIEW group (Model, Rules, Results, Preview, Verify, Commit), attention-dot badges

#### ✅ Overview tab

- **Layout switcher** — sub-tabs Layout 1 / Layout 2 / Graph
- **"What the agent built" stat grid** — provenance cards with progress bars + status chips: Input groups, Inputs, Options, Specs, Procedural rules, Relational rules, Query rules, Formulas, Loops, BOM lines
- **Findings list** — severity-dotted rows, each with explanation, Ask agent to fix, and a deep-link to the proving view (Open loop layer, Open iterator, Open grid, Open query, View rule, Review decision, Compare specs, Open BOM line…)
- **What to review next** — risk-ordered checklist (resolve contradictions → judge decisions → verify inferred → run test configs → walk buyer experience)
- **Graph** — dependency/lineage view grouped by input group, Needs attention / Everything toggle, edge legend (Derives / Constrains / Structure), node cards with control type + constraint count + AI/INF/warning/error badges, dimmed inactive + dashed edges

#### ✅ Model tab

- **Sub-tabs** — Tree, Specs (n), Graph, Raw JSON
- **Tree toolbar** — summary line, search, filter pills (All, Needs review, Gaps, Decisions, Inferred), All types dropdown (Select, Radio, Checkbox, Text, Slider/spinner, Display/product, Hidden), Expand/Collapse all, groups-only toggle
- **Grouped input tree** — page dividers; group rows with input count + source ref; input rows with name, variable code, control type, provenance/behavior chips (Agent decision, Inferred, Driven by, Drives, Carries n specs, Duplicate warning, Loop counter, Hidden, Range enforced)
- **Input detail** — options value/label table with source ref; amber provenance callout for inferred items (rationale + Verified—keep / Remove actions)
- **Specs catalog** — usage-first table (Spec, Type, Carried by, Read by, status), status chips (In use, Conflicting duplicates, Broken ref, Orphan, Junk)

#### ✅ Rules tab

- **Sub-tabs** — Procedural (n + groups), Relational, Query, Formulas, Loops
- **Procedural** — logic-spine list with page dividers, typed rows (Ask input group, Warning, Run logic group, Set) with condition pseudocode + Inactive chips; trace toolbar (test-case dropdown, search, filter chips All/Conditional/Inactive/Warnings/Set/Run group/Ask), fired/dimmed trace dots, batch-review banner for inactive items
- **Relational** — driver × driven matrix with per-value defaults, Normalized-from-IF-chain + coverage-miss chips, agent decision card (rationale, Approve / Rebuild as procedural / View source), live end-user control panel demoing the same rule, coverage check footer with Ask agent to fix
- **Query** — plain-language query summary, paused-condition chip, source links, numbered conditions with Active/Paused chips, test inputs panel, PASS panel (matching rows + "flattest" sort tag), FAIL panel with per-row reasons
- **Formulas** — dependency strip (inputs → formula → BOM), collapsible formula cards (result, expression rows with named-constant annotations, test inputs, impact note), semantic-finding warning with Ask agent to rename
- **Loops** — iterator card (loop variable, source link, step list with Inactive chips), finding callouts (mostly-inactive body, disabled collision checks) with Ask agent to review

#### ✅ Results tab

- **BOM blueprint** — mapped-lines chip, filtered-view note, binding explainer (include-when / which-part / qty-driven-by), read-only-in-beta note (ask-agent-to-fix is the only write path), table (Line, Type, Part, Include when, Which part, Qty driven by) with anomaly/double-count tags

#### ✅ Preview tab

- **What just fired** — live rule-activity rows with status dots + deep-links (warnings, set-value, query pass counts, coverage misses, disabled checks, boundary gaps, paused conditions)
- **Reviewer overlay note** — "buyers never see this panel", seeded defects reproducible

#### ✅ Verify / Commit tabs

- Present in tab bar with attention dots; staged changes reviewed on Commit (referenced from chat) — no dedicated screenshots

## Part 2 — Workato "Revalize Admin" (integration reference)

### Workato home

- **Ask AIRO hero** — prompt textarea, attach, submit, suggestion chips
- **Left icon rail** — AIRO, add, home, projects, community, library, dashboard, tools, admin, docs
- **Pick up where you left off** — recipe cards (title + last-updated): C1C Add to Quote → AQ Line Item, C1C Update Quote → Replace AQ Line Item, C1C Create Quote → New AQ Quote, Validate C1C Configuration Payload, AQ Order Request → C1 Order Transmission
- **Start your next project** — Blueprint / Recipe / API cards

### AIRO chat (fullscreen)

- **All chats sidebar** — New chat, Today/Yesterday history groups, collapse toggle
- **Transcript** — user bubbles with timestamp + location link, "Thought for n" expandable reasoning, markdown answers, feedback icons, Beta badge + disclaimer
- **Composer** — input, attach, submit

### Blueprint Builder

- **Header** — blueprint title, BLUEPRINT BUILDER badge, zoom, Exit
- **Canvas** — workflow-recipe nodes with CALLS connectors to shared function node, node selection, floating Ask AIRO button
- **AIRO side panel** — chat thread with staged prompts: process-flow list → project/location picker → connection picker (Use these connections / Skip) → "Your Blueprint is ready!" asset map table (# / Type / Title) → build-all confirmation → built-assets summary with green checks + Open deep-links per asset

### Recipe Editor

- **Invitation banner** — workspace invite, View invite, dismiss
- **Header** — breadcrumb (Projects > project > recipe), rename pencil, Edit, Start recipe split button, overflow menu
- **Tabs** — Recipe, Jobs, Versions, Test cases, Settings
- **Logic canvas** — zoom; numbered steps: Trigger (Real-time badge), actions (Batch badge), IF branches with Yes/No, list operations, RETURN result
- **AIRO docked panel** — same thread continued from Blueprint Builder

## Not product UI

- ChatGPT desktop window (empty, "Ask anything") — July 9 11.46
- Teams meeting chrome only (call "AI Admin Agent - Design DCI", 49:14, recording) — July 9 11.48; all July 8 shots carry this chrome as wrapper
