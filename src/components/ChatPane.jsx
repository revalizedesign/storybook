import { useEffect, useRef } from 'react'
import { AgentStatus } from '@/components/AgentStatus'
import { ChatInput } from '@/components/ChatInput'
import { ChatMessage } from '@/components/ChatMessage'
import { ScrollArea } from '@/components/ui/scroll-area'
import { VerticalPane } from '@/components/VerticalPane'

// ChatPane — the Admin Agent conversation: a scrollable list of ChatMessages, an AgentStatus line, and
// a ChatInput composer, inside a VerticalPane. Every part (ChatMessage, ChatCard, AgentStatus,
// ChatInput) is its own component — ChatPane just composes them. Full feature list in the Chat pane story.
const sampleMessages = [
  { role: 'user', text: 'freight trucks' },
  { role: 'system', text: 'To get started, I need a URL, a description of your company, or an uploaded one-pager — any of those three works.' },
  { role: 'user', text: 'https://www.morgancorp.com' },
  { role: 'system', text: "Here's what I found about Morgan Truck Body:", card: { icon: 'building', title: 'Morgan Truck Body', meta: 'Truck bodies and van bodies · Configure-to-order' } },
  { role: 'user', text: 'Looks good' },
  { role: 'system', text: 'The profile is saved — staging the full model with its core groups.', card: { icon: 'cube', title: 'AAA Freight Truck', meta: 'Model staged — 17 groups, 57 inputs' } },
  { role: 'user', text: 'build the rules' },
]

export function ChatPane({ className, floating = false, messages = sampleMessages, pinned = false, status, thinking, working = false }) {
  const turnRef = useRef(null)
  const turnStart = pinned ? messages.findLastIndex((m) => m.role === 'user') : -1
  const history = turnStart > -1 ? messages.slice(0, turnStart) : messages
  const turn = turnStart > -1 ? messages.slice(turnStart) : []
  useEffect(() => {
    const turn = turnRef.current
    const viewport = turn?.closest('[data-slot="scroll-area-viewport"]')
    if (viewport) viewport.scrollTo({ behavior: 'smooth', top: turn.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollTop })
  }, [messages.length, turnStart])
  return (
    <VerticalPane floating={floating} title="Admin Agent" width="w-[25rem]" className={className}>
      <ScrollArea className="min-h-0 flex-1 px-3 py-4">
        <div className="flex flex-col gap-3">
          {history.map((m, i) => <ChatMessage key={i} {...m} />)}
          {turn.length > 0 && (
            // min-height ≈ the scroll viewport, so a short response still lets the turn reach the top
            <div ref={turnRef} className="flex min-h-[calc(100dvh-11rem)] flex-col gap-3">
              {turn.map((m, i) => <ChatMessage key={turnStart + i} {...m} />)}
            </div>
          )}
        </div>
      </ScrollArea>
      {thinking && (
        <div className="h-[5lh] shrink-0 overflow-hidden px-3 [mask-image:linear-gradient(rgb(0_0_0/0.25),black_40%)]">
          <div className="flex h-full flex-col justify-end">
            <div className="whitespace-pre-wrap italic text-muted-foreground/60">{thinking}</div>
          </div>
        </div>
      )}
      <AgentStatus status={status} working={working} />
      <ChatInput working={working} />
    </VerticalPane>
  )
}
