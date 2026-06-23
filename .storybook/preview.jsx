import '../src/index.css'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  tags: ['autodocs'],
  parameters: {
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
          'Originals', ['Agent status', 'Autosave', 'Chat card', 'Chat input', 'Chat message', 'Chat pane', 'Page header', 'Tab bar', 'Vertical pane'],
          'Libraries', ['Data table', 'Stepper', 'Tree view'],
          'Layout', ['App', 'Band', 'Dashboard', 'Detail drawer', 'Slots', 'Shell', 'Examples'],
          'Multi-component UX', ['Search', 'Tagging'],
          'Patterns',
          'Products', ['Attainia', 'AutoQuotes', 'ConfigureOne', 'FlowIQ', 'LAI', 'SpecPage'],
          'Contributing',
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
