import { InputGroup } from '@/components/ui/input-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Send } from 'lucide-react'

export default {
  title: 'Design patterns/Layout & Content/AI sidebar agent',
  parameters: {
    docs: { description: { component: '**Missing · New** · High priority. Storybook priority (Matt, 05/27). Page-aware assistant — reads data, suggests actions, generates configs. Different from a global chatbot. Static first pass; wiring is a later effort.' } },
  },
}

export const Default = {
  render: () => (
    <div className="w-72 h-96 flex flex-col rounded-lg border">
      <div className="flex items-center gap-2 border-b p-3">
        <Sparkles className="size-4 text-violet-600" />
        <span className="text-sm font-semibold">AI Assistant</span>
        <Badge variant="outline" className="ml-auto">page-aware</Badge>
      </div>
      <div className="flex-1 flex flex-col gap-2 p-3 overflow-hidden">
        <div className="rounded-lg bg-violet-50 text-violet-900 p-2 text-sm">You have 3 products with no pricing rules. Want me to suggest rules based on similar products?</div>
        <div className="rounded-lg bg-muted p-2 text-sm self-end">Yes, for Hydro-Pro Series</div>
        <div className="rounded-lg bg-violet-50 text-violet-900 p-2 text-sm">Suggested: base price $1,200, volume discount at 10+…</div>
      </div>
      <div className="border-t p-2 flex gap-2">
        <InputGroup className="flex-1"><Input placeholder="Ask anything…" /></InputGroup>
        <Button size="icon"><Send className="size-4" /></Button>
      </div>
    </div>
  ),
}
