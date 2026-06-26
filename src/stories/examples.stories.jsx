import { SlotMachine } from './SlotMachine'
import { SlotShell } from '@/components/SlotShell'
import SLOTS from './examples.json'

// CPQ UI 26 on the slot machine — the canonical Shell (Band-based, in-flow collapsible rail; see
// components/Band.jsx), driven entirely by DATA. An item is { slot, component?, tag?, nest?,
// ...props }: `component`/`tag` names the element by its real name, the rest pass straight through as
// its props (incl. `children`); `nest` renders another slot as the element's children. Only the
// button components read `name` (a Fa icon) and `span` (its text). Slots: header-left/left-nav/
// right-nav/right, main-nav-top/items/bottom, toolbar-left/right, footer-left/right, body. Collapse
// the rail with ⌘B or the trigger; the body is the editable JSON.

export default {
  title: 'Layout/Examples',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `**CPQ UI 26** — cpqui's App Shell on the canonical **Shell** (Band-based, in-flow collapsible rail), driven entirely by data. Collapse the rail with ⌘B or the trigger; the body is the editable JSON.`,
      },
    },
  },
}

export const Cpq = { name: 'CPQ UI 26', render: () => <SlotMachine frame={SlotShell} slots={SLOTS} /> }
