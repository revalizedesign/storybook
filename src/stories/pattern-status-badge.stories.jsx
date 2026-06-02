import { Badge } from '@/components/ui/badge'

export default {
  title: 'Design patterns/Feedback & Status/Status badge',
  parameters: {
    docs: { description: { component: '**Already built** · Critical. Pill style (never square), text always paired with color, semantic colors only, consistent across ALL products. Mapped here onto base-vega Badge variants — palette is open for review.' } },
  },
}

const statuses = [
  ['Active', 'secondary'],
  ['Pending', 'outline'],
  ['Inactive', 'destructive'],
  ['Draft', 'default'],
  ['Archived', 'ghost'],
]

export const Default = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {statuses.map(([label, variant]) => <Badge key={label} variant={variant}>{label}</Badge>)}
    </div>
  ),
}
