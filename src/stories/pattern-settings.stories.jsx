import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default {
  title: 'Design patterns/Layout & Content/Settings',
  parameters: {
    docs: { description: { component: '**Missing** · High priority. Consistent settings layout: section headers, toggle rows with label + description, save/cancel footer. Without a standard, every product\'s settings page diverges.' } },
  },
}

const rows = [
  ['Email on quote approval', 'Notify me when a quote I created is approved', true],
  ['SMS alerts', 'Receive text messages for urgent updates', false],
  ['Weekly digest', 'Summary of activity every Monday', true],
]

export const Default = {
  render: () => (
    <Card className="w-[28rem]">
      <CardHeader><CardTitle className="text-sm">Notifications</CardTitle></CardHeader>
      <CardContent className="flex flex-col gap-0 p-0">
        {rows.map(([label, desc, on], i) => (
          <div key={label}>
            {i > 0 && <Separator />}
            <div className="flex items-center justify-between px-6 py-3">
              <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
              <Switch defaultChecked={on} />
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  ),
}
