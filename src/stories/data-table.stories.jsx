import { useState, useCallback, useRef } from 'react'
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Search, ArrowUp, ArrowDown, ArrowUpDown, Columns3, ListFilter, Download, Upload, X, Pencil, Trash2 } from 'lucide-react'
import { DataEditor, GridCellKind } from '@glideapps/glide-data-grid'
import '@glideapps/glide-data-grid/dist/index.css'
import rows from './data-table.json'

export default {
  title: 'Libraries/Data table',
  parameters: {
    docs: {
      description: {
        component: `<a href="https://tanstack.com/table">TanStack Table</a> · <a href="https://grid.glideapps.com">Glide Data Grid</a>

**Jonathan:** **Data table:** Every Revalize product has at least one. Row hover, Name column is always a link, numeric columns right-aligned. Always ships with empty + loading states.

**Column filter + sort:** Search input + Columns toggle live in the DataTable toolbar. Click a header to sort. Users sort by date, status and name constantly.

**Bulk actions:** Select rows → action bar replaces the toolbar with contextual ops. Shows count, Clear always visible, destructive actions red, confirm before irreversible bulk ops.

**Export:** We have Import — Export must match and pair with it. Export only the filtered/visible data (not all records) and show the count in the label.

**Inline editing:** Click a cell to edit directly — no drawer. Simple fields only (text, number, select); complex edits go to a drawer. Enter to save, Escape to cancel, edited row gets a left-border accent.`,
      },
    },
  },
}

const statusVariant = { Active: 'secondary', Draft: 'outline', Archived: 'ghost' }

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'partNumber', header: 'Part number' },
  { accessorKey: 'status', header: 'Status', cell: ({ getValue }) => <Badge variant={statusVariant[getValue()]}>{getValue()}</Badge> },
  { accessorKey: 'price', header: 'Price', cell: ({ getValue }) => `$${getValue().toLocaleString()}` },
]

