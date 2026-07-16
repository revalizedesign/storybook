import { cn } from '@/lib/utils'

export function StoryPage({ children, className }) {
  return (
    <div className={cn('flex h-screen bg-muted p-6', className)}>
      {children}
    </div>
  )
}
