import { SlotMachine } from './SlotMachine'
import { Shell } from '@/components/Shell'
import APP from './configureone-app.json'
import ADMIN from './configureone-admin.json'
import AIADMIN from './configureone-aiadmin.json'

// ConfigureOne, migrated off the legacy AppShell — every variant is SlotMachine data on the DS Shell.
// App shell + Admin use the branded (blue) shell. AI admin is the c1c-admin (ConfigureOne Cloud Admin)
// prototype on the SAME shell, neutral (not blue) with a narrow nav: full-width header + main-nav
// collapse, the Admin main nav, Workspaces as the `nav-pane`, the Admin Agent `chat-panel`, and the tab
// layers — composed from the Originals components. Scope is the shell + nav + tab layers only.
const brand =
  '[--sidebar:#0856cf] [--sidebar-accent-foreground:#ffffff] [--sidebar-accent:#ffffff1f] [--sidebar-border:#ffffff2e] [--sidebar-foreground:#ffffffd9]'
const ConfigureOneShell = ({ slot }) => <Shell slot={slot} sidebar={{ className: brand }} />
const C1AdminShell = ({ slot }) => <Shell slot={slot} sidebar={{ defaultOpen: false, style: { '--sidebar-width': '10rem' } }} />

export default {
  title: 'Products/ConfigureOne',
  parameters: { layout: 'fullscreen' },
}

export const AppShellStory = { name: 'App shell', render: () => <SlotMachine frame={ConfigureOneShell} slots={APP} editable /> }
export const Admin = { render: () => <SlotMachine frame={ConfigureOneShell} slots={ADMIN} editable /> }
export const AiAdmin = { name: 'AI admin', render: () => <SlotMachine frame={C1AdminShell} slots={AIADMIN} editable /> }
