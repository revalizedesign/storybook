import { expect, userEvent, waitForElementToBeRemoved, within } from 'storybook/test'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Button } from '@/components/ui/button'
import { Fa } from '@/components/Fa'
import { Label } from '@/components/ui/label'

// Revalize variants for Tooltip, built on top of the shadcn/Tooltip story. shadcn's own examples are
// Default (hover), Side, With Keyboard Shortcut, Disabled Button, and RTL — this covers the first four
// (RTL is a project-wide i18n config, not a component variant). Lean on purpose: no invented props.
export default {
  title: 'Revalize/Tooltip',
  component: Tooltip,
  parameters: {
    a11y: {
      // Tooltip is a "done" component per the Revalize checklist — hold it to zero critical
      // violations in CI, rather than the project-wide 'todo' default in .storybook/preview.jsx.
      test: 'error',
    },
    docs: {
      description: {
        component: `**When to use:** A short, supplemental hint tied to an element — never the only way to reach required information, since it doesn't appear until hover or focus.

**Rules:**
- Composition is \`Tooltip\` > \`TooltipTrigger\` > \`TooltipContent\`, wrapped in a \`TooltipProvider\` (already provided by the Shell, so most usages don't add their own).
- \`side\` controls placement — \`top\` (default), \`bottom\`, \`left\`, \`right\`. Named \`side\`, not \`placement\`, matching the shadcn prop.
- Use Base UI's render prop (\`render={<Button variant="outline" />}\`) to compose the trigger onto an existing element — not \`asChild\`, which this repo's primitive doesn't support.

**Accessibility:** Opens on keyboard focus, not just hover — the underlying trigger reason set includes both. A disabled trigger element can't receive focus or hover events, so wrap it in a \`<span tabIndex={0}>\` to keep the tooltip reachable. Escape dismisses without moving focus away from the trigger.

> **⚠️ Flagged for Matt (needs sign-off on \`tooltip.jsx\`):** this Base UI version renders the tooltip popup with **no \`role="tooltip"\`** and wires **no \`aria-describedby\`** from the trigger to the content (see \`FOCUSABLE_POPUP_PROPS\` in \`@base-ui/react\` — only \`tabindex="-1"\`). Base UI treats tooltips as purely visual, but that means a screen reader never announces the hint. The hint is reachable to keyboard focus (it opens), but not *announced*. Fixing it means adding \`role="tooltip"\` + an \`aria-describedby\` link in \`tooltip.jsx\`, which is shadcn-managed — not touched here per the Contributing rules. The interaction tests below assert on the rendered text (what actually works today), not on \`role="tooltip"\`.

**In context:** <a href="?path=/story/revalize-tooltip-in-context--rule-condition-hint">See how this is used in the AI Logic Builder →</a>`,
      },
    },
  },
  argTypes: {
    delay: {
      control: { type: 'number', min: 0, step: 50 },
      description: 'Hover delay in ms before the tooltip opens. Set on `TooltipProvider`, shared by every `Tooltip` beneath it.',
      table: { category: 'TooltipProvider', defaultValue: { summary: '0' } },
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Which side of the trigger the tooltip opens on. Flips automatically if the preferred side would overflow the viewport.',
      table: { category: 'TooltipContent', defaultValue: { summary: 'top' } },
    },
    children: {
      control: 'text',
      description: 'Tooltip content. Keep it short (1–2 lines) — use Popover instead for longer text.',
      table: { category: 'TooltipContent' },
    },
  },
}

export const Default = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Hover' })

    // This primitive's popup has no role="tooltip" (Base UI omits it — see the flag in the meta
    // description), so assert on the visible content text, which is what actually renders on open.
    await userEvent.hover(trigger)
    await within(document.body).findByText('Add to library')

    await userEvent.unhover(trigger)
  },
}

