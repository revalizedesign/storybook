import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Upload, Download } from 'lucide-react'

export default {
  title: 'Design patterns/Data/Export',
  parameters: {
    docs: { description: { component: '**Missing** · Critical. We have Import — Export must match and pair with it. Export only the filtered/visible data (not all records) and show the count in the label.' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="outline"><Upload className="size-4" /> Import</Button>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button />}><Download className="size-4" /> Export</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Export 8 filtered results as…</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>CSV (.csv)</DropdownMenuItem>
          <DropdownMenuItem>Excel (.xlsx)</DropdownMenuItem>
          <DropdownMenuItem>PDF</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}
