import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Skeleton',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/skeleton">Skeleton - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**Table:** Already built · Critical priority. Visible placeholder matching content dimensions. Use a solid muted fill (never transparent), match column widths, slight width variation to feel real. Ships with DataTable.`,
          Matt: `Directionally correct but underdeveloped.

**Observations:** Current coverage feels too narrow. Existing stories do not represent the variety of loading states users encounter.

**Roadmap:** Expand to at least several representative loading scenarios. Add richer examples tied to actual page layouts. Increase documentation depth and implementation guidance.`,
        },
      }),
    },
  },
}

export const Default = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  ),
}

export const TableVariant = {
  name: 'Table',
  render: () => (
    <Table className="w-[36rem]">
      <TableHeader>
        <TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead>Modified</TableHead></TableRow>
      </TableHeader>
      <TableBody>
        {['80%', '90%', '70%', '85%'].map((w, i) => (
          <TableRow key={i}>
            <TableCell><Skeleton className="h-3" style={{ width: w }} /></TableCell>
            <TableCell><Skeleton className="h-3 w-16" /></TableCell>
            <TableCell><Skeleton className="h-3 w-12" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
