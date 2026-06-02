import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu'
import { Search, ArrowUp, ArrowUpDown, Columns3 } from 'lucide-react'

export default {
  title: 'Design patterns/Data/Column filter + sort',
  parameters: {
    docs: { description: { component: '**Already built** · Critical. Search input + Columns toggle live in the DataTable toolbar. Click a header to sort; sort logic still needs implementation. Users sort by date, status and name constantly.' } },
  },
}

export const Default = {
  render: () => (
    <div className="w-[40rem] flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <InputGroup className="flex-1"><InputGroupAddon><Search className="size-4" /></InputGroupAddon><Input placeholder="Search product lines..." /></InputGroup>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}><Columns3 className="size-4" /> Columns</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked>Name</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Modified</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead><button className="flex items-center gap-1 text-primary">Name <ArrowUp className="size-3" /></button></TableHead>
            <TableHead><button className="flex items-center gap-1">Status <ArrowUpDown className="size-3 opacity-40" /></button></TableHead>
            <TableHead><button className="flex items-center gap-1">Modified <ArrowUpDown className="size-3 opacity-40" /></button></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow><TableCell>Acme-ES-AdvDemo</TableCell><TableCell>Active</TableCell><TableCell>10/30/25</TableCell></TableRow>
          <TableRow><TableCell>Betanext Test</TableCell><TableCell>Pending</TableCell><TableCell>11/13/25</TableCell></TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}
