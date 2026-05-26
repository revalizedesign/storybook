import { Progress } from '@/components/ui/progress'

export default {
  title: 'shadcn/Progress',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/progress">Progress - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="w-64 flex flex-col gap-4">
      <Progress value={33} />
      <Progress value={66} />
      <Progress value={100} />
    </div>
  ),
}
