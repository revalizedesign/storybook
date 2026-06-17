import { SlotMachine } from './SlotMachine'
import SLOTS from './layout.json'

// Anatomy of the standard app layout — one labeled item per region. Same SlotMachine as every Layout
// story; differs only in data + flags. Wireframe is identical data with hairline borders.

export default {
  title: 'Layout/App',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The common app layout: announce bar, header, collapsible left nav + secondary nav, and a main area (content header bar, page header, tab row, body, footer toolbar) — with right + bottom drawer triggers, an example toast (top-right), and a corner action. Default fills the regions; Wireframe is the same data with hairline borders only. Built on the shared SlotMachine/LayoutFrame — every Layout story is the same machine, differing only in data + flags.',
      },
    },
  },
}

export const Default = { render: () => <SlotMachine slots={SLOTS} /> }
export const Wireframe = { render: () => <SlotMachine slots={SLOTS} wireframe /> }
