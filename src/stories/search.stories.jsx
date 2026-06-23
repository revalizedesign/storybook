import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Combobox, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList, ComboboxSeparator } from '@/components/ui/combobox'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from '@/components/ui/command'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import products from './search.json'
import adminItems from './search-admin.json'

export default {
  parameters: {
    docs: {
      description: {
        component: `Search is organized by behavior, not placement.

## Choose by behavior

| Behavior | Use | Result relationship |
| --- | --- | --- |
| **Filter** | Narrow content already visible | The existing collection updates in place |
| **Lookup** | Select a specific entity | A transient result list appears |
| **Global** | Navigate across scopes | Grouped results open products, files, settings, or pages |
| **Command** | Execute an action | Results are verbs or operations, not catalog entities |

Table-wide and column filtering remain owned by **Data table**. Navigation and menu filtering reuse the same **Input Group** composition. Placement alone does not create another search component.

## Naming

The ephemeral result list pattern is a **Combobox** — not "Autocomplete" or "Typeahead." Those terms describe implementation details, not the component.

## Shared requirements

- Full keyboard navigation and a predictable clear action
- Explicit idle, loading, empty, and error states
- Minimum-character and debounce rules chosen for the data source
- Secondary context when names alone cannot distinguish results
- Selection behavior that matches the result type: filter, choose, navigate, or execute

## Matching and ranking

Exact, fuzzy, and semantic matching are ranking strategies — not visual component variants. Products may disclose matching rationale when it helps users understand unexpected results, but the search component should not expose implementation terminology by default.`,
      },
    },
  },
  title: 'Multi-component UX/Search',
}

export const Filter = {
  parameters: { docs: { description: { story: 'Narrows rows already visible in a data table. Input Group supplies the query control; the table owns filtering.' } } },
  render: () => {
    const [query, setQuery] = useState('')
    const items = products.filter(item => Object.values(item).some(value => String(value).toLowerCase().includes(query.toLowerCase())))
    return (
      <div className="flex flex-col gap-2">
        <InputGroup><InputGroupAddon><Search /></InputGroupAddon><InputGroupInput aria-label="Filter catalog" placeholder="Filter catalog…" type="search" value={query} onChange={event => setQuery(event.target.value)} /></InputGroup>
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>SKU</TableHead><TableHead>Category</TableHead><TableHead className="text-right">Price</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>{items.map(item => <TableRow key={item.sku}><TableCell>{item.name}</TableCell><TableCell>{item.sku}</TableCell><TableCell>{item.category}</TableCell><TableCell className="text-right tabular-nums">${item.price.toLocaleString()}</TableCell><TableCell>{item.status}</TableCell></TableRow>)}</TableBody>
        </Table>
      </div>
    )
  },
}

export const Lookup = {
  parameters: { docs: { description: { story: 'Single entity type. Combobox with grid layout showing name, SKU, and price.' } } },
  render: () => (
    <Combobox items={products} itemToStringValue={item => item.name}>
      <ComboboxInput placeholder="Search products…" showClear showTrigger={false} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList variant="grid">
          {(item) => (
            <ComboboxItem key={item.sku} value={item}>
              <span className="truncate">{item.name}</span>
              <span className="truncate text-muted-foreground">{item.sku}</span>
              <span className="text-right text-muted-foreground tabular-nums">${item.price.toLocaleString()}</span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const Global = {
  parameters: { docs: { description: { story: 'Multiple entity types. Results grouped by type — products, users, settings, pages.' } } },
  render: () => {
    const types = [...new Set(adminItems.map(i => i.type))]
    const groups = types.map(type => ({ value: type, items: adminItems.filter(i => i.type === type) }))
    return (
      <Combobox items={groups} itemToStringValue={item => item.name}>
        <ComboboxInput placeholder="Search everything…" showClear showTrigger={false} />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(group, index) => (
              <ComboboxGroup key={group.value} items={group.items}>
                <ComboboxLabel>{group.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(item) => (
                    <ComboboxItem key={item.name} value={item}>
                      <span className="truncate">{item.name}</span>
                      <span className="truncate text-muted-foreground">{item.detail}</span>
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
                {index < groups.length - 1 && <ComboboxSeparator />}
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}

export const SearchCommand = {
  name: 'Command',
  parameters: { docs: { description: { story: 'Finds and executes actions. Results are verbs, not catalog entities.' } } },
  render: () => (
    <Command className="rounded-lg border">
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>No commands found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Import file</CommandItem>
          <CommandItem>New configuration</CommandItem>
          <CommandItem>Search admin</CommandItem>
          <CommandItem>Search products</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
