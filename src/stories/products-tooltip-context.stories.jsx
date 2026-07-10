import { expect, userEvent, waitForElementToBeRemoved, within } from 'storybook/test'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Fa } from '@/components/Fa'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import data from './products-tooltip-context.json'

// Tooltip, in context — a help affordance on a rule-condition field in Configure One's AI Logic
// Builder. The tooltip is the icon button beside the field label (never the label or input itself),
// matching the Revalize rule that a tooltip trigger is always an icon or icon button. This mirrors
// the products-breadcrumb-context pattern: real product usage, data in the JSON file next to the
// story rather than hardcoded in JSX.
//
// PLACEHOLDER COPY — the tooltip text lives in products-tooltip-context.json and is flagged there as
// placeholder. Jonathan to confirm or replace with the real AI Logic Builder condition copy.
export default {
  title: 'Revalize/Tooltip in context',
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Tooltip used in Configure One\'s AI Logic Builder — an info icon beside a rule-condition field explaining what the condition does. **The tooltip copy is placeholder** (see products-tooltip-context.json); Jonathan to confirm or replace with real copy.',
      },
    },
  },
}

export const RuleConditionHint = {
  name: 'Rule condition hint',
  render: () => (
    <TooltipProvider>
      <div className="flex max-w-md flex-col gap-4 rounded-lg border border-border p-4">
        <div className="flex items-center gap-2">
          <Fa name="wand-magic-sparkles" className="text-muted-foreground" />
          <span className="text-sm font-medium">{data.rule}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Label htmlFor="rule-condition">{data.field}</Label>
            <Tooltip>
              <TooltipTrigger render={<button type="button" aria-label={data.helpLabel} />}>
                <Fa name="circle-info" className="text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="right">{data.placeholder}</TooltipContent>
            </Tooltip>
          </div>
          <Input id="rule-condition" readOnly value={data.step} />
        </div>
      </div>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: data.helpLabel })

    // This primitive's popup has no role="tooltip" (Base UI omits it — flagged in the Revalize/Tooltip
    // meta), so assert on the visible content text. Hover opens it.
    await userEvent.hover(trigger)
    await within(document.body).findByText(data.placeholder)
    await userEvent.unhover(trigger)
    await waitForElementToBeRemoved(() => within(document.body).queryByText(data.placeholder))

    // Keyboard focus opens it too, and Escape dismisses without moving focus off the trigger.
    await userEvent.tab()
    await expect(trigger).toHaveFocus()
    await within(document.body).findByText(data.placeholder)

    await userEvent.keyboard('{Escape}')
    await waitForElementToBeRemoved(() => within(document.body).queryByText(data.placeholder))
    await expect(trigger).toHaveFocus()
  },
}
