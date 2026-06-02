import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'

export default {
  title: 'Design patterns/Data/Inline editing',
  parameters: {
    docs: { description: { component: '**Missing** · High. Click a cell to edit directly — no drawer. Simple fields only (text, number, select); complex edits go to a drawer. Enter to save, Escape to cancel, edited row gets a left-border accent.' } },
  },
}

export const Default = {
  render: () => (
    <Table className="w-96">
      <TableHeader>
        <TableRow><TableHead>Product</TableHead><TableHead>Base price</TableHead></TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableCell>Standard Config</TableCell><TableCell className="text-muted-foreground">$1,200.00</TableCell></TableRow>
        <TableRow className="border-l-2 border-l-primary bg-accent/40">
          <TableCell>Pro Config</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Input defaultValue="$2,400.00" className="h-7 w-24" />
              <Kbd>↵</Kbd>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
