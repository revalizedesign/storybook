import '../src/index.css'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: [
          'Introduction',
          'Status',
          'Foundations', ['Colors', 'Icons', 'Spacing', 'Typography'],
          'shadcn',
          'Other frameworks',
          'Originals', ['Agent status', 'Chat card', 'Chat input', 'Chat message', 'Chat pane', 'Page header', 'Tab bar', 'Vertical pane'],
          'Libraries', ['Data table', 'Tree view'],
          'Layout', ['App', 'Band', 'Slots', 'Shell', 'Examples'],
          'Microinteractions',
          'Patterns',
          'Products',
          'Experiments',
          'Updates',
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
