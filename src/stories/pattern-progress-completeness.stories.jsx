import { Progress } from '@/components/ui/progress'
import { Check, X } from 'lucide-react'

export default {
  title: 'Design patterns/Feedback & Status/Progress / completeness',
  parameters: {
    docs: { description: { component: '**Missing** · Medium. In CPQ, incomplete configs cannot be quoted. Show completion % and exactly what is missing before the user can generate a quote.' } },
  },
}

const items = [
  ['Pricing rules', false, 'required to quote'],
  ['Compliance certification', false, 'required to quote'],
  ['Base configuration', true, ''],
]

export const Default = {
  render: () => (
    <div className="w-80 rounded-lg border p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Configuration complete</span>
        <span className="text-sm font-semibold text-primary">75%</span>
      </div>
      <Progress value={75} />
      <div className="flex flex-col gap-1.5">
        {items.map(([label, done, note]) => (
          <div key={label} className="flex items-center gap-2 text-sm">
            {done ? <Check className="size-4 text-emerald-600" /> : <X className="size-4 text-destructive" />}
            <span className={done ? 'text-muted-foreground line-through' : ''}>{label}</span>
            {note && <span className="text-xs text-destructive">({note})</span>}
          </div>
        ))}
      </div>
    </div>
  ),
}
