import { SlotMachine } from './SlotMachine'
import { SlotShell } from '@/components/SlotShell'
import APP from './specpage-app.json'
import ADMIN from './specpage-admin.json'

// SpecPage on the canonical Shell, driven by SlotMachine data — migrated off the legacy AppShell.
// Two surfaces share the (light) shell: the App shell home and Admin (System Settings), recreated
// from the ref screenshots. The rail is light, so no brand tokens; the body is the editable JSON.
export default {
  title: 'Products/SpecPage',
  parameters: { layout: 'fullscreen' },
}

export const AppShellStory = { name: 'App shell', render: () => <SlotMachine frame={SlotShell} slots={APP} /> }
export const Admin = { render: () => <SlotMachine frame={SlotShell} slots={ADMIN} /> }
