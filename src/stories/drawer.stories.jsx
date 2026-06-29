import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Drawer',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/drawer">Drawer - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**Drawer (Side Sheet) for sliding side content.**

**Use Drawer when:**
- Secondary panel with details
- Slide-over workflow (filters, settings)
- Non-modal secondary content
- Mobile-responsive panels (swipe to dismiss)
- Detail view for selected item

**Use Dialog instead when:**
- Primary user action needed
- Form submission required
- Modal behavior (blocking)
- Desktop-only content

**Position:**
- Default: Right side (most common)
- Alternative: Left side (navigation, filters)
- Top/Bottom: Rare (use Sheet instead)

**Pattern:**
- Minimal header (title, optional description)
- Body content
- Footer (actions optional, close always available)
- Swipe down to dismiss (mobile)

**Accessibility:**
- Focus trap (optional, depends on modality)
- Escape key dismisses
- Swipe gesture (mobile)
- aria-modal per usage

**Product Examples:**
- ConfigureOne: Details side panel for configurations
- PROCAD: Part details drawer when selecting items
- SpecPage: Formula editor side panel`,
        },
      }),
    },
  },
}

export const Default = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild><Button variant="outline">Open Drawer</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>Drawer description here.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">Drawer body content.</div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const SidePanel = {
  name: 'Configuration Details Panel',
  render: () => (
    <Drawer>
      <DrawerTrigger asChild><Button variant="outline">View Details</Button></DrawerTrigger>
      <DrawerContent className="max-w-md">
        <DrawerHeader>
          <DrawerTitle>Hydro-Pro Series</DrawerTitle>
          <DrawerDescription>Configuration details and actions</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 p-4">
          <div>
            <p className="text-sm font-medium mb-1">Status</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Pricing Rules</p>
            <p className="text-sm text-muted-foreground">47 rules configured</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Linked Quotes</p>
            <p className="text-sm text-muted-foreground">12 active quotes</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Last Modified</p>
            <p className="text-sm text-muted-foreground">June 28, 2026</p>
          </div>
        </div>
        <DrawerFooter>
          <Button variant="outline" size="sm">Edit</Button>
          <DrawerClose asChild><Button variant="outline" size="sm">Close</Button></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const FilterDrawer = {
  name: 'Filter Drawer',
  render: () => (
    <Drawer>
      <DrawerTrigger asChild><Button variant="outline">Filters</Button></DrawerTrigger>
      <DrawerContent className="max-w-xs">
        <DrawerHeader>
          <DrawerTitle>Filter Configurations</DrawerTitle>
        </DrawerHeader>
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select id="status" className="w-full border rounded px-2 py-1 text-sm">
              <option>All</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rules">Min Pricing Rules</Label>
            <Input id="rules" type="number" placeholder="0" />
          </div>
        </div>
        <DrawerFooter>
          <Button variant="outline" size="sm">Reset</Button>
          <Button size="sm">Apply Filters</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const EditDrawer = {
  name: 'Edit in Drawer',
  render: () => (
    <Drawer>
      <DrawerTrigger asChild><Button>Edit Configuration</Button></DrawerTrigger>
      <DrawerContent className="max-w-md">
        <DrawerHeader>
          <DrawerTitle>Edit Configuration</DrawerTitle>
          <DrawerDescription>Update configuration details</DrawerDescription>
        </DrawerHeader>
        <form className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Hydro-Pro Series" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Input id="desc" defaultValue="Professional hydro configuration" />
          </div>
        </form>
        <DrawerFooter>
          <DrawerClose asChild><Button variant="outline" size="sm">Cancel</Button></DrawerClose>
          <Button size="sm">Save Changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
