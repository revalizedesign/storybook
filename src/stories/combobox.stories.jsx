import { Combobox, ComboboxContent, ComboboxInput, ComboboxEmpty, ComboboxItem, ComboboxList } from '@/components/ui/combobox'
import { Label } from '@/components/ui/label'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Combobox',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/combobox">Combobox - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**Searchable dropdown for 10-100 items.** Type to filter, arrow keys + enter to select.

**Select vs Combobox vs Command:**
- **Select:** < 10 items, fixed list, no search. Example: Status dropdown (Active/Draft/Archived)
- **Combobox:** 10-100 items, searchable. Example: Part picker (50+ parts), Config selector (30+ configs)
- **Command:** 100+ items, advanced search, actions. Example: Global command palette, complex search

**When to use Combobox:**
- Long lists (10-100 items) where search is necessary
- Product/part pickers (parts, configurations, ingredients)
- Auto-complete on large datasets
- Never use if you have < 5 items (use Select)

**Rules:**
- Placeholder: "Search..." or "Type to filter..."
- Show secondary info if helpful: part number, status, ID, price
- Search matches: type "hydro" → shows all items containing "hydro" (case-insensitive)
- Empty state: "No results found."
- Keyboard: arrow keys to navigate, enter to select, escape to close
- Optional: group items by category (Products, Configs, etc.)

**Products:**
- ConfigureOne: Configuration selector (30+ configs), formula picker
- PROCAD: Parts picker (100+ parts), assembly selector
- SpecPage: Ingredient search, supplier lookup`,
          Matt: `Critical component for large-item selection. Essential to clarify trinity: Select vs Combobox vs Command.

**Observations:** Combobox fills the gap between small Select lists and massive Command searches. Current positioning is clear and important for new users to understand.

**What's missing:** Secondary info patterns. Grouped category examples. Real product pickers.

