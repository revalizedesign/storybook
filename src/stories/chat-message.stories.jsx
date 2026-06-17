import { ChatMessage } from '@/components/ChatMessage'

export default {
  title: 'Originals/Chat message',
  component: ChatMessage,
  parameters: {
    docs: {
      description: {
        component: 'A single chat turn.',
      },
    },
  },
}

const Box = (props) => (
  <div className="w-96">
    <ChatMessage {...props} />
  </div>
)

export const System = {
  render: () => <Box role="system" text="To get started, I need a URL, a description of your company, or an uploaded one-pager — any of those three works." />,
}

export const User = { render: () => <Box role="user" text="build the rules" /> }

export const WithCard = {
  name: 'With card',
  render: () => <Box role="system" text="Here's what I found about Morgan Truck Body:" card={{ icon: 'building', title: 'Morgan Truck Body', meta: 'Truck bodies and van bodies · Configure-to-order' }} />,
}

export const SuggestedActions = {
  name: 'Suggested actions',
  render: () => <Box role="system" text="Does this look right?" actions={[{ label: 'Looks good', variant: 'primary' }, { label: 'Edit' }]} />,
}

export const AskUserQuestion = {
  name: 'Ask user question',
  render: () => <Box role="system" text="I found gaps in the model. Want to fill them in now, or iterate later?" actions={[{ label: 'Add details now', variant: 'primary' }, { label: "Skip, I'll iterate later" }]} />,
}

export const Collapsed = {
  render: () => <Box role="system" collapsible summary="Read 12 pages from morgancorp.com" text="Crawled the product catalog, spec sheets, and configurator pages. Extracted 17 product families, 240 options, and the nomenclature scheme." card={{ icon: 'file-pdf', title: 'cyclo_6000_o_and_m_v7_web.pdf', size: '1.1MB' }} />,
}

export const TimerBreadcrumb = {
  name: 'Timer breadcrumb',
  render: () => <Box role="system" breadcrumb text="Staged the model" elapsed="12s" />,
}
