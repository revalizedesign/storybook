import { TriangleAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function DoNotUse({ href, label }) {
  return (
    <Alert>
      <TriangleAlert />
      <AlertTitle>Do not use directly</AlertTitle>
      <AlertDescription>This is a shadcn primitive. In the Revalize design system, use <a href={href} className="underline">{label}</a> instead.</AlertDescription>
    </Alert>
  )
}
