import { SlotMachine } from './SlotMachine'
import { SlotShell } from '@/components/SlotShell'
import SLOTS from './products-attainia.json'

// Attainia (Plan It) — top nav + inverted blue rail with a Projects favorites sub-list, on the
// canonical Shell. The blue rail is just Shell with Attainia's brand applied through the Sidebar's
// own CSS tokens (so the nav data carries zero styling) — product config, not a design-system frame,
// which is why it lives here in the story rather than in components.
const brand =
  '[--sidebar:#1d4ed8] [--sidebar-foreground:#ffffffd9] [--sidebar-primary:#ffffff] [--sidebar-primary-foreground:#1d4ed8] [--sidebar-accent:#ffffff1f] [--sidebar-accent-foreground:#ffffff] [--sidebar-border:#ffffff2e] [--sidebar-ring:#ffffff3d]'
const AttainiaShell = ({ slot }) => <SlotShell slot={slot} sidebar={{ className: brand }} />

export default {
  title: 'Products/Attainia',
  parameters: { layout: 'fullscreen' },
}

export const AppShellStory = { name: 'App shell', render: () => <SlotMachine frame={AttainiaShell} slots={SLOTS} /> }
