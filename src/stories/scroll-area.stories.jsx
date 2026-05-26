import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default {
  title: 'shadcn/Scroll Area',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/scroll-area">Scroll Area - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <ScrollArea className="h-48 w-48 rounded-lg border p-4">
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i}>
          <div className="text-sm py-1">Item {i + 1}</div>
          {i < 19 && <Separator />}
        </div>
      ))}
    </ScrollArea>
  ),
}
