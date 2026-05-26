import { Separator } from '@/components/ui/separator'

export default {
  title: 'shadcn/Separator',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/separator">Separator - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="w-64">
      <div className="text-sm">Above</div>
      <Separator className="my-4" />
      <div className="text-sm">Below</div>
    </div>
  ),
}
