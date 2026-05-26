import { AppShell } from './AppShell'
import presets from './app-shell-presets.json'

export default {
  title: 'Patterns/App shell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    preset: { control: 'select', options: Object.keys(presets), mapping: presets },
  },
  args: { preset: presets.configureone },
}

export const Wireframe = {}
export const Branded = { args: { mode: 'branded' } }
