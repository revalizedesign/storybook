import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

export default {
  title: 'Design patterns/Feedback & Status/Loading skeleton',
  parameters: {
    docs: { description: { component: '**Already built** · Critical. Visible placeholder matching content dimensions. Use a solid muted fill (never transparent), match column widths, slight width variation to feel real. Ships with DataTable.' } },
  },
}

const widths = ['80%', '90%', '70%', '85%']

export const Default = {
  render: () => (
    <Table className="w-[36rem]">
      <TableHeader>
        <TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead>Modified</TableHead></TableRow>
      </TableHeader>
      <TableBody>
        {widths.map((w, i) => (
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
