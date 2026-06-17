import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Fa } from '@/components/Fa'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export default {
  title: 'Experiments/Filter bar',
  parameters: {
    docs: {
      description: {
        component:
          'Pane toolbar / filter bar from c1c-admin (`buildPaneToolbar`): search input, removable filter chips (`badgeFilterLink`), a grid/list/table view-mode toggle, and a Columns dropdown.',
      },
    },
  },
}

const initialChips = [
  { id: 'type', label: 'type: input' },
  { id: 'status', label: 'status: extracted' },
  { id: 'group', label: 'group: hydraulics' },
]

const columns = ['Type', 'Default', 'Value', 'Options']

export const Default = {
  render: () => {
    const [view, setView] = useState('table')
    const [chips, setChips] = useState(initialChips)

    return (
      <div className="flex w-[44rem] flex-col gap-2">
        <div className="flex items-center gap-2">
          <InputGroup className="flex-1">
            <InputGroupAddon>
              <Fa name="filter" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search…" type="search" />
          </InputGroup>

          <ToggleGroup
            type="single"
            value={view}
            onValueChange={v => v && setView(v)}
            variant="outline"
          >
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Fa name="grid-2" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <Fa name="list" />
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Table view">
              <Fa name="table-list" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Button variant="outline" size="sm">
            <Fa name="bars-filter" /> Filter
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Fa name="table-columns" /> Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {columns.map(c => (
                <DropdownMenuCheckboxItem key={c} checked>
                  {c}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          {chips.map(chip => (
            <Badge key={chip.id} variant="secondary" className="gap-1">
              {chip.label}
              <button
                type="button"
                aria-label={`Remove ${chip.label}`}
                onClick={() => setChips(chips.filter(c => c.id !== chip.id))}
                className="-mr-0.5 text-muted-foreground hover:text-foreground"
              >
                <Fa name="xmark" variant="solid" />
              </button>
            </Badge>
          ))}
          <span className="ml-auto text-sm text-muted-foreground">128 results</span>
        </div>
      </div>
    )
  },
}
