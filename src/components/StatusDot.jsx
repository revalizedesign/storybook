import { cn } from '@/lib/utils'

export function StatusDot({ children, className }) {
  if (!children) return null
  return (
    <span className={cn('flex shrink-0 items-center gap-1.5 text-muted-foreground', className)}>
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}
