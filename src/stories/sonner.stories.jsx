import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default {
  title: 'shadcn/Sonner',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/sonner">Sonner - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <>
      <Button variant="outline" onClick={() => toast('Event has been created.')}>Show Toast</Button>
      <Toaster />
    </>
  ),
}
