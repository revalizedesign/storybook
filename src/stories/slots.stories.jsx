import { SlotMachine } from './SlotMachine'
import SLOTS from './slots.json'

// The slot vocabulary — one item per named target, each printing its own id in place. Same item
// convention as every Layout story (`{ slot, … }`); here the content is just the slot name.

export default {
  title: 'Layout/Slots',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The slot vocabulary — every named target in the layout, each printing its own id in place. Same item convention as every Layout story; the body holds the items as JSON. Examples fills these same slots with real content. Naming each region as a slot makes the UI composable — screens are assembled from flat data instead of bespoke markup, which keeps the component code far less noisy.',
      },
    },
  },
}

export const Default = { render: () => <SlotMachine slots={SLOTS} /> }
