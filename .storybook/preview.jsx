import '../src/index.css'
import { create } from 'storybook/theming/create'

const theme = create({
  base: 'light',
  fontBase: 'system-ui, sans-serif',
  fontCode: 'monospace',
})

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  tags: ['autodocs'],
  parameters: {
    docs: { theme },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Roadmap',
          'Status',
          'Updates',
          'Usage',
          'Foundations', ['Colors', 'Icons', 'Spacing', 'Themes', 'Typography'],
          'shadcn',
          'Other frameworks',
          'Originals', ['Agent status', 'Autosave', 'Banner card', 'Chat card', 'Chat input', 'Chat message', 'Chat pane', 'Context wizard', 'Flow header', 'Page header', 'Tab bar', 'Vertical pane'],
          'Libraries', ['Data table', 'Stepper', 'Tree view'],
          'Layout', ['App', 'App shell', 'Band', 'Dashboard', 'Detail drawer', 'Slot shell', 'Examples'],
          'Multi-component UX', ['Search', 'Tagging'],
          'Generic', ['Unauthenticated', 'AI app', 'Canvas app'],
          'Products', ['Attainia', 'AutoQuotes', 'Configure One', 'Intelliquip', 'LAI', 'PRO.FILE', 'PUMP-FLO', 'SpecPage'],
          'Experiments',
          'Contributing',
          'Internal',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview
