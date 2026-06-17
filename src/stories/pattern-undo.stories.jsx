import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default {
  title: 'Microinteractions/Forms & Input/Undo',
  parameters: {
    docs: { description: { component: 'Reverse the last action, especially after bulk operations. Show undo in a toast (not a page), ~5s timeout, one level only, reversible actions only.' } },
  },
}

export const Default = {
  render: () => (
    <>
      <Button variant="outline" onClick={() => toast('Deleted 3 product configurations', { action: { label: 'Undo', onClick: () => toast('Restored') }, duration: 5000 })}>
        Delete 3 items
      </Button>
      <Toaster />
    </>
  ),
}
