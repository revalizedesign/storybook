import { expect, userEvent, waitFor, within } from 'storybook/test'
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import data from './drawer-revalize.json'

// Revalize variants for Drawer, using the shadcn/vaul primitive directly (no wrapper needed). Each
// story is a real production content type, kept short — just enough to show the shape of real usage.
export default {
  title: 'Revalize/Drawer',
  component: Drawer,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component: `**When to use:**
- Quick view or edit of a record while keeping the list/table visible behind (row → details)
- Short, focused forms: a handful of fields (add component, edit product line)
- Contextual side content tied to the current view: notifications, activity, filters

**When not to use:**
- Long or multi-section content that needs its own scroll or sub-navigation — use a full page instead (see decision rule below)
- Blocking decisions or destructive confirmations — use \`AlertDialog\` (or \`Dialog\` for a non-destructive short decision — see Revalize/Dialog)
- Content users need to link to or bookmark — it's a destination, use a page with its own URL
- Never stack a drawer over another drawer — if that's needed, the content outgrew the pattern

**Decision rule — drawer vs. dialog vs. page:**
- Interrupts and demands a short decision → Dialog
- Side task, preserves context, fits one scrollable column → Drawer
- Own sections, long scroll, or deep-linkable → Page`,
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controlled open state. Omit for an uncontrolled drawer driven by its trigger.',
      table: { category: 'Drawer' },
    },
    direction: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Which edge the drawer slides in from.',
      table: { category: 'Drawer', defaultValue: { summary: 'bottom' } },
    },
  },
}

// AutoQuotes product detail panel — read-only key/value rows.
export const ReadOnlyDetails = {
  name: 'Read-only details',
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild><Button variant="outline">{data.readOnlyDetails.title}</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{data.readOnlyDetails.title}</DrawerTitle>
          <DrawerDescription>{data.readOnlyDetails.product}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-2 p-4">
          {data.readOnlyDetails.rows.map(row => (
            <div className="flex justify-between gap-4" key={row.label}>
              <span className="text-muted-foreground">{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild><Button variant="outline">Close</Button></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

// Configure One "Create New Size" — a short create form.
export const CreateForm = {
  name: 'Create form',
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild><Button variant="outline">{data.createForm.title}</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{data.createForm.title}</DrawerTitle>
          <DrawerDescription>{data.createForm.product}</DrawerDescription>
        </DrawerHeader>
        <form className="flex flex-col gap-4 p-4">
          {data.createForm.fields.map(field => (
            <div className="flex flex-col gap-1.5" key={field.id}>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input id={field.id} placeholder={field.placeholder} />
            </div>
          ))}
        </form>
        <DrawerFooter>
          <Button>Create</Button>
          <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

// SpecPage notifications — a short list feed.
export const NotificationFeed = {
  name: 'Notification feed',
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild><Button variant="outline">{data.notificationFeed.title}</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{data.notificationFeed.title}</DrawerTitle>
          <DrawerDescription>{data.notificationFeed.product}</DrawerDescription>
        </DrawerHeader>
        <ul className="flex flex-col gap-3 p-4">
          {data.notificationFeed.items.map(item => (
            <li className="flex flex-col gap-0.5" key={item.text}>
              <span>{item.text}</span>
              <span className="text-muted-foreground">{item.time}</span>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  ),
}

// Configure One "Manage Logic Groups" — a short management list with per-row counts.
export const ManagementList = {
  name: 'Management list',
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild><Button variant="outline">{data.managementList.title}</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{data.managementList.title}</DrawerTitle>
          <DrawerDescription>{data.managementList.product}</DrawerDescription>
        </DrawerHeader>
        <ul className="flex flex-col p-4">
          {data.managementList.groups.map(group => (
            <li className="flex items-center justify-between border-t py-2 first:border-t-0" key={group.name}>
              <span>{group.name}</span>
              <span className="text-muted-foreground">{group.rules} rules</span>
            </li>
          ))}
        </ul>
        <DrawerFooter>
          <DrawerClose asChild><Button variant="outline">Done</Button></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  // The one genuinely fragile drawer behavior: focus is trapped inside while open, and returns to the
  // trigger on close. Everything else (slide animation, overlay) is the primitive's own concern.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: data.managementList.title })

    await userEvent.click(trigger)
    const dialog = await within(document.body).findByRole('dialog')

    // Focus trap: after tabbing, focus stays within the open drawer, never escaping back to the page.
    await userEvent.tab()
    await expect(dialog.contains(document.activeElement)).toBe(true)

    // Close returns focus to the trigger.
    const done = within(dialog).getByRole('button', { name: 'Done' })
    await userEvent.click(done)
    await waitFor(() => expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
}
