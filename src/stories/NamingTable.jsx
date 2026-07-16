import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import data from './configureone-aiadmin-july.json'

// A child placement nests under the parent placement with the highest tier ≤ its own
// (Source tier 1 under Product tier 1; Context tier 3 under the tier-2 Catalog layer, not app-level Catalog).
const placementsOf = (name) => data.objects.find(o => o.names[0] === name)?.placements ?? []
const attachTier = (p) => {
  const tiers = placementsOf(p.parent).map(x => x.tier)
  const under = tiers.filter(t => t <= p.tier)
  return under.length ? Math.max(...under) : Math.min(...tiers)
}
const childrenOf = (name, tier) => data.objects
  .flatMap(o => o.placements.filter(p => p.parent === name && attachTier(p) === tier).map(p => ({ o, p })))
  .sort((a, b) => a.p.tier - b.p.tier || a.o.names[0].localeCompare(b.o.names[0]))
const walk = (name, tier, depth) => childrenOf(name, tier).flatMap(({ o, p }) => [{ depth, o, p }, ...walk(o.names[0], p.tier, depth + 1)])

const root = data.objects.find(o => o.placements.some(p => p.parent === null))
const rows = [{ depth: 0, o: root, p: root.placements[0] }, ...walk(root.names[0], 0, 1)]
const indent = ['', 'pl-4', 'pl-8', 'pl-12', 'pl-16', 'pl-20']

const Muted = ({ items }) => <TableCell className="text-muted-foreground">{items?.length ? items.join(', ') : ''}</TableCell>

export function NamingTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Formerly</TableHead>
          <TableHead>Object</TableHead>
          <TableHead>Tier</TableHead>
          <TableHead>Aliases</TableHead>
          <TableHead>Group</TableHead>
          <TableHead>Scope</TableHead>
          <TableHead>Min</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ depth, o, p }) => (
          <TableRow key={`${p.parent}/${o.names[0]}`}>
            <Muted items={o.formerly} />
            <TableCell className={cn('font-semibold', indent[depth])}>{o.names[0]}</TableCell>
            <TableCell>{p.tier}</TableCell>
            <Muted items={o.names.slice(1)} />
            <Muted items={o.group} />
            <TableCell className="text-muted-foreground">{o.scope ?? ''}</TableCell>
            <TableCell>{o.min ?? ''}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
