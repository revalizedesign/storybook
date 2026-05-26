import { Combobox, ComboboxTrigger, ComboboxContent, ComboboxInput, ComboboxEmpty, ComboboxGroup, ComboboxItem } from '@/components/ui/combobox'

export default {
  title: 'shadcn/Combobox',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/combobox">Combobox - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Combobox>
      <ComboboxTrigger>
        <ComboboxInput placeholder="Select framework..." />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxItem value="react">React</ComboboxItem>
          <ComboboxItem value="vue">Vue</ComboboxItem>
          <ComboboxItem value="svelte">Svelte</ComboboxItem>
        </ComboboxGroup>
      </ComboboxContent>
    </Combobox>
  ),
}
