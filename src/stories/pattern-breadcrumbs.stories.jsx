import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

export default {
  title: 'Design patterns/Navigation/Breadcrumbs',
  parameters: {
    docs: { description: { component: '**Already built** · Critical. Current location in the app hierarchy. 3 levels max, last item is the bold current page (not a link), parents are links, never truncate.' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Admin</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Option-Based Pricing</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Products</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-xl font-bold">Option-Based Pricing</h1>
    </div>
  ),
}
