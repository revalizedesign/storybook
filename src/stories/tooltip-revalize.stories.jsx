import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Button } from '@/components/ui/button'

// Revalize variants for Tooltip, built on top of the shadcn/Tooltip story. shadcn's own examples are
// Default (hover), Side, With Keyboard Shortcut, Disabled Button, and RTL — this covers the first four
// (RTL is a project-wide i18n config, not a component variant). Lean on purpose: no invented props.
export default {
  title: 'Revalize/Tooltip',
  parameters: {
    docs: {
      description: {
        component: `**When to use:** A short, supplemental hint tied to an element — never the only way to reach required information, since it doesn't appear until hover or focus.

**Rules:**
- Composition is \`Tooltip\` > \`TooltipTrigger\` > \`TooltipContent\`, wrapped in a \`TooltipProvider\` (already provided by the Shell, so most usages don't add their own).
- \`side\` controls placement — \`top\` (default), \`bottom\`, \`left\`, \`right\`. Named \`side\`, not \`placement\`, matching the shadcn prop.

**Accessibility:** Opens on keyboard focus, not just hover — the underlying trigger reason set includes both. A disabled trigger element can't receive focus or hover events, so wrap it in a \`<span>\` to keep the tooltip reachable.`,
      },
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
}

export const Side = {
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
  ),
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
}
