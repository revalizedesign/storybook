import { Button } from '@/components/ui/button'
import { ChatCard } from '@/components/ChatCard'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Fa } from '@/components/Fa'

// ChatMessage — one chat turn. The user's turns are bubbles (right, accent); the agent's "system"
// turns are unbounded text led by a dot, with an optional ChatCard, action buttons (suggested actions
// / ask-user-question), a collapsed affordance (long output, thinking), or a timed breadcrumb.
const Dot = () => <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-foreground/40" />

export function ChatMessage({ actions, breadcrumb, card, collapsible, elapsed, role, summary, text }) {
  if (breadcrumb) {
    return (
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Fa name="asterisk" />
        <span>{text}</span>
        {elapsed && <span className="tabular-nums">{elapsed}</span>}
      </div>
    )
  }
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] whitespace-pre-wrap rounded-lg bg-accent px-3 py-2 text-accent-foreground">{text}</div>
      </div>
    )
  }
  if (collapsible) {
    return (
      <Collapsible className="flex gap-2">
        <div className="min-w-0 flex-1 space-y-2">
          <CollapsibleTrigger className="group flex items-center gap-1.5 text-left text-muted-foreground hover:text-foreground">
            <Fa name="angle-right" variant="solid" className="transition-transform group-data-[panel-open]:rotate-90" />
            {summary}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-1.5 whitespace-pre-wrap text-muted-foreground">{text}</CollapsibleContent>
          {card && <ChatCard {...card} />}
        </div>
      </Collapsible>
    )
  }
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Dot />
        <div className="min-w-0 flex-1 whitespace-pre-wrap">{text}</div>
      </div>
      {card && <ChatCard {...card} />}
      {actions && (
        <div className="flex flex-wrap gap-2">
          {actions.map((a, i) => (
            <Button key={i} size="sm" variant={a.variant === 'primary' ? 'default' : 'outline'}>{a.label}</Button>
          ))}
        </div>
      )}
    </div>
  )
}
