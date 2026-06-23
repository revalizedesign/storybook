import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination'

export default {
  title: 'shadcn/Pagination',
  parameters: {
    docs: {
      description: {
        component: `<a href="https://ui.shadcn.com/docs/components/base/pagination">Pagination - shadcn/ui</a>

**Jonathan:** **Bounded:** "Showing X results" left, Previous / Page / Next right. Previous disabled on page 1, Next on last page. Default 25 rows per page.

**Matt:** Strong improvement over the default ShadCN implementation.

**Observations:** Current pattern demonstrates meaningful refinement. Some spacing and attachment inconsistencies remain. Pagination quality is heavily dependent on surrounding layout decisions.

**Key learning:** Many pagination issues originate at the page and table layout level rather than inside the component itself.

**What's missing:** More contextual examples. Clear guidance around table composition. Layout do's and don'ts.

**Roadmap:** Add complete table examples. Document acceptable and unacceptable layouts. Clarify relationships between: Page toolbars, Table headers, Table controls, Pagination controls, Data table containers. Establish spacing and positioning rules for data-heavy experiences.`,
      },
    },
  },
}

export const Default = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationNext href="#" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

export const Bounded = {
  render: () => (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <span className="text-sm text-muted-foreground">Showing 8 active results</span>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" aria-disabled className="pointer-events-none opacity-50" /></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationNext href="#" /></PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ),
}
