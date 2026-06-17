import { ChatCard } from '@/components/ChatCard'

export default {
  title: 'Originals/Chat card',
  component: ChatCard,
  parameters: {
    docs: {
      description: {
        component: 'A linked-output card the agent posts to surface structured data instead of prose.',
      },
    },
  },
}

export const Default = {
  render: () => <ChatCard icon="file-pdf" title="cyclo_6000_o_and_m_v7_web.pdf" size="1.1MB" />,
}

export const WithMeta = {
  name: 'With meta',
  render: () => <ChatCard icon="building" title="Morgan Truck Body" meta="Truck bodies and van bodies · Configure-to-order" />,
}
