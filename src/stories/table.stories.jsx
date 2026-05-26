import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

export default {
  title: 'shadcn/Table',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/table">Table - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableCell>Alice</TableCell><TableCell>Active</TableCell><TableCell>Admin</TableCell></TableRow>
        <TableRow><TableCell>Bob</TableCell><TableCell>Inactive</TableCell><TableCell>User</TableCell></TableRow>
      </TableBody>
    </Table>
  ),
}
