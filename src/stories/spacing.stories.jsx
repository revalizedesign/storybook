import { cn } from '@/lib/utils'

export default {
  title: 'Foundations/Spacing',
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder — Tailwind spacing scale + radius tokens (`--radius` 0.625rem). Pending a distilled Revalize spacing system.',
      },
    },
  },
}

const space = [1, 2, 3, 4, 6, 8, 12, 16]

export const Scale = {
  render: () => (
    <div className="flex flex-col gap-2">
      {space.map(n => (
        <div key={n} className="flex items-center gap-4">
          <span className="w-20 text-xs text-muted-foreground">{n} · {n * 0.25}rem</span>
          <div className="h-4 bg-primary" style={{ width: `${n * 0.25}rem` }} />
        </div>
      ))}
    </div>
  ),
}

const radii = [['rounded-sm', 'sm'], ['rounded-md', 'md'], ['rounded-lg', 'lg'], ['rounded-xl', 'xl'], ['rounded-2xl', '2xl'], ['rounded-full', 'full']]

export const Radius = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {radii.map(([cls, label]) => (
        <div key={cls} className="flex flex-col items-center gap-1">
          <div className={cn('size-16 border bg-muted', cls)} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  ),
}
