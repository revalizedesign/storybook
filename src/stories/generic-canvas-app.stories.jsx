import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { LayoutTemplate } from 'lucide-react'

export default {
  title: 'Generic/Canvas app',
  parameters: {
    docs: {
      description: {
        component: '<a href="https://ds.shadcn.com/docs">shadcn Design System docs</a>',
      },
    },
  },
}

export const Default = {
  render: () => (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon"><LayoutTemplate /></EmptyMedia>
        <EmptyTitle>Canvas app</EmptyTitle>
        <EmptyDescription>Placeholder — not yet built.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}
