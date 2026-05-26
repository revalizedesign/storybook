import { Input } from '@/components/ui/input'

export default {
  title: 'shadcn/Input',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/input">Input - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <Input placeholder="Default" />
      <Input disabled placeholder="Disabled" />
      <Input type="password" placeholder="Password" />
    </div>
  ),
}
