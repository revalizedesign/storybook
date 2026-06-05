import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { InboxIcon, FileText, Plus } from 'lucide-react'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Empty',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/empty">Empty - shadcn/ui</a>' },
      page: createDocsPage(),
    },
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

export const WithAction = {
  name: 'With action',
  parameters: {
    docs: {
      description: {
        story: 'Jonathan: Already built · Critical priority. On every table, list and dashboard widget. Always 4 elements: icon + title + description (explains why empty + what to do) + primary action. Never a blank white box.',
      },
    },
  },
  render: () => (
    <Empty className="border">
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
