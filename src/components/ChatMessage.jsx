import { Button } from '@/components/ui/button'
import { ChatCard } from '@/components/ChatCard'
import { cn } from '@/lib/utils'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Fa } from '@/components/Fa'

// ChatMessage — one chat turn. The user's turns are bubbles (right, accent); the agent's "system"
// turns are unbounded text led by a dot, with an optional ChatCard, action buttons (suggested actions
// / ask-user-question), a collapsed affordance (long output, thinking), or a timed breadcrumb.
const Dot = ({ className }) => <span className={cn('mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-foreground/40', className)} />

export function ChatMessage({ actions, breadcrumb, card, collapsible, elapsed, role, summary, text, tools }) {
  if (tools) {
    const running = tools.some((t) => t.running)
    return (
      <Collapsible className="flex gap-2">
        <div className="min-w-0 flex-1">
          <CollapsibleTrigger className="text-left text-muted-foreground hover:text-foreground">
            {running ? 'Running' : 'Ran'} {tools.length} {tools.every((t) => t.label.startsWith('Bash(')) ? 'shell command' : 'tool call'}{tools.length !== 1 && 's'}{running && '…'}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-1.5 space-y-1.5">
            {tools.map((t, i) => (
              <div key={i}>
                <div className="flex gap-2">
                  <Dot className={t.error ? 'bg-destructive' : t.running ? 'animate-blink' : undefined} />
                  <span className="min-w-0 flex-1">{t.label}</span>
                </div>
                {t.output && <div className="flex gap-1.5 pl-2 text-muted-foreground"><span className="shrink-0">└</span><span className="min-w-0 flex-1">{t.output}</span></div>}
                {t.error && <div className="flex gap-1.5 pl-2 text-destructive"><span className="shrink-0">└</span><span className="min-w-0 flex-1">{t.error}</span></div>}
              </div>
            ))}
          </CollapsibleContent>
        </div>
      </Collapsible>
    )
  }
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
