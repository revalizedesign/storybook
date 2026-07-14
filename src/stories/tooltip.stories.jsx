import { expect, userEvent, waitForElementToBeRemoved, within } from 'storybook/test'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Button } from '@/components/ui/button'
import { Fa } from '@/components/Fa'
import { Label } from '@/components/ui/label'

// All Tooltip work lives under this single shadcn/Tooltip story. shadcn's own examples are Default
// (hover), Side, With Keyboard Shortcut, Disabled Button, and RTL — this covers the first four (RTL
// is a project-wide i18n config, not a component variant), plus the Revalize field-hint pattern and
// the keyboard/escape accessibility interaction tests. Lean on purpose: no invented props.
export default {
  title: 'shadcn/Tooltip',
  component: Tooltip,
  parameters: {
    a11y: {
      // Tooltip is a "done" component per the Revalize checklist — hold it to zero critical
      // violations in CI, rather than the project-wide 'todo' default in .storybook/preview.jsx.
      test: 'error',
    },
    docs: {
      description: {
        component: `<a href="https://base-ui.com/react/components/tooltip">Tooltip - Base UI</a><br/><a href="https://ui.shadcn.com/docs/components/base/tooltip">Tooltip - shadcn/ui</a>

**When to use:** A popup that appears when an element is hovered or focused, showing a short hint for sighted users. Never the only way to reach required information — it doesn’t appear until hover or focus, and isn’t announced to assistive tech.

**Rules:**
- AppShell already provides a \`TooltipProvider\` — most usages don’t add their own.
- Use Base UI’s render prop (\`render={<Button variant="outline" />}\`) to compose the trigger onto an existing element — not \`asChild\`, which this repo’s primitive doesn’t support.`,
      },
    },
  },
  argTypes: {
    delay: {
      control: { type: 'number', min: 0, step: 50 },
      description: 'Hover delay in ms before the tooltip opens. Set on `TooltipProvider`, shared by every `Tooltip` beneath it.',
      table: { defaultValue: { summary: '0' } },
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Which side of the anchor element to align the popup against. May automatically change to avoid collisions. Named `side`, not `placement`, matching the shadcn prop.',
      table: { defaultValue: { summary: 'top' } },
    },
    children: {
      control: 'text',
      description: 'Tooltip content. Keep it short (1–2 lines) — use Popover instead for longer text.',
    },
  },
  decorators: [(Story, { args }) => <TooltipProvider delay={args.delay}><Story /></TooltipProvider>],
}

export const Default = {
  args: { children: 'Add to library' },
  render: ({ children, side }) => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>
      <TooltipContent side={side}>{children}</TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Hover' })

    // This primitive's popup has no role="tooltip" (Base UI omits it), so assert on the visible
    // content text, which is what actually renders on open.
    await userEvent.hover(trigger)
    await within(document.body).findByText('Add to library')

    await userEvent.unhover(trigger)
  },
}

// Eight triggers pinned to the four corners and four edge-midpoints of a tall min-height frame. Each
// requests the `side` that points inward, away from its nearest edge, so the popup has room to
// render: the edge-midpoints point straight in (top → bottom, left → right, and so on), and the
// corners — which have no diagonal side — point horizontally inward (left corners → right, right
// corners → left). Against the frame edges, this shows the requested side and the automatic
// collision avoidance working together.
const SIDE_POSITIONS = [
  { className: 'left-6 top-6', side: 'right' },
  { className: '-translate-x-1/2 left-1/2 top-6', side: 'bottom' },
  { className: 'right-6 top-6', side: 'left' },
  { className: '-translate-y-1/2 right-6 top-1/2', side: 'left' },
  { className: 'bottom-6 right-6', side: 'left' },
  { className: '-translate-x-1/2 bottom-6 left-1/2', side: 'top' },
  { className: 'bottom-6 left-6', side: 'right' },
  { className: '-translate-y-1/2 left-6 top-1/2', side: 'right' },
]

