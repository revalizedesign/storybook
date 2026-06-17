import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { InfoIcon, AlertTriangle } from 'lucide-react'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Alert',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/alert">Alert - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `Red = blocking error (action failed), amber = warning (partial success). Always say what failed + why + what to do, with a retry/fix action. Never "Something went wrong" alone.`,
          Matt: `Current implementation is serviceable and closely follows ShadCN conventions.

**Observations:** Warning / partial-success amber state feels visually noisy and could benefit from refinement. Not currently a priority for design investment.

**Roadmap:** Revisit alert severity hierarchy after broader system adoption. Validate color semantics against real product usage.`,
        },
      }),
    },
  },
}

export const Default = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Alert>
        <InfoIcon />
        <AlertTitle>Default alert</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <InfoIcon />
        <AlertTitle>Destructive alert</AlertTitle>
        <AlertDescription>Something went wrong. Check your network and <a href="#" className="underline">retry</a>.</AlertDescription>
      </Alert>
      <Alert className="border-amber-300 text-amber-800 [&>svg]:text-amber-600">
        <AlertTriangle />
        <AlertTitle>Import partially completed</AlertTitle>
        <AlertDescription>47 of 50 rows imported. 3 skipped (duplicate part numbers). <a href="#" className="underline">View errors</a></AlertDescription>
      </Alert>
    </div>
  ),
}
