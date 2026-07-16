import { useEffect, useState } from 'react'
import { ChatPane } from '@/components/ChatPane'

const THINKING = `The setup gate is satisfied. Sources and Excerpts are non-zero for Company and Industry, and every Category in the Catalog carries at least one Source, so the build can start. Model comes first. Twenty-four Input groups at min 1, each Input carrying at least one Option, and Specs extending the option values a tier below. CITY_OF_USE should stay a type-ahead given 25,272 options. Rules next, Procedural before everything since logic items are what put Input groups on pages. The wheelbase chain reads cleaner as a Relational driver matrix than fifteen IF items. One Query filters the walkramp table. Formulas and Loops can sit at min 0 for this Product since nothing in the Sources demands iteration. Results last. Ninety BOM lines to map, include-when from Procedural, which-part from Relational, quantity from Formula or Spec. Once every min 1 object has a reviewable item in any non-null state, the commit gate opens and this Session can publish the Product to the Catalog.`

const THINKING_WORDS = THINKING.split(' ')

const ThinkingPage = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const done = count >= THINKING_WORDS.length
    const stall = Math.random() < 0.2
    const delay = done ? 2500 : stall ? 400 + Math.random() * 600 : 50 + Math.random() * 100
    const id = setTimeout(() => setCount(done ? 0 : Math.min(THINKING_WORDS.length, count + 1 + Math.floor(Math.random() * 5))), delay)
    return () => clearTimeout(id)
  }, [count])
  return <Page working status="Reasoning about the build…" messages={[{ role: 'user', text: 'build the model' }]} thinking={THINKING_WORDS.slice(0, count).join(' ')} />
}

export default {
  title: 'Originals/Chat pane',
  component: ChatPane,
  argTypes: { messages: { table: { disable: true } } },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `**ChatPane** is the Admin Agent conversation — it owns more than content: message **formatting** and **composer** behavior.

## Use like Claude
1. ✅ **Auto-growing composer** — grows with its content up to half the viewport, then scrolls.
2. ✅ **Unbounded system messages** — only the user’s turns are bubbles (right, accent); the agent’s are full-width text led by a dot, or a collapsed affordance for long ones. Structured results render as compact cards.
3. ✅ **Unbounded status** — the running label with a live elapsed timer.
4. ✅ **Stoppable** — the send button becomes a stop button while the agent is working.
5. ✅ **Timed status breadcrumbs** — left in the history when a task finishes.
6. ✅ **Consolidated tool use** — many calls grouped into one compact entry. “Ran N shell commands” expands on click to per-call rows; a running call’s dot blinks; output renders behind the ⎿ elbow.
7. ✅ **Pinned turn** — on submit, the user’s message auto-scrolls to the top of the pane and holds there while the agent works, no matter how much content streams in below it. Past messages scroll out of view (still reachable by scrolling up). Requires the pane at full viewport height.

## Beyond Claude
- ✅ **Streamed reasoning** — the agent’s thinking streamed live as it works. Valuable only because it’s live; a summary shown after the turn finishes would be worse than nothing. Renders as ghost text in a fixed five-line window above the status, with the first and last lines fading further into the background.`,
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

export const Tools = {
  parameters: { docs: { description: { story: 'Tool calls collapse to a count that expands on click. A running call keeps its dot blinking and holds the group open; finished calls show their output behind the ⎿ elbow.' } } },
  render: () => (
    <Page
      working
      status="Verifying sources…"
      messages={[
        { role: 'user', text: 'verify the sources and build the model' },
        { tools: [
          { label: 'Bash(date)', output: String(new Date()) },
          { label: 'Read(AAA_Product_Data.xlsx)', output: 'Read 96 inputs across 24 groups' },
          { error: 'Error editing file', label: 'Update(AAA_Logic_Full.xlsx)' },
        ] },
        { role: 'system', text: 'Sources verified. Building the model next.' },
        { tools: [{ label: 'Build(AAA Freight Truck)', running: true }] },
      ]}
    />
  ),
}

export const Thinking = {
  parameters: { docs: { description: { story: 'Streamed reasoning appears as ghost text in a fixed five-line window directly above the agent status. The window shows the tail of the stream, and the first and last visible lines drop to half opacity so the text fades into the background.' } } },
  render: () => <ThinkingPage />,
}

export const Pinned = {
  parameters: { docs: { description: { story: 'The submitted message pins to the top: on load the pane auto-scrolls the latest user turn to the top edge, the six earlier messages leave the viewport, and the streaming response fills the space below without moving the pinned message.' } } },
  render: () => (
    <Page
      pinned
      working
      status="Staging logic groups…"
      messages={[
        { role: 'user', text: 'freight trucks' },
        { role: 'system', text: 'To get started, I need a URL, a description of your company, or an uploaded one-pager — any of those three works.' },
        { role: 'user', text: 'https://www.morgancorp.com' },
        { role: 'system', text: 'Here’s what I found about Morgan Truck Body:', card: { icon: 'building', title: 'Morgan Truck Body', meta: 'Truck bodies and van bodies · Configure-to-order' } },
        { role: 'user', text: 'Looks good' },
        { role: 'system', text: 'The profile is saved — staging the full model with its core groups.', card: { icon: 'cube', title: 'AAA Freight Truck', meta: 'Model staged — 17 groups, 57 inputs' } },
        { role: 'user', text: 'build the rules' },
        { role: 'system', text: 'Reading the source doc and staging the rule set…' },
      ]}
    />
  ),
}

