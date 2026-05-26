import { Skeleton } from '@/components/ui/skeleton'

export default {
  title: 'shadcn/Skeleton',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/skeleton">Skeleton - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  ),
}
