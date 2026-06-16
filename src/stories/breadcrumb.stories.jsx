import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Breadcrumb',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/breadcrumb">Breadcrumb - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `Already built · Critical priority. Current location in the app hierarchy. 3 levels max, last item is the bold current page (not a link), parents are links, never truncate.`,
          Matt: `Functional but incomplete.

**Observations:** ShadCN defaults provide a strong starting point. Current documentation lacks sufficient depth around navigation complexity.

**What's missing:** Complete rules. Complete state definitions. Complete variant definitions. Guidance for deeply nested navigation structures.

**Roadmap:** Expand truncation and overflow patterns. Define extensibility rules. Explore navigation complexity beyond simple rule-of-three assumptions. Align documentation depth with pagination.`,
        },
      }),
    },
  },
}

export const Default = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}
