import { InputGroup, InputGroupAddon } from '@/components/ui/input-group'
import { Input } from '@/components/ui/input'

export default {
  title: 'shadcn/Input Group',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/input-group">Input Group - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon>https://</InputGroupAddon>
      <Input placeholder="example.com" />
    </InputGroup>
  ),
}
