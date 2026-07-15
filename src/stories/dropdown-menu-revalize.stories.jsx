import { expect, userEvent, waitFor, within } from 'storybook/test'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Fa } from '@/components/Fa'
import data from './dropdown-menu-revalize.json'

// Revalize variants for Dropdown Menu, using the shadcn/base-ui primitive directly (no wrapper needed).
export default {
  title: 'Revalize/Dropdown Menu',
  component: DropdownMenu,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component: `**When to use:** A set of actions on an item (Edit, Duplicate, Archive) triggered from a button or icon — the menu closes after one choice, and nothing it does is a form value.

**When not to use:** Choosing a value for a form field (status, category, assignee) — use \`Select\` instead. The tell: if the chosen value needs to be submitted, stored, or shown back to the user as the current state, it's a Select. If choosing it just fires an action, it's a Dropdown Menu.

**Rules:**
- Composition is \`DropdownMenu\` > \`DropdownMenuTrigger\` > \`DropdownMenuContent\` > \`DropdownMenuItem\`.
- Use \`DropdownMenuSeparator\` and \`DropdownMenuLabel\` to group related actions — don't let an unrelated list of actions run together.
- Mark destructive actions with \`variant="destructive"\` on \`DropdownMenuItem\`, and place them last, after a separator.`,
      },
    },
  },
}

export const Default = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithIcons = {
  name: 'With icons',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem><Fa name="pen" /> Edit</DropdownMenuItem>
        <DropdownMenuItem><Fa name="copy" /> Duplicate</DropdownMenuItem>
        <DropdownMenuItem><Fa name="download" variant="solid" /> Export</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithDestructiveItem = {
  name: 'With destructive item',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem><Fa name="pen" /> Edit</DropdownMenuItem>
        <DropdownMenuItem><Fa name="copy" /> Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive"><Fa name="trash-can" /> Archive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithSubSections = {
  name: 'With sub-sections',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Edit</DropdownMenuLabel>
        <DropdownMenuItem><Fa name="pen" /> Rename</DropdownMenuItem>
        <DropdownMenuItem><Fa name="copy" /> Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Share</DropdownMenuLabel>
        <DropdownMenuItem><Fa name="download" variant="solid" /> Export</DropdownMenuItem>
        <DropdownMenuItem><Fa name="link" /> Copy link</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive"><Fa name="trash-can" /> Archive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// FlowIQ product lines table — row actions opened from a trailing "more" button. Clicking an item
// fires a callback and closes the menu, the two things a Dropdown Menu must always do.
export const ProductLineRowActions = {
  name: 'Product line row actions',
  render: () => {
    const row = data.productLineRowActions.rows[0]
    return (
      <div className="flex items-center justify-between rounded-lg border p-3 pl-4">
        <span className="font-medium">{row.name}</span>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={`Actions for ${row.name}`} />}>
            <Fa name="ellipsis" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><Fa name="pen" /> Edit</DropdownMenuItem>
            <DropdownMenuItem><Fa name="copy" /> Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive"><Fa name="trash-can" /> Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const row = data.productLineRowActions.rows[0]
    const trigger = canvas.getByRole('button', { name: `Actions for ${row.name}` })

    await userEvent.click(trigger)
    const menu = await within(document.body).findByRole('menu')
    const edit = within(menu).getByRole('menuitem', { name: 'Edit' })

    await userEvent.click(edit)
    await waitFor(() => expect(within(document.body).queryByRole('menu')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
}
