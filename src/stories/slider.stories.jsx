import { Slider } from '@/components/ui/slider'

export default {
  title: 'shadcn/Slider',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/slider">Slider - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Slider defaultValue={[50]} max={100} step={1} className="w-64" />
  ),
}
