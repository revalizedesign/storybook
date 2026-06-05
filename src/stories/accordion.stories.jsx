import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Accordion',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/accordion">Accordion - shadcn/ui</a>' },
      page: createDocsPage(),
    },
  },
}

export const Default = {
  render: () => (
    <Accordion defaultValue={['1']}>
      <AccordionItem value="1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. It comes with default styles via Tailwind CSS.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. Animated by default with CSS transitions.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Menu = {
  parameters: {
    docs: {
      description: {
        story: 'Jonathan: Missing · Medium priority. Collapsible nav sections for products with deep hierarchies (PROCAD, PLM). One section open at a time; section headers are not links — only items inside are.',
      },
    },
  },
  render: () => (
    <Accordion defaultValue={['Setup']} className="w-72 rounded-lg border">
      {Object.entries({ Manage: ['Pricebooks', 'Equations', 'Jobs Dashboard'], Setup: ['Option-Based Pricing', 'Conversion Factors', 'Currencies'] }).map(([section, links]) => (
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
