import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { HelpCircle } from 'lucide-react'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Tooltip',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/tooltip">Tooltip - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**Short contextual hint without taking space.** Max 1-2 lines (use Popover for longer text).

**When to use:**
- Help icons (?) on inputs, form fields
- Table column header hints (status meanings, calculation logic)
- Icon-only buttons that need explanation
- Field descriptions in configuration forms

**Rules:**
- Content: 1-2 lines max (50-80 chars)
- Trigger: icon (?) or icon button (help), never bare text
- Dismiss: click outside, escape key, blur
- Separator: avoid cluttering UI
- **Accessibility: CRITICAL** Tooltips must appear on keyboard focus, not just hover. Users navigating with Tab must see tooltips. Screen readers must announce tooltip content.

**Accessibility pattern:**
- aria-label on trigger if icon-only
- aria-describedby for tooltips linked to controls
- Visible on :focus-visible (not just :hover)
- Announce on focus (role="tooltip" or aria-label)

**Products:**
- ConfigureOne: Formula field hints, calculation logic
- PROCAD: Part properties, status meanings
- SpecPage: Ingredient properties, unit conversions`,
          Matt: `Short-form contextual information. Current implementation is correct overall.

**Observations:** Tooltip quality depends heavily on positioning logic and viewport awareness. Accessibility is critical—tooltip-only users (keyboard + screen reader) must not be excluded.

**What's missing:** More positioning examples. Viewport edge handling. Explicit keyboard accessibility patterns.

**Roadmap:** Validate viewport edge behavior. Confirm keyboard focus behavior matches :hover. Test with keyboard navigation.`,
        },
      }),
    },
  },
}

export const Default = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>This is a helpful hint</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const PlacementVariants = {
  name: 'Placement Variants',
  render: () => (
    <TooltipProvider>
      <div className="flex flex-wrap gap-8 p-8">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">Tooltip on top</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">Tooltip on left</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">Tooltip on right</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}

export const FieldHint = {
  name: 'Field with Help Icon',
  render: () => (
    <TooltipProvider>
      <div className="flex flex-col gap-3 max-w-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="price-formula">Price Formula</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="size-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                Price = (Base Cost × Qty) + Shipping
              </TooltipContent>
            </Tooltip>
          </div>
          <Input id="price-formula" placeholder="Enter base cost" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="rules-count">Pricing Rules</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="size-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                Number of rules in this configuration
              </TooltipContent>
            </Tooltip>
          </div>
          <Input id="rules-count" placeholder="e.g. 47" />
        </div>
      </div>
    </TooltipProvider>
  ),
}

export const LongContent = {
  name: 'Long Content / Wrapping',
  render: () => (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="size-5 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>Logic Items are calculated values derived from system inputs. They control workflow rules and conditions in the configuration layer.</p>
          </TooltipContent>
        </Tooltip>
        <span className="text-sm text-muted-foreground">Complex field description available on hover/focus</span>
      </div>
    </TooltipProvider>
  ),
}

export const WithArrow = {
  name: 'With Arrow Pointer',
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">With Arrow</Button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={10}>
            <div className="flex gap-2">
              <span>Tooltip with arrow</span>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Without Arrow</Button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={10} hideArrow>
            Tooltip without arrow
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}

export const RuleHint = {
  name: 'Rule Hint (Logic Builder)',
  render: () => (
    <TooltipProvider>
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground mb-3">From Configure One's AI Logic Builder: hover over rules to see what they validate</p>
        <div className="flex items-center gap-2 p-2 border rounded bg-muted/30">
          <span className="text-sm font-medium">Jet Layout Validation</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="size-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="right">
              Validates jet configuration type
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded bg-muted/30">
          <span className="text-sm font-medium">Pressure Threshold Check</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="size-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="right">
              Ensures operating pressure is within safe limits
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded bg-muted/30">
          <span className="text-sm font-medium">Material Compatibility</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="size-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="right">
              Validates material matches configuration requirements
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  ),
}
