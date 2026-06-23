import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default {
  title: 'shadcn/Collapsible',
  parameters: {
    docs: {
      description: {
        component: `<a href="https://ui.shadcn.com/docs/components/base/collapsible">Collapsible - shadcn/ui</a>

**Jonathan:** Show essential fields first, reveal advanced options on demand. Required fields always visible; optional/advanced behind disclosure with a count of what is hidden.`,
      },
    },
  },
}

export const Default = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger render={<Button variant="outline" className="w-full justify-between" />}>Toggle content</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-lg border p-4 mt-2">Hidden content revealed.</div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const ProgressiveDisclosure = {
  name: 'Candidates (review)',
  parameters: {
    docs: {
      description: {
        story: 'Progressive disclosure — required fields visible, advanced options behind a collapsible with a count of hidden fields.',
      },
    },
  },
  render: () => (
    <div className="rounded-lg border p-4 flex flex-col gap-4">
      <div className="font-semibold">Product configuration</div>
      <Field><FieldLabel>Product name *</FieldLabel><Input defaultValue="Hydro-Pro Series" /></Field>
      <Field><FieldLabel>Base price *</FieldLabel><Input defaultValue="$1,200.00" /></Field>
      <Collapsible>
        <CollapsibleTrigger render={<Button variant="ghost" className="w-full justify-between" />}>
          Advanced options <span className="text-muted-foreground">8 more fields <ChevronDown className="inline size-3" /></span>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 flex flex-col gap-4">
          <Field><FieldLabel>Lead time (days)</FieldLabel><Input defaultValue="14" /></Field>
          <Field><FieldLabel>Markup %</FieldLabel><Input defaultValue="20" /></Field>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
}
