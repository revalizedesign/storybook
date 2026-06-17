import { useState } from 'react'
import { Fa } from '@/components/Fa'
import { cn } from '@/lib/utils'

// TabBar — the chip-style #tab-bar from c1c-admin (.chip-tab pills + .tab-sep dividers). The eight
// product tabs in three groups; the active chip gets an accent and its source --color-* on the icon.
// Controlled via `value`/`onChange`; `sep` marks a divider before a chip.
// eslint-disable-next-line react-refresh/only-export-components
export const c1Tabs = [
  { color: null, icon: 'table-list', key: 'overview', label: 'Overview' },
  { color: null, icon: 'folder', key: 'files', label: 'Files' },
  { color: 'text-blue-500', icon: 'cube', key: 'model', label: 'Model', sep: true },
  { color: 'text-amber-500', icon: 'code-branch', key: 'rules', label: 'Rules' },
  { color: 'text-green-500', icon: 'barcode', key: 'results', label: 'Results' },
  { color: null, icon: 'eye', key: 'preview', label: 'Preview', sep: true },
  { color: null, icon: 'badge-check', key: 'verify', label: 'Verify' },
  { color: null, icon: 'cloud-arrow-up', key: 'commit', label: 'Commit' },
]

export function TabBar({ className, defaultValue = 'overview', onChange, tabs = c1Tabs, value }) {
  const [internal, setInternal] = useState(defaultValue)
  const active = value ?? internal
  const select = (key) => {
    if (value === undefined) setInternal(key)
    onChange?.(key)
  }
  return (
    <div className={cn('flex flex-wrap items-center gap-1', className)}>
      {tabs.map((t) => (
        <div key={t.key} className="flex items-center gap-1">
          {t.sep && <span className="mx-1 h-4 w-px bg-border" />}
          <button
            type="button"
            onClick={() => select(t.key)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
              active === t.key && 'bg-accent font-medium text-accent-foreground',
            )}
          >
            <Fa name={t.icon} className={cn(active === t.key && t.color)} />
            {t.label}
          </button>
        </div>
      ))}
    </div>
  )
}