**Roadmap:** Validate all Select/Combobox/Command variants. Test search behavior. Confirm group filtering works correctly.`,
        },
      }),
    },
  },
}

export const Default = {
  name: 'Configurations (10-20 items)',
  render: () => {
    const [search, setSearch] = React.useState('')
    const items = [
      { value: 'hydro-pro', label: 'Hydro-Pro Series' },
      { value: 'hydro-basic', label: 'Hydro-Basic Series' },
      { value: 'hydro-advanced', label: 'Hydro-Advanced Series' },
      { value: 'solar-config-a', label: 'Solar Config A' },
      { value: 'solar-config-b', label: 'Solar Config B' },
      { value: 'wind-energy-x', label: 'Wind Energy X' },
      { value: 'wind-energy-y', label: 'Wind Energy Y' },
      { value: 'geothermal-pro', label: 'Geothermal Pro' },
      { value: 'battery-storage', label: 'Battery Storage Module' },
      { value: 'grid-tie', label: 'Grid-Tie Inverter' },
    ]
    const filtered = items.filter(item =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.value.toLowerCase().includes(search.toLowerCase())
    )
    return (
      <div className="flex justify-center">
        <Combobox>
          <ComboboxInput
            placeholder="Search configurations..."
            className="max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ComboboxContent>
            <ComboboxList>
              {filtered.length === 0 && <ComboboxEmpty>No configurations found.</ComboboxEmpty>}
              {filtered.map(item => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  },
}

export const ProductSearch = {
  name: 'Parts Picker (40+ items)',
  render: () => {
    const [search, setSearch] = React.useState('')
    const items = [
      { value: 'hyd-001', label: 'HYD-001 | Hydro-Pro Pump' },
      { value: 'hyd-002', label: 'HYD-002 | Hydro-Pro Valve' },
      { value: 'hyd-003', label: 'HYD-003 | Hydro-Pro Filter' },
      { value: 'hyd-004', label: 'HYD-004 | Hydro-Basic Pump' },
      { value: 'hyd-005', label: 'HYD-005 | Hydro-Basic Valve' },
      { value: 'sol-001', label: 'SOL-001 | Solar Panel 300W' },
      { value: 'sol-002', label: 'SOL-002 | Solar Panel 400W' },
      { value: 'sol-003', label: 'SOL-003 | Solar Inverter 3kW' },
      { value: 'sol-004', label: 'SOL-004 | Solar Inverter 5kW' },
      { value: 'sol-005', label: 'SOL-005 | Solar Battery 10kWh' },
      { value: 'wind-001', label: 'WIND-001 | Wind Turbine 2kW' },
      { value: 'wind-002', label: 'WIND-002 | Wind Turbine 5kW' },
    ]
    const filtered = items.filter(item =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.value.toLowerCase().includes(search.toLowerCase())
    )
    return (
      <div className="flex justify-center">
        <Combobox>
          <ComboboxInput
            placeholder="Search parts (e.g. HYD, SOLAR)..."
            className="max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ComboboxContent>
            <ComboboxList>
              {filtered.length === 0 && <ComboboxEmpty>No parts found.</ComboboxEmpty>}
              {filtered.map(item => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  },
}

export const WithSecondaryInfo = {
  name: 'With Status + Pricing',
  render: () => {
    const [search, setSearch] = React.useState('')
    const items = [
      { value: 'hydro-pro-active', label: 'Hydro-Pro Series', rules: '47 rules', status: 'Active', statusColor: 'bg-green-100 text-green-800' },
      { value: 'solar-config-draft', label: 'Solar Config A', rules: '23 rules', status: 'Draft', statusColor: 'bg-yellow-100 text-yellow-800' },
      { value: 'wind-config-archived', label: 'Wind Energy X', rules: '12 rules', status: 'Archived', statusColor: 'bg-gray-100 text-gray-800' },
    ]
    const filtered = items.filter(item =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.value.toLowerCase().includes(search.toLowerCase())
    )
    return (
      <div className="flex justify-center">
        <Combobox>
          <ComboboxInput
            placeholder="Search configurations..."
            className="max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ComboboxContent>
            <ComboboxList>
              {filtered.length === 0 && <ComboboxEmpty>No results found.</ComboboxEmpty>}
              {filtered.map(item => (
                <ComboboxItem key={item.value} value={item.value}>
                  <div className="flex items-center justify-between w-full gap-4">
                    <span className="text-sm">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.rules}</span>
                    <span className={`text-xs ${item.statusColor} px-2 py-0.5 rounded`}>{item.status}</span>
                  </div>
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  },
}

export const InForm = {
  name: 'In Form Context',
  render: () => {
    const [configSearch, setConfigSearch] = React.useState('')
    const [partSearch, setPartSearch] = React.useState('')
    const configs = [
      { value: 'hydro-pro', label: 'Hydro-Pro Series' },
      { value: 'hydro-basic', label: 'Hydro-Basic Series' },
      { value: 'solar-a', label: 'Solar Config A' },
      { value: 'wind-x', label: 'Wind Energy X' },
    ]
    const parts = [
      { value: 'hyd-001', label: 'HYD-001 | Hydro-Pro Pump' },
      { value: 'hyd-002', label: 'HYD-002 | Hydro-Pro Valve' },
      { value: 'sol-001', label: 'SOL-001 | Solar Panel' },
    ]
    const filteredConfigs = configs.filter(item =>
      item.label.toLowerCase().includes(configSearch.toLowerCase())
    )
    const filteredParts = parts.filter(item =>
      item.label.toLowerCase().includes(partSearch.toLowerCase())
    )
    return (
      <div className="flex justify-center">
        <div className="flex flex-col gap-6 max-w-sm">
        <div className="space-y-2">
          <Label htmlFor="config">Select Configuration *</Label>
          <Combobox>
            <ComboboxInput
              id="config"
              placeholder="Search configurations..."
              value={configSearch}
              onChange={(e) => setConfigSearch(e.target.value)}
            />
            <ComboboxContent>
              <ComboboxList>
                {filteredConfigs.length === 0 && <ComboboxEmpty>No configurations found.</ComboboxEmpty>}
                {filteredConfigs.map(item => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div className="space-y-2">
          <Label htmlFor="part">Select Part *</Label>
          <Combobox>
            <ComboboxInput
              id="part"
              placeholder="Search parts..."
              value={partSearch}
              onChange={(e) => setPartSearch(e.target.value)}
            />
            <ComboboxContent>
              <ComboboxList>
                {filteredParts.length === 0 && <ComboboxEmpty>No parts found.</ComboboxEmpty>}
                {filteredParts.map(item => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        </div>
      </div>
    )
  },
}
