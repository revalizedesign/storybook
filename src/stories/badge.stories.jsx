import { Badge } from '@/components/ui/badge'

export default {
  title: 'shadcn/Badge',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/badge">Badge - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  ),
}
