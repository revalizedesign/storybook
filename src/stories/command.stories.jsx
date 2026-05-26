import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'

export default {
  title: 'shadcn/Command',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/command">Command - shadcn/ui</a>' } },
  },
}

export const Default = {
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
