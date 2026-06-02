import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default {
  title: 'Design patterns/Feedback & Status/Audit trail',
  parameters: {
    docs: { description: { component: '**Missing · New** · High. Enterprise B2B compliance: who changed what and when. Lives in the detail drawer "Activity" tab. Newest first, avatar + name + action + timestamp, real field names and values.' } },
  },
}

const entries = [
  ['JP', 'Jonathan Pacheco', 'changed base price from $1,200 to $1,450', '2 hours ago'],
  ['KW', 'Kiana Williams', 'approved for production', 'Yesterday'],
  ['MB', 'Matt Born', 'updated compliance certification to ISO 9001', '2 days ago'],
  ['LP', 'Luisa Parra', 'created product configuration', '3 days ago'],
]

export const Default = {
  render: () => (
    <div className="w-96 flex flex-col">
      {entries.map(([initials, name, action, time]) => (
        <div key={name} className="flex items-start gap-3 py-3 border-b last:border-0">
          <Avatar className="size-7"><AvatarFallback className="text-xs">{initials}</AvatarFallback></Avatar>
          <div className="flex-1">
            <p className="text-sm"><span className="font-medium">{name}</span> <span className="text-muted-foreground">{action}</span></p>
            <p className="text-xs text-muted-foreground">{time}</p>
          </div>
        </div>
      ))}
    </div>
  ),
}
