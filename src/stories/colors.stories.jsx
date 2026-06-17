import { cn } from '@/lib/utils'

export default {
  title: 'Foundations/Colors',
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder — current theme tokens (shadcn base-vega). Pending distillation into Revalize colorways. Semantic tokens map to `bg-*` / `text-*` utilities.',
      },
    },
  },
}

const tokens = [
  ['Background', 'bg-background', 'text-foreground', true],
  ['Foreground', 'bg-foreground', 'text-background'],
  ['Card', 'bg-card', 'text-card-foreground', true],
  ['Popover', 'bg-popover', 'text-popover-foreground', true],
  ['Primary', 'bg-primary', 'text-primary-foreground'],
  ['Secondary', 'bg-secondary', 'text-secondary-foreground'],
  ['Muted', 'bg-muted', 'text-muted-foreground'],
  ['Accent', 'bg-accent', 'text-accent-foreground'],
  ['Destructive', 'bg-destructive', 'text-white'],
  ['Border', 'bg-border', 'text-foreground'],
  ['Input', 'bg-input', 'text-foreground'],
  ['Ring', 'bg-ring', 'text-white'],
  ['Sidebar', 'bg-sidebar', 'text-sidebar-foreground', true],
  ['Sidebar primary', 'bg-sidebar-primary', 'text-sidebar-primary-foreground'],
  ['Sidebar accent', 'bg-sidebar-accent', 'text-sidebar-accent-foreground'],
]

const Grid = ({ children }) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">{children}</div>
)

export const Semantic = {
  render: () => (
    <Grid>
      {tokens.map(([name, bg, fg, border]) => (
        <div key={name} className={cn('flex h-20 flex-col justify-end rounded-lg p-2', bg, fg, border && 'border')}>
          <div className="text-xs font-medium">{name}</div>
          <div className="text-[10px] opacity-70">{bg}</div>
        </div>
      ))}
    </Grid>
  ),
}

export const InterimStatus = {
  render: () => (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground">
        Interim status colors used in patterns until success/warning tokens are distilled into the theme.
      </p>
      <Grid>
        {[['Success', 'bg-emerald-600'], ['Warning', 'bg-amber-500'], ['Danger', 'bg-destructive'], ['Info', 'bg-blue-600']].map(([name, bg]) => (
          <div key={name} className={cn('flex h-20 flex-col justify-end rounded-lg p-2 text-white', bg)}>
            <div className="text-xs font-medium">{name}</div>
            <div className="text-[10px] opacity-70">{bg}</div>
          </div>
        ))}
      </Grid>
    </div>
  ),
}
