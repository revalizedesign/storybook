import { AppShell } from './AppShell'
import presets from './app-shell-presets.json'

export default {
  title: 'Products/Attainia',
  parameters: { layout: 'fullscreen' },
}

export const AppShellStory = {
  name: 'App shell',
  render: () => <AppShell preset={presets.attainia} />,
}
