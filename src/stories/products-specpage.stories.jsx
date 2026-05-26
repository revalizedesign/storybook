import { AppShell } from './AppShell'
import presets from './app-shell-presets.json'

export default {
  title: 'Products/SpecPage',
  parameters: { layout: 'fullscreen' },
}

export const AppShellStory = {
  name: 'App shell',
  render: () => <AppShell preset={presets.specpage} />,
}
