import { Progress } from '@/components/ui/progress'
import { RadialProgress } from '@/components/RadialProgress'

export default {
  title: 'shadcn/Progress',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/progress">Progress - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress value={33} />
      <Progress value={66} />
      <Progress value={100} />
    </div>
  ),
}

export const Radial = {
  render: () => (
    <div className="flex items-center gap-6">
      <RadialProgress value={25} label="context" />
      <RadialProgress value={50} label="context" />
      <RadialProgress value={85} label="context" danger />
    </div>
  ),
}
