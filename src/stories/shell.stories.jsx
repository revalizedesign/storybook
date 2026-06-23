import { SlotMachine } from './SlotMachine'
import { Shell } from '@/components/Shell'
import SLOTS from './shell.json'

// Minimal demo of Shell's ONE distinguishing capability: a collapsible shadcn sidebar composed
// UNDER a full-width header — the thing shadcn's fixed Sidebar can't do. Just the trigger and a
// single placeholder nav item; collapse with ⌘B or the trigger. Real product content lives in
// Layout/Examples, the full slot vocabulary in the Shell doc.

export default {
  title: 'Layout/Shell',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `The canonical app shell — a full-width header above a row of (collapsible nav | content) — composed from the **Band** primitive (\`components/Band.jsx\`), a generic recursive alternating-axis layout.

**Shell** is where shadcn's Sidebar composition limitation is corrected: shadcn's \`Sidebar\` is a full-height, fixed-position shell that can't compose under a header. Shell stays in-flow, reusing the Sidebar primitive's collapse, tokens, and ⌘B via an in-flow rail.

- **\`first\`/\`middle\`/\`last\`** are Band's generic props; **slots are concrete** — \`header-left/right\`, \`main-nav-top/items/sub/bottom\`, \`toolbar-left/right\`, \`pane-left/right\`, \`footer-left/right\`, \`body\`.
- **Collapse** the rail with ⌘B or the trigger.
- The **body** is the editable JSON — edit it and the shell re-hydrates.

#### Names considered

\`Layout\` (too generic), \`Compose\` (too generic), \`Position\` (too generic; collides with the CSS property), \`Masonry\` (implies a packing algorithm), \`Outer\` (vague), \`ZigZag\` / \`ZigZigZagZag\` (describe the alternating model but read as jargon) — landed on **Band** (the primitive) + **Shell** (this composition).`,
      },
    },
  },
}

export const Default = { render: () => <SlotMachine frame={Shell} slots={SLOTS} /> }
