import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Breadcrumb',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/breadcrumb">Breadcrumb - shadcn/ui</a>' },
      page: createDocsPage(),
    },
  },
}

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Jonathan: Already built · Critical priority. Current location in the app hierarchy. 3 levels max, last item is the bold current page (not a link), parents are links, never truncate.',
      },
    },
  },
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
