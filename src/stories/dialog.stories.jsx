import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default {
  title: 'shadcn/Dialog',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/dialog">Dialog - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>This is a dialog description.</DialogDescription>
        </DialogHeader>
        <p>Dialog body content.</p>
        <DialogFooter showCloseButton>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
