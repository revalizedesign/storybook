import { Spinner } from '@/components/ui/spinner'
import { Check } from 'lucide-react'

export default {
  title: 'Microinteractions/Forms & Input/Autosave',
  parameters: {
    docs: { description: { component: 'CPQ configs take 30+ min; lost work is the #1 complaint. Save every 30s and on change. Show status: Saving… → Saved just now → Saved 2 min ago. Manual save with ⌘S.' } },
  },
}

export const Default = {
  render: () => (
    <div className="w-80 flex flex-col gap-2">
      <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700">
        <span className="flex items-center gap-2 text-sm font-medium"><Check className="size-4" /> Draft saved automatically</span>
        <span className="text-xs text-muted-foreground">just now</span>
      </div>
      <div className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-muted-foreground">
        <Spinner className="size-3" /> Saving…
      </div>
    </div>
  ),
}
