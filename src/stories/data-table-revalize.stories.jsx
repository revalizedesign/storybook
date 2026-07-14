import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { NativeSelect } from '@/components/ui/native-select'
import data from './data-table-revalize.json'

// Revalize variants for data tables, using the shadcn Table primitive directly (no wrapper needed).
// Each story is a real production content shape, kept short — just enough to show how the table is
// narrowed down to find a row, which differs by product.
export default {
  title: 'Revalize/Data table',
  component: Table,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Reach for a filterable sidebar when a catalog has multiple independent facets (category, brand) that combine — AutoQuotes. Use status tabs when rows fall into one mutually-exclusive state and users mostly work one state at a time — SpecPage. Use a plain list when the dataset is small enough that narrowing it down is not the point — Configure One Selectors.',
      },
    },
  },
  argTypes: {
    filters: {
      control: 'object',
      description: 'Sidebar facets (id, label, options) — FilterableCatalog only.',
      table: { category: 'FilterableCatalog' },
    },
    statuses: {
      control: 'object',
      description: 'Tab labels, in display order — StatusTabs only.',
      table: { category: 'StatusTabs' },
    },
  },
}

const statusVariant = { Active: 'secondary', Draft: 'outline', 'In Review': 'default', Deprecated: 'ghost' }

// AutoQuotes catalog — sidebar filters narrow a product grid rendered as rows.
export const FilterableCatalog = {
  render: () => {
    const { filters, items } = data.filterableCatalog
    const [selected, setSelected] = useState(() => Object.fromEntries(filters.map(f => [f.id, 'All'])))
    const visible = items.filter(item => filters.every(f => selected[f.id] === 'All' || item[f.id] === selected[f.id]))

    return (
      <div className="flex gap-6">
        <div className="flex w-48 shrink-0 flex-col gap-4">
          {filters.map(f => (
            <div className="flex flex-col gap-1.5" key={f.id}>
              <Label htmlFor={`filter-${f.id}`}>{f.label}</Label>
              <NativeSelect id={`filter-${f.id}`} className="w-full" value={selected[f.id]} onChange={e => setSelected(s => ({ ...s, [f.id]: e.target.value }))}>
                {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </NativeSelect>
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1 rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map(item => (
                <TableRow key={item.id}>
                  <TableCell><a href="#" className="font-medium text-primary">{item.name}</a></TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell className="text-right">${item.price.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  },
  // The bug class we're guarding against: a filter that updates state but silently fails to narrow
  // the rendered rows (e.g. comparing against the wrong data shape). Assert the row count actually changes.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const { items } = data.filterableCatalog

    const rowCount = () => canvas.getAllByRole('row').length - 1 // minus header row

    await expect(rowCount()).toBe(items.length)

    await userEvent.selectOptions(canvas.getByLabelText('Brand'), 'Kohler')
    const kohlerCount = items.filter(i => i.brand === 'Kohler').length
    await expect(rowCount()).toBe(kohlerCount)
    await expect(canvas.queryByText('Align Single-Handle Faucet')).not.toBeInTheDocument()
  },
}

// SpecPage specifications — status tabs filter the same table, one status visible at a time.
export const StatusTabs = {
  name: 'Status tabs',
  render: () => {
    const { statuses, items } = data.statusTabs
    const [status, setStatus] = useState(statuses[0])
    const visible = items.filter(item => item.status === status)

    return (
      <Tabs value={status} onValueChange={setStatus}>
        <TabsList>
          {statuses.map(s => <TabsTrigger key={s} value={s}>{s}</TabsTrigger>)}
        </TabsList>
        <div className="mt-3 rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map(item => (
                <TableRow key={item.id}>
                  <TableCell><a href="#" className="font-medium text-primary">{item.name}</a></TableCell>
                  <TableCell>{item.section}</TableCell>
                  <TableCell><Badge variant={statusVariant[item.status]}>{item.status}</Badge></TableCell>
                  <TableCell className="text-right">{item.updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Tabs>
    )
  },
}

// Configure One Selectors — a plain list, no filters. The dataset is small enough that narrowing
// it down isn't the point; users scan the whole thing.
export const SimpleList = {
  name: 'Simple list',
  render: () => {
    const { items } = data.simpleList
    return (
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Rules</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell><a href="#" className="font-medium text-primary">{item.name}</a></TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell className="text-right">{item.rules}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  },
}