export const Default = {
  render: () => {
    const [sorting, setSorting] = useState([])
    const table = useReactTable({
      data: rows,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: setSorting,
      state: { sorting },
    })
    return (
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(group => (
            <TableRow key={group.id}>
              {group.headers.map(header => (
                <TableHead key={header.id} className="cursor-pointer select-none" onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{ asc: ' ↑', desc: ' ↓' }[header.column.getIsSorted()] ?? ''}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}

const glideColumns = [
  { title: 'Name', id: 'name', kind: GridCellKind.Text, themeOverride: { baseFontStyle: 'bold 14px' } },
  { title: 'Part number', id: 'partNumber', kind: GridCellKind.Text },
  { title: 'Status', id: 'status', kind: GridCellKind.Text },
  { title: 'Price', id: 'price', kind: GridCellKind.Number, format: v => `$${v.toLocaleString()}`, contentAlign: 'right' },
]

const kitchenColumns = [
  { id: 'select', header: ({ table }) => <Checkbox checked={table.getIsAllRowsSelected()} onCheckedChange={v => table.toggleAllRowsSelected(!!v)} />, cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={v => row.toggleSelected(!!v)} />, enableSorting: false },
  { accessorKey: 'name', header: 'Name', cell: ({ getValue }) => <a href="#" className="font-medium text-primary">{getValue()}</a> },
  { accessorKey: 'partNumber', header: 'Part number' },
  { accessorKey: 'status', header: 'Status', cell: ({ getValue }) => <Badge variant={statusVariant[getValue()]}>{getValue()}</Badge> },
  { accessorKey: 'price', header: 'Price', cell: ({ getValue }) => `$${getValue().toLocaleString()}`, meta: { align: 'right' } },
  { id: 'actions', header: '', enableSorting: false, cell: () => (
    <div className="flex justify-end gap-1 opacity-0 group-hover/row:opacity-100">
      <Button variant="ghost" size="icon-sm"><Pencil /></Button>
      <Button variant="ghost" size="icon-sm"><Trash2 /></Button>
    </div>
  ) },
]

function SortHeader({ column, children }) {
  const sorted = column.getIsSorted()
  return (
    <button className="group/sort flex items-center gap-1" onClick={column.getToggleSortingHandler()}>
      {children}
      {sorted === 'asc' ? <ArrowUp className="size-3" /> : sorted === 'desc' ? <ArrowDown className="size-3" /> : <ArrowUpDown className="size-3 opacity-0 group-hover/sort:opacity-40" />}
    </button>
  )
}

export const KitchenSink = {
  name: 'Kitchen sink',
  render: () => {
    const [sorting, setSorting] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [rowSelection, setRowSelection] = useState({})
    const table = useReactTable({
      data: rows,
      columns: kitchenColumns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      onGlobalFilterChange: setGlobalFilter,
      onRowSelectionChange: setRowSelection,
      state: { sorting, globalFilter, rowSelection },
    })
    const selectedCount = Object.keys(rowSelection).length
    return (
      <div className="flex flex-col gap-3">
        {selectedCount > 0 ? (
          <div className="flex items-center justify-between rounded-lg border bg-accent/40 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <span className="font-medium">{selectedCount} items selected</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Export</Button>
              <Button variant="outline" size="sm">Archive</Button>
              <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
              <Button variant="ghost" size="sm" onClick={() => setRowSelection({})}><X className="size-4" /> Clear</Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <InputGroup className="flex-1">
              <InputGroupAddon><Search className="size-4" /></InputGroupAddon>
              <InputGroupInput placeholder="Search products..." value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} />
            </InputGroup>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}><Columns3 className="size-4" /> Columns</DropdownMenuTrigger>
              <DropdownMenuContent>
                {table.getAllColumns().filter(c => c.id !== 'select').map(col => (
                  <DropdownMenuCheckboxItem key={col.id} checked={col.getIsVisible()} onCheckedChange={v => col.toggleVisibility(!!v)}>{col.columnDef.header}</DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline"><ListFilter className="size-4" /> Filters</Button>
            <Button variant="outline"><Upload className="size-4" /> Import</Button>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button />}><Download className="size-4" /> Export</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Export {table.getFilteredRowModel().rows.length} results as…</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>CSV (.csv)</DropdownMenuItem>
                <DropdownMenuItem>Excel (.xlsx)</DropdownMenuItem>
                <DropdownMenuItem>PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(group => (
                <TableRow key={group.id} className="bg-muted/50">
                  {group.headers.map(header => (
                    <TableHead key={header.id} className={header.column.columnDef.meta?.align === 'right' ? 'text-right' : ''}>
                      {header.isPlaceholder ? null : header.column.getCanSort()
                        ? <SortHeader column={header.column}>{flexRender(header.column.columnDef.header, header.getContext())}</SortHeader>
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className="group/row">
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className={cell.column.columnDef.meta?.align === 'right' ? 'text-right' : ''}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{table.getFilteredRowModel().rows.length} results</span>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" aria-disabled className="pointer-events-none opacity-50" /></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    )
  },
}

export const ExcelMode = {
  name: 'Excel mode',
  parameters: { layout: 'fullscreen' },
  render: () => {
    const dataRef = useRef(rows.map(r => ({ ...r })))
    const getCellContent = useCallback(([col, row]) => {
      const { id, kind, format } = glideColumns[col]
      const val = dataRef.current[row][id]
      const { contentAlign, themeOverride } = glideColumns[col]
      return { kind, allowOverlay: true, displayData: format ? format(val) : String(val), data: kind === GridCellKind.Number ? val : String(val), contentAlign, themeOverride }
    }, [])
    const onCellEdited = useCallback(([col, row], newValue) => {
      dataRef.current[row][glideColumns[col].id] = newValue.data
    }, [])
    return (
      <div className="h-[400px]">
        <DataEditor columns={glideColumns} rows={dataRef.current.length} getCellContent={getCellContent} onCellEdited={onCellEdited} getCellsForSelection smoothScrollX smoothScrollY width="100%" />
      </div>
    )
  },
}
