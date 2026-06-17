import { Fa } from '@/components/Fa'
import { cn } from '@/lib/utils'

// PaneHeader — the shared header for side panes (Workspaces, Admin Agent chat, detail). One consistent
// height/padding so panes line up across the shell. `title` is a string or a custom node; `actions`
// render before the toggle. The collapse chevron only renders when `onToggle` is given (a fixed pane
// has none); collapsed, it's just the centered expand toggle.
export function PaneHeader({ actions, className, collapsed = false, onToggle, title }) {
  if (collapsed) {
    return (
      <div className={cn('flex h-11 shrink-0 items-center justify-center border-b', className)}>
        <button type="button" aria-label="Expand" onClick={onToggle} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted">
          <Fa name="angle-right" variant="solid" />
        </button>
      </div>
    )
  }
  return (
    <div className={cn('flex h-11 shrink-0 items-center gap-2 border-b px-3', className)}>
      {typeof title === 'string' ? <span className="font-semibold">{title}</span> : title}
      {(actions || onToggle) && (
        <div className="ml-auto flex items-center gap-1">
          {actions}
          {onToggle && (
            <button type="button" aria-label="Collapse" onClick={onToggle} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted">
              <Fa name="angle-right" variant="solid" className="rotate-180 transition-transform" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
