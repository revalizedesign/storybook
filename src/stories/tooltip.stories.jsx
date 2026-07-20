import { userEvent, within } from 'storybook/test'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Fa } from '@/components/Fa'
import { Label } from '@/components/ui/label'

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

// Field help icon as the trigger — a real usage pattern (icon, not bare text, triggers the tooltip).
export const FieldHint = {
  name: 'Field hint',
  parameters: { docs: { description: { story: 'A tooltip triggered by a field help icon rather than the field itself.' } } },
  render: () => (
    <TooltipProvider>
      <div className="flex items-center gap-1.5">
        <Label htmlFor="price-formula">Price formula</Label>
        <Tooltip>
          <TooltipTrigger render={<button type="button" aria-label="Price formula help" />}>
            <Fa name="circle-question" className="text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>Price = (Base cost × Qty) + Shipping</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Price formula help' })

    await userEvent.hover(trigger)
    await within(document.body).findByText('Price = (Base cost × Qty) + Shipping')
  },
}
