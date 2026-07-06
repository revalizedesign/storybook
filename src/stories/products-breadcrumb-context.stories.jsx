import { SlotMachine } from './SlotMachine'
import { SlotShell } from '@/components/SlotShell'
import configureOne from './products-configureone-breadcrumb.json'
import autoQuotes from './products-autoquotes-breadcrumb.json'
import specPage from './products-specpage-breadcrumb.json'
import attainia from './products-attainia-breadcrumb.json'
import flowiq from './products-flowiq-breadcrumb.json'

// Breadcrumb, in context — the real navigation path for each product, rendered through the Page
// Header inside the Shell (SlotShell/SlotMachine), so this is what the breadcrumb looks like in the
// real product rather than an isolated primitive. Real data lives here, in these JSON files — the
// primitive variants stay lean. Attainia's home icon and FlowIQ's ellipsis truncation use Page
// Header's { icon } / { ellipsis: true } crumb support (an additive extension — plain string crumbs,
// used by Configure One/AutoQuotes/SpecPage below, render exactly as before).
const brand =
  '[--sidebar:#1d4ed8] [--sidebar-foreground:#ffffffd9] [--sidebar-primary:#ffffff] [--sidebar-primary-foreground:#1d4ed8] [--sidebar-accent:#ffffff1f] [--sidebar-accent-foreground:#ffffff] [--sidebar-border:#ffffff2e] [--sidebar-ring:#ffffff3d]'
const AttainiaShell = ({ slot }) => <SlotShell slot={slot} sidebar={{ className: brand }} />

export default {
  title: 'Revalize/Breadcrumb in context',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Each story below is a real product navigation path, rendered through the Page Header inside the Shell. Configure One, AutoQuotes, and SpecPage use plain string crumbs (unchanged behavior); Attainia and FlowIQ use the { icon } / { ellipsis: true } crumb extension.',
      },
    },
  },
}

export const ConfigureOne = { render: () => <SlotMachine frame={SlotShell} slots={configureOne} /> }
export const AutoQuotes = { render: () => <SlotMachine frame={SlotShell} slots={autoQuotes} /> }
export const SpecPage = { render: () => <SlotMachine frame={SlotShell} slots={specPage} /> }
export const Attainia = { render: () => <SlotMachine frame={AttainiaShell} slots={attainia} /> }
export const FlowIQ = { render: () => <SlotMachine frame={SlotShell} slots={flowiq} /> }
