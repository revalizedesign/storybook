import { AppShell } from '@/components/AppShell'
import presets from './app-shell-presets.json'

export default {
  title: 'Products/Intelliquip',
  parameters: { layout: 'fullscreen' },
}

export const AppShellStory = {
  name: 'App shell',
  render: () => <AppShell preset={presets.flowiq} />,
}
