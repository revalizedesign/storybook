import { useMemo, useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Fa } from '@/components/Fa'
import data from './table-filters-revalize.json'

// Revalize organism: shadcn Table + a toolbar (search + status filter) + results count + empty state.
// Composed directly from primitives — no generic DataTable factory. Filtering is client-side only,
// over the rows already on the page; this iteration doesn't cover server-side pagination.
export default {
  title: 'Revalize/Table with Filters',
  component: Table,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component: `For a comparison of narrowing mechanisms across products (sidebar filters, status tabs, plain list), see Revalize/Table Narrowing Patterns.

**When to use:** A table whose rows a user needs to narrow down — by name, status, or another facet — before scanning them. Reach for a plain \`Table\` instead when the row count is small enough that narrowing isn't the point (see Revalize/Table Narrowing Patterns' Simple list).

**Rules:**
- Search filters client-side, across rows already loaded on the page — no server pagination in this iteration. Large datasets that don't fit on one page are a separate conversation.
- Filters combine with AND — search text and the status filter both narrow the same result set.
- "Clear" resets every filter back to its default (empty search, "All statuses") in one action, not one field at a time.
- Always show a results count and an empty state — never let "0 rows" render as a bare, unexplained table.`,
      },
    },
  },
}

const statusVariant = { Active: 'secondary', Archived: 'ghost', Draft: 'outline' }

function ProductLinesTable({ initialSearch = '', initialStatus = 'All statuses' }) {
  const { rows, statuses } = data.productLines
  const [search, setSearch] = useState(initialSearch)
  const [status, setStatus] = useState(initialStatus)

  const visible = useMemo(() => (
    rows.filter(row => {
      const matchesSearch = row.name.toLowerCase().includes(search.trim().toLowerCase())
      const matchesStatus = status === 'All statuses' || row.status === status
      return matchesSearch && matchesStatus
    })
  ), [rows, search, status])

  const isFiltered = search.trim() !== '' || status !== 'All statuses'

  const reset = () => {
    setSearch('')
    setStatus('All statuses')
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Fa name="magnifying-glass" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Search product lines"
            className="pl-8"
            onChange={e => setSearch(e.target.value)}
            placeholder="Search product lines..."
            value={search}
          />
        </div>
        <Select onValueChange={setStatus} value={status}>
          <SelectTrigger aria-label="Filter by status" className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        {isFiltered && (
          <button className="text-sm text-muted-foreground hover:text-foreground" onClick={reset} type="button">
            Clear
          </button>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        {visible.length} of {rows.length} product lines
      </div>

      {visible.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon"><Fa name="magnifying-glass" /></EmptyMedia>
            <EmptyTitle>No results</EmptyTitle>
            <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Sizes</TableHead>
                <TableHead className="text-right">Last modified</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map(row => (
                <TableRow key={row.id}>
                  <TableCell><a className="font-medium text-primary" href="#">{row.name}</a></TableCell>
                  <TableCell><Badge variant={statusVariant[row.status]}>{row.status}</Badge></TableCell>
                  <TableCell className="text-right">{row.sizes}</TableCell>
                  <TableCell className="text-right">{row.lastModified}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

// FlowIQ product lines, unfiltered.
export const Default = {
  render: () => <ProductLinesTable />,
  // Type in the search box and confirm the row count narrows; clear it and confirm the full list returns.
  // Guards against the same bug class as Data table's FilterableCatalog test: a filter that updates
  // state but silently fails to narrow what's rendered.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const { rows } = data.productLines
    const rowCount = () => canvas.getAllByRole('row').length - 1 // minus header row

    await expect(rowCount()).toBe(rows.length)

    const search = canvas.getByLabelText('Search product lines')
    await userEvent.type(search, 'Pumps')
    const pumpCount = rows.filter(r => r.name.includes('Pumps')).length
    await expect(rowCount()).toBe(pumpCount)
    await expect(canvas.queryByText('Gearmotors')).not.toBeInTheDocument()

    const clear = canvas.getByRole('button', { name: 'Clear' })
    await userEvent.click(clear)
    await expect(rowCount()).toBe(rows.length)
    await expect(search).toHaveValue('')
  },
}

// Pre-applied status filter — shows the toolbar mid-use, filtered down to one status.
export const FilteredState = {
  name: 'Filtered state',
  render: () => <ProductLinesTable initialStatus="Draft" />,
}

// No row matches the search — the empty state, not a bare zero-row table.
export const EmptyState = {
  name: 'Empty state',
  render: () => <ProductLinesTable initialSearch="zzz-no-match" />,
}
