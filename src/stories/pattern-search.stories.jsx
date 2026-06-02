import { InputGroup, InputGroupAddon } from '@/components/ui/input-group'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'

export default {
  title: 'Design patterns/Data/Search — exact + fuzzy',
  parameters: {
    docs: { description: { component: '**Missing · New** · Critical. Top priority (Jessica/Kiana, 05/27). Consistent across all products. Exact match first, show match type, min 3 chars, debounce 300ms, ⌘K global shortcut. AI/natural-language tier is a later layer.' } },
  },
}

const results = [
  ['Hydro-Pro Series', 'exact match', 'default'],
  ['Hydraulic Control Unit', 'fuzzy match', 'secondary'],
  ['High-pressure pump system', 'AI match', 'outline'],
]

export const Default = {
  render: () => (
    <div className="w-96 flex flex-col gap-2">
      <InputGroup>
        <InputGroupAddon><Search className="size-4" /></InputGroupAddon>
        <Input defaultValue="hydraulic pump series" />
      </InputGroup>
      <div className="rounded-lg border divide-y">
        {results.map(([name, label, variant]) => (
          <div key={name} className="flex items-center justify-between gap-2 px-3 py-2">
            <span className="text-sm">{name}</span>
            <Badge variant={variant}>{label}</Badge>
          </div>
        ))}
      </div>
    </div>
  ),
}
