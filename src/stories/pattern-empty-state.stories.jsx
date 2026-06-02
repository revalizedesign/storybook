import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { FileText, Plus } from 'lucide-react'

export default {
  title: 'Design patterns/Feedback & Status/Empty state',
  parameters: {
    docs: { description: { component: '**Already built** · Critical. On every table, list and dashboard widget. Always 4 elements: icon + title + description (explains why empty + what to do) + primary action. Never a blank white box.' } },
  },
}

export const Default = {
  render: () => (
    <Empty className="border w-96">
      <EmptyHeader>
        <EmptyMedia variant="icon"><FileText /></EmptyMedia>
        <EmptyTitle>No product lines yet</EmptyTitle>
        <EmptyDescription>Add your first product line to start building configurations and generating quotes.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button><Plus className="size-4" /> Add product line</Button>
      </EmptyContent>
    </Empty>
  ),
}
