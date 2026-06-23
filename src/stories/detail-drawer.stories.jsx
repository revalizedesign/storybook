import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Fa } from '@/components/Fa'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default {
  title: 'Layout/Detail drawer',
  parameters: {
    docs: {
      description: {
        component: `**Jonathan:** Revalize uses drawers instead of modals (Kiana, 05/27). Slides from the right, keeps list context visible. ~400–480px, tabs for Details / Pricing / Activity, edit inline, close with X or click-outside.`,
      },
    },
  },
}

export const Candidates = {
  name: 'Candidates (review)',
  parameters: {
    docs: {
      description: {
        story: 'Existing detail drawer implementations to evaluate for consolidation.',
      },
    },
  },
  render: () => (
    <div className="flex gap-4">
      <Sheet>
        <SheetTrigger asChild><Button variant="outline">Jonathan — product detail</Button></SheetTrigger>
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
                <div className="text-muted-foreground">Status</div>
                <Badge variant="secondary" className="w-fit">Active</Badge>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">Edit</Button>
                  <Button size="sm" variant="outline" className="flex-1">Archive</Button>
                </div>
              </TabsContent>
              <TabsContent value="pricing" className="pt-3 text-muted-foreground">47 pricing rules</TabsContent>
              <TabsContent value="activity" className="pt-3 text-muted-foreground">See audit trail on Item</TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>c1c-admin — file detail</SheetTrigger>
        <SheetContent showCloseButton={false} className="w-[28rem] sm:max-w-[28rem] gap-0 p-0">
          <SheetHeader className="flex-row items-center justify-between border-b">
            <div className="flex items-center gap-2 min-w-0">
              <Fa name="file-pdf" variant="solid" className="text-muted-foreground" />
              <SheetTitle className="truncate">cyclo_6000_o_and_m_v7_web.pdf</SheetTitle>
            </div>
            <Button variant="ghost" size="icon-sm" aria-label="Close">
              <Fa name="xmark" variant="solid" />
            </Button>
            <SheetDescription className="sr-only">Details for cyclo_6000_o_and_m_v7_web.pdf</SheetDescription>
          </SheetHeader>
          <Tabs defaultValue="details" className="flex-1 overflow-hidden">
            <TabsList className="mx-4 mt-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="flex flex-col gap-3 overflow-y-auto p-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">PDF · 5.7 mb</span>
                <Badge variant="secondary">Analyzed</Badge>
              </div>
              <p className="leading-relaxed text-muted-foreground">Gearmotor/reducer product with structured nomenclature breakdown. Configurable dimensions include output shaft orientation, housing style, motor capacity, frame size, ratio, and brake option.</p>
              <Separator />
              <div>
                <b className="tracking-tight">Document stats</b>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {[['Pages', 102], ['Tokens', '~45,000'], ['Tables', 18], ['Figures', 24]].map(([label, value]) => (
                    <div className="flex flex-col gap-0.5" key={label}>
                      <span className="font-semibold">{value}</span>
                      <span className="text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <b className="tracking-tight">Model estimates</b>
                <div className="mt-2">
                  {[['inputs', '~11'], ['input values', '~120'], ['attributes', '15–20'], ['bom nodes', '50+'], ['logic items', '3–4']].map(([label, value]) => (
                    <div className="flex justify-between border-t py-1 first:border-t-0" key={label}>
                      <span className="capitalize">{label}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="activity" className="flex flex-col gap-2 overflow-y-auto p-4">
              {[['Owner', 'Agent'], ['Modified', '2026-05-06'], ['Type', 'Markdown · PDF'], ['Size', '5.7 mb']].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-1">
                  <span className="text-muted-foreground">{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  ),
}
