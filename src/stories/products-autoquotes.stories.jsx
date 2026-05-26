import { AppShell } from './AppShell'
import presets from './app-shell-presets.json'

export default {
  title: 'Products/AutoQuotes',
  parameters: { layout: 'fullscreen' },
}

export const AppShellStory = {
  name: 'App shell',
  render: () => <AppShell preset={presets.autoquotes} />,
}
