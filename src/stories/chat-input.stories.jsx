import { ChatInput } from '@/components/ChatInput'

export default {
  title: 'Originals/Chat input',
  component: ChatInput,
  parameters: {
    docs: {
      description: {
        component: 'The chat composer; the input grows with its content, then scrolls.',
      },
    },
  },
}

const Box = (props) => (
  <div className="w-96 rounded-lg border">
    <ChatInput {...props} />
  </div>
)

export const Default = { render: () => <Box /> }

export const MultipleLines = {
  name: 'Multiple lines',
  render: () => <Box defaultValue={'Configure the Cyclo 6000 with:\n- output shaft orientation\n- housing style\n- motor capacity and frame size'} />,
}

export const Working = { render: () => <Box working /> }
