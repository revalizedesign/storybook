import { Badge } from '@/components/ui/badge'
import { Plus } from 'lucide-react'

export default {
  title: 'Design patterns/Layout & Content/Tagging',
  parameters: {
    docs: { description: { component: '**Already built** · High. User-defined labels with overflow (+N). Show max 3 inline, "+ Add tag" in edit mode, lowercase, max 20 chars. Needs to become a standalone reusable component.' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="secondary">hydraulic</Badge>
      <Badge variant="secondary">certified</Badge>
      <Badge variant="secondary">industrial</Badge>
      <span className="text-sm font-medium text-muted-foreground">+2</span>
      <Badge variant="outline" className="border-dashed text-muted-foreground cursor-pointer"><Plus className="size-3" /> Add tag</Badge>
    </div>
  ),
}
