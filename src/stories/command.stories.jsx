import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Command',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/command">Command - shadcn/ui</a>' },
      page: createDocsPage(),
    },
  },
}

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Jonathan: Missing · High priority. Suggestions as you type when selecting from thousands of products / part numbers. Min 2 chars, debounce 250ms, arrow keys + Enter to select.',
      },
    },
  },
  render: () => (
    <Command className="rounded-lg border w-80">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const SecondaryCopy = {
  name: 'Secondary copy',
  parameters: {
    docs: {
      description: {
        story: 'Jonathan: Show ID/secondary info beside the name.',
      },
    },
  },
  render: () => (
    <Command className="w-80 rounded-lg border">
      <CommandInput placeholder="Search products…" defaultValue="Hydro-Pro" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Products">
          <CommandItem className="justify-between">Hydro-Pro Series<span className="text-xs text-muted-foreground">HPR-001</span></CommandItem>
          <CommandItem className="justify-between">Hydro-Pro Advanced<span className="text-xs text-muted-foreground">HPA-002</span></CommandItem>
          <CommandItem className="justify-between">Hydro-Pro Basic<span className="text-xs text-muted-foreground">HPB-003</span></CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const Tabular = {
  render: () => (
    <Command className="w-96 rounded-lg border">
      <CommandInput placeholder="Search products…" defaultValue="Hydro-Pro" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Products">
          <CommandItem className="justify-between"><span className="flex-1">Hydro-Pro Series</span><span className="w-16 text-xs text-muted-foreground">HPR-001</span><span className="w-12 text-xs text-muted-foreground text-right">$2,400</span></CommandItem>
          <CommandItem className="justify-between"><span className="flex-1">Hydro-Pro Advanced</span><span className="w-16 text-xs text-muted-foreground">HPA-002</span><span className="w-12 text-xs text-muted-foreground text-right">$3,800</span></CommandItem>
          <CommandItem className="justify-between"><span className="flex-1">Hydro-Pro Basic</span><span className="w-16 text-xs text-muted-foreground">HPB-003</span><span className="w-12 text-xs text-muted-foreground text-right">$1,200</span></CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
