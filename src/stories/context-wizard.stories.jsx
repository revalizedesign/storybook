import { ContextWizard } from '@/components/ContextWizard'
import data from './configureone-aiadmin-wizard.json'
import contextData from './configureone-aiadmin-context.json'

const enrichedSteps = data.map(s => s.type === 'review' ? { ...s, _context: contextData[s.context] } : s)

export default {
  title: 'Originals/Context wizard',
  parameters: { layout: 'fullscreen' },
  args: { format: 'pane' },
  argTypes: {
    format: {
      control: 'select',
      options: ['pane', 'dialog', 'drawer'],
    },
  },
}

export const Default = {
  render: (args) => (
    <div className="h-screen">
      <ContextWizard format={args.format} steps={enrichedSteps} onClose={() => {}} />
    </div>
  ),
}
