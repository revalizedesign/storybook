import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Fa } from '@/components/Fa'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default {
  title: 'Experiments/Detail panel',
  parameters: {
    docs: {
      description: {
        component:
          'Right-side slide-in detail panel from c1c-admin (`renderDetail` / `buildDetailContent` → `buildFileDetail`). Shows a selected file record: header with title + close, a summary, document stats, and model estimates. Narrow variant for file details.',
      },
    },
  },
}

// Adapted from demo-cyclo-6000.json (a `pdf` file record + its assessment).
const file = {
  modified: '2026-05-06',
  name: 'cyclo_6000_o_and_m_v7_web.pdf',
  owner: 'Agent',
  size: '5.7 mb',
  status: 'Analyzed',
  type: 'pdf',
  summary:
    'Gearmotor/reducer product with structured nomenclature breakdown. Configurable dimensions include output shaft orientation, housing style, motor capacity, frame size, ratio, and brake option. Strong candidate for automated model generation.',
  stats: [['Pages', 102], ['Tokens', '~45,000'], ['Tables', 18], ['Figures', 24]],
  estimates: [['inputs', '~11'], ['input values', '~120'], ['attributes', '15–20'], ['bom nodes', '50+'], ['logic items', '3–4']],
}

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-4 py-1 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground">{value}</span>
  </div>
)

export const Default = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open detail</SheetTrigger>
      <SheetContent showCloseButton={false} className="w-[28rem] sm:max-w-[28rem] gap-0 p-0">
        <SheetHeader className="flex-row items-center justify-between border-b">
          <div className="flex items-center gap-2 min-w-0">
            <Fa name="file-pdf" variant="solid" className="text-muted-foreground" />
            <SheetTitle className="truncate">{file.name}</SheetTitle>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="Close">
            <Fa name="xmark" variant="solid" />
          </Button>
          <SheetDescription className="sr-only">Details for {file.name}</SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="details" className="flex-1 overflow-hidden">
          <TabsList className="mx-4 mt-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="flex flex-col gap-3 overflow-y-auto p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">PDF · {file.size}</span>
              <Badge variant="secondary">{file.status}</Badge>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{file.summary}</p>
            <Separator />
            <div>
              <b className="text-sm tracking-tight">Document stats</b>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {file.stats.map(([label, value]) => (
                  <div className="flex flex-col gap-0.5" key={label}>
                    <span className="text-sm font-semibold text-foreground">{value}</span>
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <b className="text-sm tracking-tight">Model estimates</b>
              <div className="mt-2">
                {file.estimates.map(([label, value]) => (
                  <div className="flex justify-between border-t py-1 text-sm first:border-t-0" key={label}>
                    <span className="capitalize text-foreground">{label}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="activity" className="flex flex-col gap-2 overflow-y-auto p-4">
            <Row label="Owner" value={file.owner} />
            <Row label="Modified" value={file.modified} />
            <Row label="Type" value="Markdown · PDF" />
            <Row label="Size" value={file.size} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  ),
}
