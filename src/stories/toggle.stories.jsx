import { Toggle } from '@/components/ui/toggle'
import { BoldIcon } from 'lucide-react'

export default {
  title: 'shadcn/Toggle',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/toggle">Toggle - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex gap-2">
      <Toggle><BoldIcon /></Toggle>
      <Toggle variant="outline"><BoldIcon /></Toggle>
    </div>
  ),
}
