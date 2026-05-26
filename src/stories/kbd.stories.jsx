import { Kbd } from '@/components/ui/kbd'

export default {
  title: 'shadcn/Kbd',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/kbd">Kbd - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex gap-2">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  ),
}
