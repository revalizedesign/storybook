# Agents

- Files in `src/components/ui/` are shadcn-managed primitives installed via `npx shadcn@latest add`. Do not modify them — changes will be overwritten on update.
- To extend shadcn behavior, create new components in `src/components/` that compose the primitives. Do not fork or patch them.
- Use Context7 MCP to fetch current shadcn documentation before implementing any shadcn component pattern.
- Copy from ui.shadcn.com verbatim first, verify it works, then make one focused change at a time.
- All shadcn primitive stories use Lucide icons. The Revalize theme swaps with Font Awesome equivalents.
- Icon data is always a string, resolved at render via `Icon` (Lucide) or `Fa` (Font Awesome). Never pre-resolve a string into a raw component reference (e.g. `icons[name]`) and store that in a data structure — it can't serialize to JSON and it's the one form that actually can't be data-driven.
- Do not add inline styles (`style={{ }}`). Use classes or plain strings.
- Do not override component sizing — let components render at their native size.
- Two font weights only: `font-normal` (default) and `font-semibold` (emphasis). Never `font-medium` or any other weight.
- Data belongs in JSON files, not hardcoded in JSX.
- Sort object keys and CSS properties alphabetically.
- There is one AppShell. Do not create alternative shells, frames, or layout wrappers. Extend AppShell when needed.
- Do not define reusable components inside story files. Components belong in `src/components/`. Exception: a component that must call a hook requiring a specific ancestor (context, provider) may be defined locally in the story file if it isn't reusable elsewhere — match existing local helpers like `TeamSwitcher`/`NavUser` in `products-configureone.stories.jsx`.
- Document component behavior, rationale, and conventions (like "why this prop exists") in the Storybook story's `parameters.docs.description.component`, not as code comments in the component file. This is a Storybook-first design system — comments belong only on genuinely non-obvious implementation details, not on anything a reader would look up in Storybook.

# Design

(To be defined in Stage 3 — see Roadmap)

# Known gaps

- PageHeader/Breadcrumb: adopted Matt's Breadcrumbs.jsx as the standard. Known limitation: no per-crumb icon override or force-visible option (previously prototyped in feature/pageheader-hybrid-proposal, now abandoned in favor of Matt's simpler design). Revisit if a product needs it.
