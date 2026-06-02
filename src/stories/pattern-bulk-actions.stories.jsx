import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export default {
  title: 'Design patterns/Data/Bulk actions',
  parameters: {
    docs: { description: { component: '**Missing** · High. Select rows → action bar replaces the toolbar with contextual ops. Shows count, Clear always visible, destructive actions red, confirm before irreversible bulk ops.' } },
  },
}

export const Default = {
  render: () => (
    <div className="w-[40rem] flex items-center justify-between rounded-lg border bg-accent/40 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <Checkbox checked />
        <span className="text-sm font-medium">3 items selected</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Export</Button>
        <Button variant="outline" size="sm">Archive</Button>
        <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
        <Button variant="ghost" size="sm"><X className="size-4" /> Clear</Button>
      </div>
    </div>
  ),
}
