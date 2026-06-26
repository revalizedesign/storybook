# Agents

- Files in `src/components/ui/` are shadcn-managed primitives installed via `npx shadcn@latest add`. Do not modify them — changes will be overwritten on update.
- To extend shadcn behavior, create new components in `src/components/` that compose the primitives. Do not fork or patch them.
- Use Context7 MCP to fetch current shadcn documentation before implementing any shadcn component pattern.
- Copy shadcn reference code verbatim first, verify it works, then make one focused change at a time.
- All shadcn primitive stories use Lucide icons. The Revalize theme swaps with Font Awesome equivalents.
- Do not add inline styles (`style={{ }}`). Use classes or plain strings.
- Do not override component sizing — let components render at their native size.
- Data belongs in JSON files, not hardcoded in JSX.
- Sort object keys and CSS properties alphabetically.
- There is one AppShell. Do not create alternative shells, frames, or layout wrappers. Extend AppShell when needed.

# Design

(To be defined in Stage 3 — see Roadmap)
