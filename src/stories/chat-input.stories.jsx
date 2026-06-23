import { ChatInput } from '@/components/ChatInput'
import { CyclePlaceholderProvider, useCyclePlaceholder } from '@/components/CyclePlaceholder'

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

const chatHints = [
  'Type, paste a link, or upload a file…',
  'Ask me anything about our catalog…',
  'Type / to show skills…',
  'Paste a link…',
  'Try /help to see what’s possible…',
]

function CyclingChatInput() {
  const placeholder = useCyclePlaceholder()
  return <ChatInput placeholder={placeholder} />
}

export const CyclingPlaceholder = {
  name: 'Cycle placeholder',
  render: () => (
    <CyclePlaceholderProvider placeholders={chatHints}>
      <div className="rounded-lg border">
        <CyclingChatInput />
      </div>
    </CyclePlaceholderProvider>
  ),
}
