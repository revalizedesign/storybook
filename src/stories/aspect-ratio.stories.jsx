import { AspectRatio } from '@/components/ui/aspect-ratio'

export default {
  title: 'shadcn/Aspect Ratio',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/aspect-ratio">Aspect Ratio - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="w-64">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-muted-foreground">16:9</div>
      </AspectRatio>
    </div>
  ),
}