export const Side = {
  argTypes: {
    side: { table: { disable: true } },
  },
  args: { children: 'Tooltip content' },
  parameters: {
    docs: { description: { story: 'Which side of the anchor element to align the popup against. May automatically change to avoid collisions. See the <a href="https://base-ui.com/react/components/tooltip#positioner">Base UI Positioner</a>.' } },
    layout: 'fullscreen',
  },
  render: ({ children }) => (
    <div className="relative min-h-[max(10rem,50dvh)] w-full">
      {SIDE_POSITIONS.map(({ className, side }) => (
        <div className={`absolute ${className}`} key={className}>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>{side}</TooltipTrigger>
            <TooltipContent side={side}>{children}</TooltipContent>
          </Tooltip>
        </div>
      ))}
    </div>
  ),
}

export const WithKeyboardShortcut = {
  name: 'With keyboard shortcut',
  argTypes: {
    children: { table: { disable: true } },
  },
  render: ({ side }) => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Save</TooltipTrigger>
      <TooltipContent side={side}>
        Save changes
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  ),
}

// Disabled native elements fire no hover/focus events at all — the trigger must be a focusable
// wrapper (a <span tabIndex={0}>) around the disabled button, not the disabled button itself, or the
// tooltip becomes permanently unreachable. Interaction test proves the wrapper is what receives focus
// and opens the tooltip, and that the disabled button underneath never receives it.
export const DisabledButton = {
  name: 'Disabled button',
  parameters: { docs: { description: { story: 'Show a tooltip on a disabled button by wrapping it with a span.' } } },
  args: { children: 'Complete the required fields first' },
  render: ({ children, side }) => (
    <Tooltip>
      <TooltipTrigger render={<span tabIndex={0} />}>
        <Button variant="outline" disabled>Submit</Button>
      </TooltipTrigger>
      <TooltipContent side={side}>{children}</TooltipContent>
    </Tooltip>
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

// Interaction test for the two keyboard behaviours: Tab focus must open the tooltip just like hover
// does, and Escape must dismiss it without moving focus off the trigger. A naive implementation
// sometimes routes Escape through a focus-return that lands elsewhere; this proves focus stays put.
export const KeyboardSupport = {
  name: 'Keyboard support',
  parameters: { docs: { description: { story: 'The trigger opens on keyboard focus, not just hover — its underlying reason set includes both. Tab to the trigger and the tooltip opens; Escape dismisses it while keeping focus on the trigger, so keyboard users never lose their place.' } } },
  args: { children: 'Opens on focus, dismisses on Escape' },
  render: ({ children, side }) => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Tab, then Escape</TooltipTrigger>
      <TooltipContent side={side}>{children}</TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Tab, then Escape' })

    // Focus alone must open it (not just hover) — assert the content becomes reachable in the DOM.
    await userEvent.tab()
    await expect(trigger).toHaveFocus()
    await within(document.body).findByText('Opens on focus, dismisses on Escape')

    // Escape dismisses the tooltip but focus stays on the trigger.
    await userEvent.keyboard('{Escape}')
    await waitForElementToBeRemoved(() => within(document.body).queryByText('Opens on focus, dismisses on Escape'))
    await expect(trigger).toHaveFocus()
  },
}

// Edge case: long content should wrap within TooltipContent's max-w-xs (see tooltip.jsx) rather than
// overflow or stretch the popup unbounded.
export const LongContent = {
  name: 'Long content',
  args: { children: "Logic items are calculated values derived from system inputs — they control workflow rules and conditions in the configuration layer, and can reference any prior step's output." },
  render: ({ children, side }) => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Hover for detail</TooltipTrigger>
      <TooltipContent side={side}>{children}</TooltipContent>
    </Tooltip>
  ),
}

// Field help icon, composed from the shadcn/Tooltip primitive — the icon (not the label or input) is
// the trigger, matching the Revalize rule that a tooltip trigger is always an icon or icon button,
// never bare text. See the Products/Configure One/Tooltip in context story for the same pattern in a real product.
export const FieldHint = {
  name: 'Field hint',
  args: { children: 'Price = (Base cost × Qty) + Shipping' },
  render: ({ children, side }) => (
    <div className="flex items-center gap-1.5">
      <Label htmlFor="price-formula">Price formula</Label>
      <Tooltip>
        <TooltipTrigger render={<button type="button" aria-label="Price formula help" />}>
          <Fa name="circle-question" className="text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent side={side}>{children}</TooltipContent>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Price formula help' })

    await userEvent.hover(trigger)
    await within(document.body).findByText('Price = (Base cost × Qty) + Shipping')
  },
}
