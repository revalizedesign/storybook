import { AppShell } from './AppShell'
import presets from './app-shell-presets.json'

export default {
  title: 'Design patterns/Navigation/Two-level sidebar',
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: '**Already built** · Critical priority. Icon rail + context panel — the universal Revalize shell. Same structure, different colors per product via theme class. Demoed here via the existing AppShell.' } },
  },
}

export const Default = { render: () => <AppShell preset={presets.configureone} /> }
export const Branded = { render: () => <AppShell preset={presets.configureone} mode="branded" /> }
