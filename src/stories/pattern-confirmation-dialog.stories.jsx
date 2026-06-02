import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export default {
  title: 'Design patterns/Feedback & Status/Confirmation dialog',
  parameters: {
    docs: { description: { component: '**Defined** · Critical. AlertDialog for destructive/irreversible actions. Title = action verb, body = exact impact + "cannot be undone", Cancel left + destructive action right. Never "Are you sure?"' } },
  },
}

export const Default = {
  render: () => (
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
  ),
}
