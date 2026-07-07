import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { Lock } from 'lucide-react'

export default {
  title: 'Generic/Unauthenticated',
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
        <EmptyMedia variant="icon"><Lock /></EmptyMedia>
        <EmptyTitle>Unauthenticated</EmptyTitle>
        <EmptyDescription>Placeholder — not yet built.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}
