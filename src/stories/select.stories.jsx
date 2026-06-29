import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Select',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/select">Select - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**Select for choosing from a list of options.**

**Select vs Combobox vs Command:**
- **Select**: Fixed list, no search (< 10 items)
  - Use for: Product types, status, predefined categories
  - Example: Status dropdown (Active/Draft/Archived)

- **Combobox**: Searchable select (10-100 items)
  - Use for: Long lists with search
  - Example: Configuration picker from 47 options

- **Command**: Advanced search, filtering, custom actions
  - Use for: Complex workflows, keyboard shortcuts
  - Example: Global command palette

**Pattern:**
- Trigger shows selected value or placeholder
- Opens dropdown on click
- Click item to select
- Keyboard: arrow keys to navigate, enter to select, escape to close

**Accessibility:**
- aria-expanded for trigger state
- aria-selected for current option
- Keyboard navigation (arrow keys, enter, escape)
- aria-label or associated label

**Product Examples:**
- ConfigureOne: Select configuration, status filter
- PROCAD: Select part type, category
- SpecPage: Select formula category`,
        },
      }),
    },
  },
}

export const Default = {
  render: () => (
    <Select defaultValue="banana">
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithLabel = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-xs">
      <Label htmlFor="status">Configuration Status</Label>
      <Select>
        <SelectTrigger id="status">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const WithGroups = {
  name: 'Grouped Options',
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select product" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Hydro Products</SelectLabel>
          <SelectItem value="hydro-1">Hydro-Pro Series</SelectItem>
          <SelectItem value="hydro-2">Hydro-Basic Series</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Solar Products</SelectLabel>
          <SelectItem value="solar-1">Solar Config A</SelectItem>
          <SelectItem value="solar-2">Solar Config B</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Wind Products</SelectLabel>
          <SelectItem value="wind-1">Wind Energy X</SelectItem>
          <SelectItem value="wind-2">Wind Energy Y</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const DisabledOption = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="draft">Draft</SelectItem>
        <SelectItem value="archived" disabled>Archived (Coming Soon)</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const FormComposition = {
  render: () => (
    <form className="flex flex-col gap-6 max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="config">Configuration *</Label>
        <Select>
          <SelectTrigger id="config">
            <SelectValue placeholder="Choose configuration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hydro-pro">Hydro-Pro Series</SelectItem>
            <SelectItem value="solar-a">Solar Config A</SelectItem>
            <SelectItem value="wind-x">Wind Energy X</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status *</Label>
        <Select>
          <SelectTrigger id="status">
            <SelectValue placeholder="Choose status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
        Submit
      </button>
    </form>
  ),
}
