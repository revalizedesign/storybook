import { cn } from '@/lib/utils'

export default {
  title: 'Foundations/Typography',
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder — Inter Variable (`--font-sans`); headings currently share the sans face (`--font-heading`). Pending a distilled Revalize type scale.',
      },
    },
  },
}

const scale = [
  ['text-4xl', 'Display'],
  ['text-3xl', 'Heading 1'],
  ['text-2xl', 'Heading 2'],
  ['text-xl', 'Heading 3'],
  ['text-lg', 'Large'],
  ['text-base', 'Body'],
  ['text-sm', 'Small'],
  ['text-xs', 'Caption'],
]

export const Scale = {
  render: () => (
    <div className="flex flex-col gap-3">
      {scale.map(([cls, label]) => (
        <div key={cls} className="flex items-baseline gap-4 border-b pb-3">
          <span className="w-20 shrink-0 text-xs text-muted-foreground">{cls}</span>
          <span className={cn(cls, 'font-medium')}>{label} — Hydro-Pro Series</span>
        </div>
      ))}
    </div>
  ),
}

export const Weights = {
  render: () => (
    <div className="flex flex-col gap-2 text-lg">
      {[['font-normal', 'Normal 400'], ['font-medium', 'Medium 500'], ['font-semibold', 'Semibold 600'], ['font-bold', 'Bold 700']].map(([cls, label]) => (
        <div key={cls} className={cls}>{label} — The quick brown fox jumps over the lazy dog</div>
      ))}
    </div>
  ),
}
