import { expect, userEvent, waitFor, within } from 'storybook/test'
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import data from './dialog-revalize.json'

// Revalize variants for Dialog, using the shadcn/base-ui primitive directly (no wrapper needed).
export default {
  title: 'Revalize/Dialog',
  component: Dialog,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component: `**When to use:** A short, focused interaction that blocks the page until it's resolved — confirm, rename, a small form. Use \`Drawer\` instead when the content is longer or needs scrolling (see Revalize/Drawer for that decision rule).

**Rules:**
- Always dismissible — the \`X\` close button (on by default), \`Escape\`, and a clicking outside all close the dialog.
- For destructive confirmations (archive, delete), use \`AlertDialog\` instead of a plain Dialog — it already documents that pattern (action-verb title, exact impact stated, "cannot be undone", destructive action never labeled "OK"). See shadcn/Alert Dialog.

**Future consideration:** the SpecPage prototype has a \`useConfirm()\` hook (promise-based confirmation, so callers can \`await confirm()\` instead of wiring an open/callback pair by hand). Not built here — worth discussing with Matt before adopting it project-wide.`,
      },
    },
  },
}

export const Default = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>A short description of what this dialog is for.</DialogDescription>
        </DialogHeader>
        <p>Dialog body content.</p>
        <DialogFooter showCloseButton>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// FlowIQ "Rename product line" — a short form, resolved in place without leaving the page.
export const WithForm = {
  name: 'With form',
  render: () => {
    const { title, product, fields } = data.withForm
    return (
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>{title}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{product}</DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4">
            {fields.map(field => (
              <div className="flex flex-col gap-1.5" key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input id={field.id} placeholder={field.placeholder} />
              </div>
            ))}
          </form>
          <DialogFooter>
            <Button>Save</Button>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
  // Open, dismiss, and assert the dialog closes and focus returns to the trigger — the one behavior
  // every dialog must get right regardless of what's inside it. Save is app-wired (submits, then the
  // app decides whether to close); Cancel is what the primitive itself guarantees, so the test exercises that.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const { title } = data.withForm
    const trigger = canvas.getByRole('button', { name: title })

    await userEvent.click(trigger)
    const dialog = await within(document.body).findByRole('dialog')
    const cancel = within(dialog).getByRole('button', { name: 'Cancel' })

    await userEvent.click(cancel)
    await waitFor(() => expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
}
