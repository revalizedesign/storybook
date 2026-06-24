import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Alert Dialog',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/alert-dialog">Alert Dialog - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**AlertDialog for destructive/irreversible actions only.**

**Pattern (NEVER "Are you sure?"):**
- Title = action verb (Delete, Remove, Archive) — not a question
- Body = specific item + exact impact + "This action cannot be undone"
- Layout: Cancel (left, outline) + Destructive (right, red)

**Examples:**
- Delete Configuration → "This permanently removes the Hydro-Pro Series configuration including all 47 pricing rules and linked quotes"
- Remove User → "This removes john@company.com from the Sales team and revokes all access"
- Archive Project → "This marks the project as archived. You can unarchive it later"

**Accessibility:**
- Title is action-specific (not "Are you sure?")
- Description includes consequences
- Buttons: Cancel (outline, left), Destructive (red, right)
- Use aria-label if needed for complex actions

**When NOT to use:**
- Reversible actions → Use regular Dialog instead
- Confirmations without impact → Too heavy
- Uncertain if it's destructive → Ask user to be sure`,
          Matt: `Largely aligns with ShadCN defaults, which is appropriate for this pattern. Current implementation feels familiar and predictable.

**Observations:** Little differentiation from the underlying primitive. No significant concerns with the current direction.

**Roadmap:** Continue using as a thin abstraction over the primitive. Add more product-specific examples as workflows mature.`,
        },
      }),
    },
  },
}

export const DeleteConfiguration = {
  name: 'Delete Configuration',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>Delete Configuration</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Configuration</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes the <strong>Hydro-Pro Series</strong> configuration
            including all 47 pricing rules and 12 linked quotes. All quotes using this
            configuration will be affected. <strong>This action cannot be undone.</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-2 justify-end pt-4">
          <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
          <AlertDialogAction render={<Button variant="destructive" />}>Delete Configuration</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const RemoveUser = {
  name: 'Remove User',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>Remove User</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove User</AlertDialogTitle>
          <AlertDialogDescription>
            This removes <strong>john@company.com</strong> from the Sales team and revokes all access
            to product configurations and pricing data. They will receive a notification of their removal.
            <strong> This action cannot be undone.</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-2 justify-end pt-4">
          <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
          <AlertDialogAction render={<Button variant="destructive" />}>Remove User</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const ArchiveProject = {
  name: 'Archive Project',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>Archive Project</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive Project</AlertDialogTitle>
          <AlertDialogDescription>
            This marks the <strong>Acme Manufacturing Q4 2026</strong> project as archived.
            The project will no longer appear in active lists, but you can unarchive it later
            from the archived projects section. <strong>This action can be undone.</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-2 justify-end pt-4">
          <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
          <AlertDialogAction render={<Button variant="destructive" />}>Archive Project</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const PermanentDelete = {
  name: 'Permanent Delete',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" size="lg" />}>Permanently Delete All Data</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Permanently Delete All Data</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently deletes all configurations, quotes, and historical data from this account.
            This includes:
            <ul className="mt-2 ml-4 list-disc space-y-1">
              <li>All 1,247 configurations</li>
              <li>All 5,892 quotes and their history</li>
              <li>All pricing rules and templates</li>
            </ul>
            <strong>This action cannot be undone and cannot be recovered.</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-2 justify-end pt-4">
          <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
          <AlertDialogAction render={<Button variant="destructive" />}>Permanently Delete</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  ),
}
