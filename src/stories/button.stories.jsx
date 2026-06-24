import { Button } from '@/components/ui/button'
import { Loader2, Plus, Trash2, ExternalLink } from 'lucide-react'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Button',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/button">Button - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**Usage:** Primary interactive element for user actions. Use for form submission, navigation, and primary operations.

**Visual Rules:**
- Primary buttons: Brand color background
- Default size: medium (md)
- Never mix icon + long text without explicit layout
- Button width should fit content naturally; avoid stretching to full width unless in action groups
- Icon-only buttons must have accessible label via aria-label or tooltip

**Variants:**
- **Primary** (default): Brand color background. Use for main CTA (primary action per page)
- **Secondary**: Gray background. Use for secondary actions (Cancel, Save as Draft)
- **Outline**: Transparent with border. Use for alternative actions
- **Ghost**: Transparent background. Use for tertiary/minimal actions
- **Destructive**: Red background. Use for delete/remove actions (warning required)
- **Link**: Styled as hyperlink. Use sparingly; prefer standard links for navigation

**Sizes** (height, padding, font):
- **xs** (24px): Inline actions, compact spaces (e.g., table row actions)
- **sm** (32px): Secondary forms, dense layouts
- **md** (40px): Default, recommended for most forms
- **lg** (48px): Primary CTAs, high-visibility actions
- **xl** (56px): Landing pages, featured actions

**States:**
1. **Default**: Ready to interact
2. **Hover**: Slightly darker, cursor pointer
3. **Focus**: Ring outline, keyboard navigation
4. **Active/Pressed**: Darkest shade
5. **Disabled**: Gray, no pointer, no hover effect
6. **Loading**: Spinner overlays text, click disabled

**Icon Usage:**
- Icon-only: Must have aria-label
- Icon + Text: Icon before text, 8px gap
- Icon after text: Rare (e.g., external link icon)
- Prevent text + icon when text is single word (use icon-only instead)

**Accessibility:**
- Keyboard: Tab (focus), Enter/Space (activate)
- Screen readers: aria-label for icon-only buttons
- Disabled state: aria-disabled="true"
- Loading state: aria-busy="true" if fetching

**Product Examples:**
- ConfigureOne: "Save Configuration", "Create Quote", "Export" buttons
- PROCAD: "Add Part", "Delete Assembly", "Save" buttons
- SpecPage: "Generate Spec", "Update Formula" buttons`,
        },
      }),
    },
  },
}

export const Default = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center gap-2">
        <Button size="xs">Extra Small</Button>
        <span className="text-xs text-muted-foreground">24px - Table actions, compact</span>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm">Small</Button>
        <span className="text-xs text-muted-foreground">32px - Secondary forms</span>
      </div>
      <div className="flex items-center gap-2">
        <Button size="md">Medium</Button>
        <span className="text-xs text-muted-foreground">40px - Default, recommended</span>
      </div>
      <div className="flex items-center gap-2">
        <Button size="lg">Large</Button>
        <span className="text-xs text-muted-foreground">48px - Primary CTAs</span>
      </div>
      <div className="flex items-center gap-2">
        <Button size="xl">Extra Large</Button>
        <span className="text-xs text-muted-foreground">56px - Landing pages</span>
      </div>
    </div>
  ),
}

export const States = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div>
        <h3 className="text-sm font-semibold mb-2">Normal State</h3>
        <Button>Ready to interact</Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Hover State (hover over button)</h3>
        <Button>Hover for darker color</Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Focus State (Tab to button)</h3>
        <Button autoFocus>Focus shows ring</Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Disabled State</h3>
        <Button disabled>Cannot interact</Button>
      </div>
    </div>
  ),
}

export const Loading = {
  render: () => (
    <div className="flex gap-3 items-center">
      <Button disabled>
        <Loader2 className="animate-spin mr-2 h-4 w-4" />
        Loading...
      </Button>
      <Button variant="secondary" disabled>
        <Loader2 className="animate-spin mr-2 h-4 w-4" />
        Processing
      </Button>
    </div>
  ),
}

export const IconOnly = {
  render: () => (
    <div className="flex gap-3">
      <Button size="icon" aria-label="Add new">
        <Plus className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="destructive" aria-label="Delete">
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline" aria-label="Open in new tab">
        <ExternalLink className="h-4 w-4" />
      </Button>
    </div>
  ),
}

export const WithIcon = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
        <span className="text-xs text-muted-foreground">Icon before text</span>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="outline">
          Learn More
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
        <span className="text-xs text-muted-foreground">Icon after text (rare)</span>
      </div>
    </div>
  ),
}

export const ActionGroup = {
  render: () => (
    <div className="flex gap-2 justify-end border rounded-lg p-4 bg-muted/30">
      <Button variant="outline">Cancel</Button>
      <Button variant="secondary">Save as Draft</Button>
      <Button>Save Configuration</Button>
    </div>
  ),
}
