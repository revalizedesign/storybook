import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'

export default {
  title: 'shadcn/Collapsible',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/collapsible">Collapsible - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Collapsible className="w-80">
      <CollapsibleTrigger render={<Button variant="outline" className="w-full justify-between" />}>Toggle content</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-lg border p-4 mt-2">Hidden content revealed.</div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
