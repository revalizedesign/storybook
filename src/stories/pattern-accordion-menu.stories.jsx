import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

export default {
  title: 'Design patterns/Navigation/Accordion menu',
  parameters: {
    docs: { description: { component: '**Missing** · Medium. Collapsible nav sections for products with deep hierarchies (PROCAD, PLM). One section open at a time; section headers are not links — only items inside are.' } },
  },
}

const items = {
  Manage: ['Pricebooks', 'Equations', 'Jobs Dashboard'],
  Setup: ['Option-Based Pricing', 'Conversion Factors', 'Currencies'],
}

export const Default = {
  render: () => (
    <Accordion defaultValue={['Setup']} className="w-72 rounded-lg border">
      {Object.entries(items).map(([section, links]) => (
        <AccordionItem key={section} value={section}>
          <AccordionTrigger className="px-4">{section}</AccordionTrigger>
          <AccordionContent className="flex flex-col">
            {links.map(l => <a key={l} href="#" className="px-6 py-1.5 text-sm text-muted-foreground hover:text-foreground">{l}</a>)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}
