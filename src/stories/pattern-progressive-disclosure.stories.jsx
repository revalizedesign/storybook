import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default {
  title: 'Design patterns/Navigation/Progressive disclosure',
  parameters: {
    docs: { description: { component: '**Missing** · High. Show essential fields first, reveal advanced options on demand. Required fields always visible; optional/advanced behind disclosure with a count of what is hidden.' } },
  },
}

export const Default = {
  render: () => (
    <div className="w-96 rounded-lg border p-4 flex flex-col gap-4">
      <div className="text-sm font-semibold">Product configuration</div>
      <Field><FieldLabel>Product name *</FieldLabel><Input defaultValue="Hydro-Pro Series" /></Field>
      <Field><FieldLabel>Base price *</FieldLabel><Input defaultValue="$1,200.00" /></Field>
      <Collapsible>
        <CollapsibleTrigger render={<Button variant="ghost" className="w-full justify-between" />}>
          Advanced options <span className="text-xs text-muted-foreground">8 more fields <ChevronDown className="inline size-3" /></span>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 flex flex-col gap-4">
          <Field><FieldLabel>Lead time (days)</FieldLabel><Input defaultValue="14" /></Field>
          <Field><FieldLabel>Markup %</FieldLabel><Input defaultValue="20" /></Field>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
}
