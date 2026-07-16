import { FlowHeader } from '@/components/FlowHeader'

export default {
  title: 'Originals/Flow header',
  component: FlowHeader,
  argTypes: {
    step: { control: 'number' },
    steps: { control: 'number' },
    heading: { control: 'text' },
    lede: { control: 'text' },
  },
  args: { step: 3, steps: 7, heading: 'Add your first source', lede: 'Follow the steps to set up your workspace.' },
}

export const Default = {}
