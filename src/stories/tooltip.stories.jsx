import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

export default {
  title: 'shadcn/Tooltip',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/tooltip">Tooltip - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
