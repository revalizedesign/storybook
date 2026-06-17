import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { InboxIcon, FileText, Plus } from 'lucide-react'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Empty',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/empty">Empty - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**With action:** On every table, list and dashboard widget. Always 4 elements: icon + title + description (explains why empty + what to do) + primary action. Never a blank white box.`,
          Matt: `Solid baseline implementation.

**Observations:** Current with-action and without-action variants are sufficient as a starting point. Empty states are heavily influenced by surrounding UX context.

**What's missing:** More onboarding and first-use examples. Guidance for illustration usage. Guidance for icon usage.

**Roadmap:** Explore stateful onboarding scenarios. Define illustration and icon strategy. Expand examples across common product workflows.`,
        },
      }),
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
