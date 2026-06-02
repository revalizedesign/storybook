import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'

export default {
  title: 'Design patterns/Forms & Input/Autocomplete search',
  parameters: {
    docs: { description: { component: '**Missing** · High. Suggestions as you type when selecting from thousands of products / part numbers. Min 2 chars, debounce 250ms, show ID/secondary info beside the name, arrow keys + Enter to select.' } },
  },
}

export const Default = {
  render: () => (
    <Command className="w-80 rounded-lg border">
      <CommandInput placeholder="Search products…" defaultValue="Hydro-Pro" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Products">
          <CommandItem><span className="flex-1">Hydro-Pro Series</span><span className="text-xs text-muted-foreground">HPR-001</span></CommandItem>
          <CommandItem><span className="flex-1">Hydro-Pro Advanced</span><span className="text-xs text-muted-foreground">HPA-002</span></CommandItem>
          <CommandItem><span className="flex-1">Hydro-Pro Basic</span><span className="text-xs text-muted-foreground">HPB-003</span></CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
