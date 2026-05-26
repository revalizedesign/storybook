import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export default {
  title: 'shadcn/Popover',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/popover">Popover - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">Popover content goes here.</p>
      </PopoverContent>
    </Popover>
  ),
}
