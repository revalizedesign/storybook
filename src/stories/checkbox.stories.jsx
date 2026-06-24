import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Checkbox',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/checkbox">Checkbox - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**Usage:** Binary choice input. Always pair with Label component.

**Visual Rules:**
- Always wrap with Label for accessibility
- Checkboxes in groups should be in a vertical list
- Label text right of checkbox, aligned left
- Use consistent spacing between items in groups
- Avoid mixing Checkbox + complex layouts; use separate form fields instead

**States:**
- Unchecked: Empty box
- Checked: Box with checkmark
- Indeterminate: Box with dash (parent of mixed children, tri-state)
- Disabled: Gray, no pointer
- Disabled + checked: Gray with checkmark

**Accessibility:**
- Label htmlFor must match Checkbox id
- Keyboard: Tab (focus), Space (toggle)
- Screen readers: aria-label or paired Label
- Disabled state: aria-disabled="true"

**Composition:**
- Single checkbox: Label to the right
- Checkbox group: Vertical list with common label above
- No inline checkboxes in sentences (awkward UX)

**Common Patterns:**
- Accept terms → Single checkbox + link to terms
- Multi-select filter → Checkbox group
- Multi-select from table → Checkboxes in first column
- Tri-state parent → Parent indeterminate when children mixed

**Product Examples:**
- ConfigureOne: Select multiple configurations to export
- PROCAD: Select parts for bulk edit/delete
- Data tables: Select rows for bulk actions`,
        },
      }),
    },
  },
}

export const Default = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const States = {
  render: () => {
    const [checked, setChecked] = useState(true)
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Checkbox id="unchecked" />
          <Label htmlFor="unchecked">Unchecked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="checked" defaultChecked />
          <Label htmlFor="checked">Checked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="disabled" disabled />
          <Label htmlFor="disabled" className="opacity-50">Disabled (unchecked)</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="disabled-checked" disabled defaultChecked />
          <Label htmlFor="disabled-checked" className="opacity-50">Disabled (checked)</Label>
        </div>
      </div>
    )
  },
}

export const WithLabel = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3 p-3 border rounded-lg">
        <Checkbox id="subscribe" defaultChecked />
        <div className="flex-1">
          <Label htmlFor="subscribe" className="cursor-pointer font-medium">Subscribe to email updates</Label>
          <p className="text-xs text-muted-foreground mt-1">Receive weekly summaries and important product announcements</p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-3 border rounded-lg">
        <Checkbox id="newsletter" />
        <div className="flex-1">
          <Label htmlFor="newsletter" className="cursor-pointer font-medium">Subscribe to newsletter</Label>
          <p className="text-xs text-muted-foreground mt-1">Marketing emails about new features and special offers</p>
        </div>
      </div>
    </div>
  ),
}

export const CheckboxGroup = {
  render: () => {
    const [filters, setFilters] = useState({ active: true, draft: false, archived: false })
    return (
      <div className="flex flex-col gap-3">
        <p className="font-medium text-sm">Filter by status:</p>
        <div className="flex flex-col gap-2 ml-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="active"
              checked={filters.active}
              onCheckedChange={(checked) => setFilters({ ...filters, active: checked })}
            />
            <Label htmlFor="active" className="cursor-pointer">Active</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="draft"
              checked={filters.draft}
              onCheckedChange={(checked) => setFilters({ ...filters, draft: checked })}
            />
            <Label htmlFor="draft" className="cursor-pointer">Draft</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="archived"
              checked={filters.archived}
              onCheckedChange={(checked) => setFilters({ ...filters, archived: checked })}
            />
            <Label htmlFor="archived" className="cursor-pointer">Archived</Label>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Selected: {[filters.active && 'Active', filters.draft && 'Draft', filters.archived && 'Archived'].filter(Boolean).join(', ') || 'None'}
        </p>
      </div>
    )
  },
}

export const TableSelection = {
  render: () => (
    <table className="w-full border border-border">
      <thead>
        <tr className="bg-muted/50 border-b">
          <th className="p-3 text-left">
            <Checkbox id="select-all" />
          </th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {['Hydro-Pro Series', 'Solar Config A', 'Wind Energy X'].map((name) => (
          <tr key={name} className="border-b hover:bg-muted/30">
            <td className="p-3">
              <Checkbox id={`select-${name}`} />
            </td>
            <td className="p-3">{name}</td>
            <td className="p-3 text-sm text-muted-foreground">Active</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}
