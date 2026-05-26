import { Item, ItemContent, ItemTitle, ItemDescription } from '@/components/ui/item'

export default {
  title: 'shadcn/Item',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/item">Item - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Item className="w-80 border rounded-lg p-3">
      <ItemContent>
        <ItemTitle>Item title</ItemTitle>
        <ItemDescription>Item description goes here.</ItemDescription>
      </ItemContent>
    </Item>
  ),
}
