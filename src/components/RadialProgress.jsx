import { cn } from '@/lib/utils'

const r = 8
const c = 2 * Math.PI * r

export function RadialProgress({ value, label, danger, className }) {
  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <svg className="size-5 -rotate-90" viewBox="0 0 20 20">
        <circle cx="10" cy="10" fill="none" r={r} stroke="currentColor" className="text-muted" strokeWidth="2" />
        <circle cx="10" cy="10" fill="none" r={r} stroke="currentColor" className={danger ? 'text-destructive' : 'text-primary'} strokeDasharray={c} strokeDashoffset={c - (c * value) / 100} strokeLinecap="round" strokeWidth="2" />
      </svg>
      <span className={cn('text-muted-foreground', danger && 'text-destructive')}>
        {value}%{label && ` ${label}`}
      </span>

    </div>
  )
}
