import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { InboxIcon } from 'lucide-react'

export default {
  title: 'shadcn/Empty',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/empty">Empty - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon"><InboxIcon /></EmptyMedia>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}
