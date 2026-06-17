import { Fa } from '@/components/Fa'

export function ChatCard({ icon, meta, size, title }) {
  return (
    <button type="button" className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-0.5 cursor-pointer rounded-lg border bg-card px-3 py-2 text-left hover:bg-muted/50">
      <Fa name={icon} className="text-muted-foreground" />
      <b className="min-w-0 truncate">{title}</b>
      <div className="flex items-center gap-2">
        {size && <span className="text-muted-foreground">{size}</span>}
        <Fa name="angle-right" variant="solid" className="text-muted-foreground" />
      </div>
      {meta && <span className="col-start-2 truncate text-muted-foreground">{meta}</span>}
    </button>
  )
}
