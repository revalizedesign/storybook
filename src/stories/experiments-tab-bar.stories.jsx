import { useState } from 'react'
import { Fa } from '@/components/Fa'
import { TabBar, c1Tabs } from '@/components/TabBar'
import { cn } from '@/lib/utils'

export default {
  title: 'Originals/Tab bar',
  component: TabBar,
  parameters: {
    docs: {
      description: {
        component:
          'Chip-style `#tab-bar` from c1c-admin (`.chip-tab` pills + `.tab-sep` separators). Eight product tabs in three groups; the active chip gets an accent and its source `--color-*` on the icon.',
      },
    },
  },
}

export const Default = {
  render: () => {
    const [value, setValue] = useState('model')
    const current = c1Tabs.find((t) => t.key === value)
    return (
      <div className="space-y-3">
        <TabBar value={value} onChange={setValue} />
        <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-6 text-sm text-muted-foreground">
          <Fa name={current.icon} className={cn(current.color)} />
          {current.label} pane
        </div>
      </div>
    )
  },
}
