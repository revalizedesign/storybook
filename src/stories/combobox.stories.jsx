import { Combobox, ComboboxTrigger, ComboboxContent, ComboboxInput, ComboboxEmpty, ComboboxGroup, ComboboxLabel, ComboboxItem } from '@/components/ui/combobox'
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
  render: () => (
    <Combobox>
      <ComboboxTrigger>
        <ComboboxInput placeholder="Search configurations..." />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxEmpty>No configurations found.</ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxItem value="hydro-pro">Hydro-Pro Series</ComboboxItem>
          <ComboboxItem value="hydro-basic">Hydro-Basic Series</ComboboxItem>
          <ComboboxItem value="hydro-advanced">Hydro-Advanced Series</ComboboxItem>
          <ComboboxItem value="solar-config-a">Solar Config A</ComboboxItem>
          <ComboboxItem value="solar-config-b">Solar Config B</ComboboxItem>
          <ComboboxItem value="wind-energy-x">Wind Energy X</ComboboxItem>
          <ComboboxItem value="wind-energy-y">Wind Energy Y</ComboboxItem>
          <ComboboxItem value="geothermal-pro">Geothermal Pro</ComboboxItem>
          <ComboboxItem value="battery-storage">Battery Storage Module</ComboboxItem>
          <ComboboxItem value="grid-tie">Grid-Tie Inverter</ComboboxItem>
        </ComboboxGroup>
      </ComboboxContent>
    </Combobox>
  ),
}

export const ProductSearch = {
  name: 'Parts Picker (40+ items)',
  render: () => (
    <Combobox>
      <ComboboxTrigger>
        <ComboboxInput placeholder="Search parts (e.g. HYD, SOLAR)..." />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxEmpty>No parts found.</ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxItem value="hyd-001">HYD-001 | Hydro-Pro Pump</ComboboxItem>
          <ComboboxItem value="hyd-002">HYD-002 | Hydro-Pro Valve</ComboboxItem>
          <ComboboxItem value="hyd-003">HYD-003 | Hydro-Pro Filter</ComboboxItem>
          <ComboboxItem value="hyd-004">HYD-004 | Hydro-Basic Pump</ComboboxItem>
          <ComboboxItem value="hyd-005">HYD-005 | Hydro-Basic Valve</ComboboxItem>
          <ComboboxItem value="sol-001">SOL-001 | Solar Panel 300W</ComboboxItem>
          <ComboboxItem value="sol-002">SOL-002 | Solar Panel 400W</ComboboxItem>
          <ComboboxItem value="sol-003">SOL-003 | Solar Inverter 3kW</ComboboxItem>
          <ComboboxItem value="sol-004">SOL-004 | Solar Inverter 5kW</ComboboxItem>
          <ComboboxItem value="sol-005">SOL-005 | Solar Battery 10kWh</ComboboxItem>
          <ComboboxItem value="wind-001">WIND-001 | Wind Turbine 2kW</ComboboxItem>
          <ComboboxItem value="wind-002">WIND-002 | Wind Turbine 5kW</ComboboxItem>
        </ComboboxGroup>
      </ComboboxContent>
    </Combobox>
  ),
}

export const WithSecondaryInfo = {
  name: 'With Status + Pricing',
  render: () => (
    <Combobox>
      <ComboboxTrigger>
        <ComboboxInput placeholder="Search configurations..." />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxItem value="hydro-pro-active">
            <div className="flex items-center justify-between w-full gap-4">
              <span>Hydro-Pro Series</span>
              <span className="text-xs text-muted-foreground">47 rules</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Active</span>
            </div>
          </ComboboxItem>
          <ComboboxItem value="solar-config-draft">
            <div className="flex items-center justify-between w-full gap-4">
              <span>Solar Config A</span>
              <span className="text-xs text-muted-foreground">23 rules</span>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Draft</span>
            </div>
          </ComboboxItem>
          <ComboboxItem value="wind-config-archived">
            <div className="flex items-center justify-between w-full gap-4">
              <span>Wind Energy X</span>
              <span className="text-xs text-muted-foreground">12 rules</span>
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">Archived</span>
            </div>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxContent>
    </Combobox>
  ),
}

export const GroupedByCategory = {
  name: 'Grouped by Category',
  render: () => (
    <Combobox>
      <ComboboxTrigger>
        <ComboboxInput placeholder="Search products..." />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxEmpty>No products found.</ComboboxEmpty>

        <ComboboxGroup>
          <ComboboxLabel className="font-semibold text-sm px-2 py-1.5 text-muted-foreground">Hydro Products</ComboboxLabel>
          <ComboboxItem value="hydro-pro">Hydro-Pro Series</ComboboxItem>
          <ComboboxItem value="hydro-basic">Hydro-Basic Series</ComboboxItem>
          <ComboboxItem value="hydro-advanced">Hydro-Advanced Series</ComboboxItem>
        </ComboboxGroup>

        <ComboboxGroup>
          <ComboboxLabel className="font-semibold text-sm px-2 py-1.5 text-muted-foreground">Solar Products</ComboboxLabel>
          <ComboboxItem value="solar-a">Solar Config A</ComboboxItem>
          <ComboboxItem value="solar-b">Solar Config B</ComboboxItem>
          <ComboboxItem value="solar-c">Solar Config C</ComboboxItem>
        </ComboboxGroup>

        <ComboboxGroup>
          <ComboboxLabel className="font-semibold text-sm px-2 py-1.5 text-muted-foreground">Wind Products</ComboboxLabel>
          <ComboboxItem value="wind-x">Wind Energy X</ComboboxItem>
          <ComboboxItem value="wind-y">Wind Energy Y</ComboboxItem>
        </ComboboxGroup>

        <ComboboxGroup>
          <ComboboxLabel className="font-semibold text-sm px-2 py-1.5 text-muted-foreground">Storage</ComboboxLabel>
          <ComboboxItem value="battery">Battery Storage Module</ComboboxItem>
          <ComboboxItem value="thermal">Thermal Storage</ComboboxItem>
        </ComboboxGroup>
      </ComboboxContent>
    </Combobox>
  ),
}

export const InForm = {
  name: 'In Form Context',
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="config">Select Configuration *</Label>
        <Combobox>
          <ComboboxTrigger>
            <ComboboxInput id="config" placeholder="Search configurations..." />
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxEmpty>No configurations found.</ComboboxEmpty>
            <ComboboxGroup>
              <ComboboxItem value="hydro-pro">Hydro-Pro Series</ComboboxItem>
              <ComboboxItem value="hydro-basic">Hydro-Basic Series</ComboboxItem>
              <ComboboxItem value="solar-a">Solar Config A</ComboboxItem>
              <ComboboxItem value="wind-x">Wind Energy X</ComboboxItem>
            </ComboboxGroup>
          </ComboboxContent>
        </Combobox>
      </div>

      <div className="space-y-2">
        <Label htmlFor="part">Select Part *</Label>
        <Combobox>
          <ComboboxTrigger>
            <ComboboxInput id="part" placeholder="Search parts..." />
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxEmpty>No parts found.</ComboboxEmpty>
            <ComboboxGroup>
              <ComboboxItem value="hyd-001">HYD-001 | Hydro-Pro Pump</ComboboxItem>
              <ComboboxItem value="hyd-002">HYD-002 | Hydro-Pro Valve</ComboboxItem>
              <ComboboxItem value="sol-001">SOL-001 | Solar Panel</ComboboxItem>
            </ComboboxGroup>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  ),
}
