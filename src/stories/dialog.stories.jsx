import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Dialog',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/dialog">Dialog - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**Dialog for content that requires user focus/action.**

**Use Dialog when:**
- Showing a form that needs submission
- Requesting confirmation before action
- Displaying additional details/options
- Editing inline data
- Long-form content (scrollable)

**Use Drawer/Sheet instead when:**
- Content slides in from side (Drawer)
- Dismissible non-critical info (Sheet)
- Mobile-first designs (Sheet responsiveness)

**Pattern:**
- Title (clear action/context)
- Description (optional - brief explanation)
- Body (form, content, details)
- Footer (actions: Cancel/Save or specific actions)
- Close button (X or cancel button)

**Accessibility:**
- Focus trap inside dialog
- Escape key dismisses
- aria-modal="true"
- aria-labelledby for title
- aria-describedby for description

**Product Examples:**
- ConfigureOne: Edit configuration dialog
- PROCAD: Create part dialog with form
- SpecPage: Add formula dialog with inputs`,
        },
      }),
    },
  },
}

export const Default = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>This is a dialog description.</DialogDescription>
        </DialogHeader>
        <p>Dialog body content.</p>
        <DialogFooter showCloseButton>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const WithForm = {
  name: 'With Form',
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Create Configuration</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Configuration</DialogTitle>
          <DialogDescription>
            Define a new product configuration for your quotes.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="config-name">Configuration Name *</Label>
            <Input id="config-name" placeholder="e.g., Solar Pro Series" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="config-desc">Description</Label>
            <Input id="config-desc" placeholder="Brief description" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="config-rules">Number of Pricing Rules *</Label>
            <Input id="config-rules" type="number" placeholder="0" />
          </div>
        </form>
        <DialogFooter>
          <DialogTrigger render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit">Create Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const WithLongContent = {
  name: 'With Long Content',
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">View Details</Button>} />
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configuration Details</DialogTitle>
          <DialogDescription>
            Full details of the Hydro-Pro Series configuration
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Pricing Rules (47)</h4>
            <div className="space-y-2 text-sm">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="p-2 border rounded">
                  Rule {i + 1}: Base price × multiplier based on options
                </div>
              ))}
              <p className="text-muted-foreground">...and 37 more rules</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Linked Quotes</h4>
            <p className="text-sm text-muted-foreground">
              12 active quotes use this configuration
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Last Modified</h4>
            <p className="text-sm">June 28, 2026 at 2:53 PM by Jonathan Pacheco</p>
          </div>
        </div>
        <DialogFooter showCloseButton>
          <Button variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const EditDialog = {
  name: 'Edit Dialog',
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Edit Configuration</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Configuration</DialogTitle>
          <DialogDescription>
            Update the Hydro-Pro Series configuration details.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Configuration Name</Label>
            <Input id="edit-name" defaultValue="Hydro-Pro Series" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-desc">Description</Label>
            <Input id="edit-desc" defaultValue="Professional hydro configuration with 47 pricing rules" />
          </div>
        </form>
        <DialogFooter>
          <DialogTrigger render={<Button variant="outline">Cancel</Button>} />
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
