import { Textarea } from '@/components/ui/textarea'

export default {
  title: 'shadcn/Textarea',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/textarea">Textarea - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Textarea placeholder="Type your message..." className="w-64" />
  ),
}
