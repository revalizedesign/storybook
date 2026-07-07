import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import data from './status.json'

const HoursBadge = ({ value }) => (
  <Badge className={cn(data.hours[value] ?? data.hours['0 hrs'])}>{value}</Badge>
)

const TargetCell = ({ month }) => (
  <Badge className={cn(data.monthStyle[month] ?? data.monthStyle.September)}>{month}</Badge>
)

const rowFor = (title) => {
  const m = data.meta[title] ?? {}
  return {
    designer: m.designer ?? 'Unassigned',
    reviewer: m.reviewer ?? '—',
    target: m.target ?? 'September',
    difficulty: m.difficulty ?? '—',
    hours: m.hours ?? '0 hrs',
    next: m.next ?? '—',
    status: m.status ?? 'Unknown',
  }
}

const buildTree = () => {
  const groups = new Map()
  for (const title of data.titles) {
    const [group, ...rest] = title.split('/')
    const section = rest.length > 1 ? rest[0] : ''
    const name = rest[rest.length - 1]
    if (!groups.has(group)) groups.set(group, new Map())
    const sections = groups.get(group)
    if (!sections.has(section)) sections.set(section, [])
    sections.get(section).push({ title, name })
  }
  return groups
}

export function StatusTable() {
  const groups = buildTree()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[28%]">Item</TableHead>
          <TableHead>Designer</TableHead>
          <TableHead>Hours</TableHead>
          <TableHead>Target</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Reviewer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Next</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.groupOrder.filter(g => groups.has(g)).flatMap(group => {
          const rows = [
            <TableRow key={group} className="bg-muted/60">
              <TableCell colSpan={8} className="font-semibold">{group}</TableCell>
            </TableRow>,
          ]
          for (const [section, items] of groups.get(group)) {
            if (section) {
              rows.push(
                <TableRow key={`${group}/${section}`} className="bg-muted/30">
                  <TableCell colSpan={8} className="pl-6 font-semibold text-muted-foreground">{section}</TableCell>
                </TableRow>
              )
            }
            for (const it of items) {
              const r = rowFor(it.title)
              rows.push(
                <TableRow key={it.title}>
                  <TableCell className={section ? 'pl-10' : 'pl-6'}>{it.name}</TableCell>
                  <TableCell className="text-muted-foreground">{r.designer}</TableCell>
                  <TableCell><HoursBadge value={r.hours} /></TableCell>
                  <TableCell><TargetCell month={r.target} /></TableCell>
                  <TableCell className="text-muted-foreground">{r.difficulty}</TableCell>
                  <TableCell className="text-muted-foreground">{r.reviewer}</TableCell>
                  <TableCell><Badge variant={data.statusVariant[r.status] ?? 'outline'}>{r.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{r.next}</TableCell>
                </TableRow>
              )
            }
          }
          return rows
        })}
      </TableBody>
    </Table>
  )
}
