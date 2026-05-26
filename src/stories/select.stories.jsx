import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export default {
  title: 'shadcn/Select',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/select">Select - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Select defaultValue="banana">
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
}
