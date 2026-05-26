import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

export default {
  title: 'shadcn/Accordion',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/accordion">Accordion - shadcn/ui</a>' } },
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
