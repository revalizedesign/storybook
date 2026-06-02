import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination'

export default {
  title: 'Design patterns/Navigation/Pagination',
  parameters: {
    docs: { description: { component: '**Already built** · Critical. "Showing X results" left, Previous / Page / Next right. Previous disabled on page 1, Next on last page. Default 25 rows per page.' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex items-center justify-between w-[36rem] rounded-lg border p-3">
      <span className="text-sm text-muted-foreground">Showing 8 active results</span>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" aria-disabled className="pointer-events-none opacity-50" /></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationNext href="#" /></PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ),
}