export const Side = {
  args: {
    side: "right",
    children: "",
    delay: 10000
  },

  render: () => (
    <TooltipProvider>
      <div className="flex items-center gap-4">
        {['top', 'right', 'bottom', 'left'].map(side => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline" />}>{side}</TooltipTrigger>
            <TooltipContent side={side}>Add to library</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export const WithKeyboardShortcut = {
  name: 'With keyboard shortcut',
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Save</TooltipTrigger>
        <TooltipContent>
          Save changes
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

// Interaction test: keyboard focus must open the tooltip exactly like hover does — this is the first
// of the two accessibility failure modes call out in the component description above.
export const FocusOpens = {
  name: 'Focus opens (keyboard)',
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Tab to me</TooltipTrigger>
        <TooltipContent>Reachable via keyboard, not just hover</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Tab to me' })

    await userEvent.tab()
    await expect(trigger).toHaveFocus()

    // Focus alone must open it (not just hover) — assert the content becomes reachable in the DOM.
    await within(document.body).findByText('Reachable via keyboard, not just hover')
  },
}

// Interaction test: Escape must dismiss the tooltip without moving focus off the trigger — the second
// accessibility failure mode. A naive implementation sometimes routes Escape through a focus-return
// that lands elsewhere; this proves focus stays put.
export const EscapeDismisses = {
  name: 'Escape dismisses (focus stays)',
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Focus then Escape</TooltipTrigger>
        <TooltipContent>Dismissible without losing focus</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Focus then Escape' })

    await userEvent.tab()
    await expect(trigger).toHaveFocus()
    await within(document.body).findByText('Dismissible without losing focus')

    await userEvent.keyboard('{Escape}')
    await waitForElementToBeRemoved(() => within(document.body).queryByText('Dismissible without losing focus'))
    // The key assertion: Escape dismissed the tooltip but focus stayed on the trigger.
    await expect(trigger).toHaveFocus()
  },
}

// Disabled native elements fire no hover/focus events at all — the trigger must be a focusable
// wrapper (a <span tabIndex={0}>) around the disabled button, not the disabled button itself, or the
// tooltip becomes permanently unreachable. Interaction test proves the wrapper is what receives focus
// and opens the tooltip, and that the disabled button underneath never receives it.
export const DisabledButton = {
  name: 'Disabled button',
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<span tabIndex={0} />}>
          <Button variant="outline" disabled>Submit</Button>
        </TooltipTrigger>
        <TooltipContent>Complete the required fields first</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Submit' })
    await expect(button).toBeDisabled()

    await userEvent.tab()
    await within(document.body).findByText('Complete the required fields first')
    // Focus landed on the <span> wrapper, never on the disabled button underneath.
    await expect(button).not.toHaveFocus()
  },
}

// Edge case: long content should wrap within TooltipContent's max-w-xs (see tooltip.jsx) rather than
// overflow or stretch the popup unbounded.
export const LongContent = {
  name: 'Long content',
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Hover for detail</TooltipTrigger>
        <TooltipContent>
          Logic items are calculated values derived from system inputs — they control workflow rules
          and conditions in the configuration layer, and can reference any prior step's output.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

// Edge case: near a viewport edge, Base UI's Positioner flips the tooltip to the opposite side
// automatically rather than letting it overflow — this proves it at a realistic edge instead of
// asserting on it, since the flipped side is a floating-ui internal, not a stable prop to assert.
export const NearViewportEdge = {
  name: 'Near viewport edge',
  render: () => (
    <TooltipProvider>
      <div className="flex justify-end pr-2">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>Right edge</TooltipTrigger>
          <TooltipContent side="right">Flips to the left when it would overflow</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}

// Field help icon, composed from the shadcn/Tooltip primitive — the icon (not the label or input) is
// the trigger, matching the Revalize rule that a tooltip trigger is always an icon or icon button,
// never bare text. See the AI Logic Builder in-context story for the same pattern in a real product.
export const FieldHint = {
  name: 'Field hint',
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
