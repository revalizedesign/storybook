import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default {
  title: 'Design patterns/Layout & Content/Detail drawer',
  parameters: {
    docs: { description: { component: '**Missing · New** · Critical priority. Revalize uses drawers instead of modals (Kiana, 05/27). Slides from the right, keeps list context visible. ~400–480px, tabs for Details / Pricing / Activity, edit inline, close with X or click-outside.' } },
  },
}

export const Default = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open Hydro-Pro Series</Button></SheetTrigger>
      <SheetContent className="w-[28rem] sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Hydro-Pro Series</SheetTitle>
          <SheetDescription>ID: HPR-001</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="flex flex-col gap-3 pt-3">
              <div className="text-sm text-muted-foreground">Status</div>
              <Badge variant="secondary" className="w-fit">Active</Badge>
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">Edit</Button>
                <Button size="sm" variant="outline" className="flex-1">Archive</Button>
              </div>
            </TabsContent>
            <TabsContent value="pricing" className="pt-3 text-sm text-muted-foreground">47 pricing rules</TabsContent>
            <TabsContent value="activity" className="pt-3 text-sm text-muted-foreground">See Audit trail pattern</TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  ),
}
