import { DirectionProvider } from '@/components/ui/direction'

export default {
  title: 'shadcn/Direction',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/direction">Direction - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <DirectionProvider direction="ltr">
      <p className="text-sm text-muted-foreground">DirectionProvider wraps your app to set text direction (ltr/rtl).</p>
    </DirectionProvider>
  ),
}
