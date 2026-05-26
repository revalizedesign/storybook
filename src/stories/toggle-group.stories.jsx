import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'

export default {
  title: 'shadcn/Toggle Group',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/toggle-group">Toggle Group - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold"><BoldIcon /></ToggleGroupItem>
      <ToggleGroupItem value="italic"><ItalicIcon /></ToggleGroupItem>
      <ToggleGroupItem value="underline"><UnderlineIcon /></ToggleGroupItem>
    </ToggleGroup>
  ),
}
