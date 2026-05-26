import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export default {
  title: 'shadcn/Sheet',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/sheet">Sheet - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open Sheet</Button></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet description here.</SheetDescription>
        </SheetHeader>
        <div className="p-4">Sheet body content.</div>
      </SheetContent>
    </Sheet>
  ),
}
