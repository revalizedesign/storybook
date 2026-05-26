import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { InfoIcon } from 'lucide-react'

export default {
  title: 'shadcn/Alert',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/alert">Alert - shadcn/ui</a>' } },
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
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    </div>
  ),
}
