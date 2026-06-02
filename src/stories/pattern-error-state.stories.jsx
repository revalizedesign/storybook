import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, AlertCircle } from 'lucide-react'

export default {
  title: 'Design patterns/Feedback & Status/Error state',
  parameters: {
    docs: { description: { component: '**Defined** · Critical. Red = blocking error (action failed), amber = warning (partial success). Always say what failed + why + what to do, with a retry/fix action. Never "Something went wrong" alone.' } },
  },
}

export const Default = {
  render: () => (
    <div className="w-[28rem] flex flex-col gap-4">
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Failed to load pricing data</AlertTitle>
        <AlertDescription>Connection timed out after 30s. Check your network and <a href="#" className="underline">retry</a>.</AlertDescription>
      </Alert>
      <Alert className="border-amber-300 text-amber-800 [&>svg]:text-amber-600">
        <AlertTriangle />
        <AlertTitle>Import partially completed</AlertTitle>
        <AlertDescription>47 of 50 rows imported. 3 skipped (duplicate part numbers). <a href="#" className="underline">View errors</a></AlertDescription>
      </Alert>
    </div>
  ),
}
