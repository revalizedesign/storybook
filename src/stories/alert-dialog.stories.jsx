import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Alert Dialog',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/alert-dialog">Alert Dialog - shadcn/ui</a>' },
      page: createDocsPage(),
    },
  },
}

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Jonathan: Defined · Critical priority. AlertDialog for destructive/irreversible actions. Title = action verb, body = exact impact + "cannot be undone", Cancel left + destructive action right. Never "Are you sure?"',
      },
    },
  },
  render: () => (
    <div className="flex gap-4">
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline" />}>Confirm action</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
            <AlertDialogAction render={<Button />}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline" className="text-destructive" />}>Delete configuration</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product configuration?</AlertDialogTitle>
            <AlertDialogDescription>This permanently removes the <strong>Hydro-Pro Series</strong> configuration including all 47 pricing rules and 12 linked quotes. This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
            <AlertDialogAction render={<Button variant="destructive" />}>Delete configuration</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ),
}
