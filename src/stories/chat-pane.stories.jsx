import { ChatPane } from '@/components/ChatPane'

export default {
  title: 'Originals/Chat pane',
  component: ChatPane,
  argTypes: { messages: { table: { disable: true } } },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `**ChatPane** is the Admin Agent conversation — it owns more than content: message **formatting** and **composer** behavior.

#### Use like Claude
1. ✅ **Auto-growing composer** — grows with its content up to half the viewport, then scrolls.
2. ✅ **Unbounded system messages** — only the user's turns are bubbles (right, accent); the agent's are full-width text led by a dot, or a collapsed affordance for long ones. Structured results render as compact cards.
3. ✅ **Unbounded status** — the running label with a live elapsed timer.
4. ✅ **Stoppable** — the send button becomes a stop button while the agent is working.
5. ✅ **Timed status breadcrumbs** — left in the history when a task finishes.
6. ◻️ **Consolidated tool use** — many calls grouped into one compact entry.

#### Beyond Claude
- ◻️ **Streamed reasoning** — the agent's thinking streamed live as it works, folded by default and expandable. Valuable only because it's live; a summary shown after the turn finishes would be worse than nothing.`,
      },
    },
  },
}

const Page = (props) => (
  <div className="flex h-screen">
    <ChatPane {...props} />
  </div>
)

export const Default = {
  render: () => <Page status="Awaiting your input" messages={[{ role: 'system', text: 'To get started, I need a URL, a description of your company, or an uploaded one-pager — any of those three works.' }]} />,
}

export const Working = {
  render: () => (
    <Page
      working
      status="Staging logic groups…"
      messages={[
        { role: 'user', text: 'build the rules' },
        { role: 'system', text: 'Reading the source doc and staging the rule set…' },
      ]}
    />
  ),
}

