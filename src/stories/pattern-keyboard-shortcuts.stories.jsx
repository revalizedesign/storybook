import { Kbd } from '@/components/ui/kbd'

export default {
  title: 'Microinteractions/Layout & Content/Keyboard shortcuts',
  parameters: {
    docs: { description: { component: 'Power-user shortcuts standardized across products. ⌘K (global search) is the most important to lock in first.' } },
  },
}

const shortcuts = [
  [['⌘', 'K'], 'Global search', 'universal'],
  [['⌘', 'N'], 'New configuration', 'pages with + New'],
  [['⌘', 'S'], 'Save / autosave', 'forms'],
  [['⌘', 'Z'], 'Undo last action', 'after bulk ops'],
  [['Esc'], 'Close drawer or dialog', 'universal'],
]

export const Default = {
  render: () => (
    <div className="w-96 rounded-lg border divide-y">
      {shortcuts.map(([keys, label, ctx]) => (
        <div key={label} className="flex items-center justify-between px-4 py-2.5">
          <div>
            <div className="text-sm">{label}</div>
            <div className="text-xs text-muted-foreground">{ctx}</div>
          </div>
          <div className="flex gap-1">{keys.map(k => <Kbd key={k}>{k}</Kbd>)}</div>
        </div>
      ))}
    </div>
  ),
}
