import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default {
  title: 'shadcn/Dialog',
  parameters: {
    docs: {
      description: {
        component: `<a href="https://ui.shadcn.com/docs/components/base/dialog">Dialog - shadcn/ui</a>

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

**Composition:**
- **Dialog** — Root component
- **DialogTrigger** — Button that opens the dialog
- **DialogContent** — The overlay panel
- **DialogHeader** — Title and description area
- **DialogTitle** — Heading text
- **DialogDescription** — Supporting text
- **DialogFooter** — Actions pinned to the bottom

**Also available:** DialogClose, DialogOverlay, DialogPortal

**Improvements:**
- \`DialogTitle\` is missing \`text-base\` — add \`[&_[data-slot=dialog-title]]:text-base\` to \`DialogContent\`
- \`DialogContent\` has no \`max-height\` — add \`max-h-[calc(100vh-2rem)]\` to prevent viewport overflow`,
      },
    },
  },
}

export const Default = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Edit Profile</DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] [&_[data-slot=dialog-title]]:text-base">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input defaultValue="Pedro Duarte" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Username</Label>
            <Input defaultValue="@peduarte" />
          </div>
        </div>
        <DialogFooter className="-mx-6 -mb-6 rounded-b-xl border-t bg-muted/50 p-6">
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const StickyFooter = {
  name: 'Sticky footer',
  args: { boxed: false },
  argTypes: { boxed: { control: 'boolean' } },
  render: ({ boxed }) => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Sticky Footer</DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] [&_[data-slot=dialog-title]]:text-base">
        <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>This dialog has a sticky footer that stays visible while the content scrolls.</DialogDescription>
        </DialogHeader>
        <div className="-mx-6 no-scrollbar max-h-[50vh] overflow-y-auto px-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          ))}
        </div>
        <DialogFooter className={boxed ? '-mx-6 -mb-6 rounded-b-xl border-t bg-muted/50 p-6' : ''}>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const ScrollableContent = {
  name: 'Scrollable content',
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Scrollable Content</DialogTrigger>
      <DialogContent className="flex max-h-[calc(100vh-2rem)] flex-col [&_[data-slot=dialog-title]]:text-base">
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>Long content can scroll while the header stays in view.</DialogDescription>
        </DialogHeader>
        <div className="-mx-4 flex-1 overflow-y-auto px-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  ),
}
