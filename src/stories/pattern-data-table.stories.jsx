import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default {
  title: 'Design patterns/Data/Data table',
  parameters: {
    docs: { description: { component: '**Already built** · Critical. Every Revalize product has at least one. Row hover, Name column is always a link, numeric columns right-aligned. Always ships with empty + loading states (see Feedback & Status).' } },
  },
}

const rows = [
  ['Hydro-Pro Series', 'Active', '10/30/25'],
  ['TechFlow Advanced', 'Pending', '11/13/25'],
  ['Doms Test', 'Inactive', '11/13/25'],
]
const tone = { Active: 'secondary', Pending: 'outline', Inactive: 'destructive' }

export const Default = {
  render: () => (
    <Table className="w-[36rem]">
      <TableHeader>
        <TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead>Modified</TableHead></TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(([name, status, modified]) => (
          <TableRow key={name}>
            <TableCell><a href="#" className="font-medium text-primary">{name}</a></TableCell>
            <TableCell><Badge variant={tone[status]}>{status}</Badge></TableCell>
            <TableCell className="text-muted-foreground">{modified}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
