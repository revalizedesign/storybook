import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Fa } from '@/components/Fa'
import { PaneHeader } from '@/components/PaneHeader'
import { cn } from '@/lib/utils'

// VerticalPane — the generic side pane: a PaneHeader (title + an optional ellipsis `menu`, a list of
// { label, icon } items) over the body (`children`). Docked it's collapsible (collapse → w-10 strip);
// `floating` pins the same pane as a card inside a padded body (Attainia's AI agent). `width` is the
// expanded Tailwind width. Everything specific lives in props/children — the chrome lives here once.
function EllipsisMenu({ items }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-7" aria-label="Menu"><Fa name="ellipsis" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        {items.map((item, i) => (
          <DropdownMenuItem key={i}>{item.icon && <Fa name={item.icon} variant="solid" />}{item.label}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function VerticalPane({ children, className, defaultCollapsed = false, floating = false, menu, title, width = 'w-60' }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const actions = menu ? <EllipsisMenu items={menu} /> : null
  if (floating) {
    return (
      <div className={cn('flex h-full w-[26rem] flex-col rounded-lg border bg-background shadow-lg', className)}>
        <PaneHeader title={title} actions={actions} />
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    )
  }
  return (
    <div className={cn('flex h-full shrink-0 flex-col border-r bg-card transition-[width]', collapsed ? 'w-10' : width, className)}>
      <PaneHeader title={title} actions={actions} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      {!collapsed && <div className="flex min-h-0 flex-1 flex-col">{children}</div>}
    </div>
  )
}
