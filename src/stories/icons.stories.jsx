import { Fa } from '@/components/Fa'
import { Search, Plus, Check, X, ChevronRight, Download, Trash2, Eye, Filter, Folder } from 'lucide-react'

export default {
  title: 'Foundations/Icons',
  parameters: {
    docs: {
      description: {
        component:
          'Two icon sources. **Font Awesome** (the same Pro kit c1c-admin uses, loaded in preview-head) for patterns migrated from c1c-admin — reuse the exact class names via `<Fa name="folder" />` (regular) or `<Fa name="xmark" variant="solid" />`. **lucide-react** for new React-native work — `import { Search } from "lucide-react"`.',
      },
    },
  },
}

// The c1c-admin icon vocabulary, grouped by FA variant.
const regular = [
  'arrow-right-arrow-left', 'arrows-from-line', 'badge-check', 'barcode', 'bars-filter', 'box-open',
  'brackets-curly', 'chart-network', 'circle-check', 'clock', 'cloud-arrow-up', 'code-branch', 'cube',
  'diagram-project', 'ellipsis', 'eye', 'file', 'file-arrow-up', 'file-pdf', 'filter', 'folder',
  'folder-tree', 'forward', 'forward-fast', 'grid-2', 'input-text', 'layer-group', 'list', 'list-tree',
  'paperclip', 'repeat', 'sitemap', 'sliders', 'square-poll-horizontal', 'superscript', 'table',
  'table-cells', 'table-columns', 'table-list', 'trash-can',
]
const solid = [
  'angle-down', 'angle-right', 'angle-up', 'arrow-up-right-from-square', 'download', 'grip-vertical',
  'lock', 'paper-plane', 'plus', 'xmark',
]

const Cell = ({ children, label }) => (
  <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-3 text-center">
    <div className="text-lg text-foreground">{children}</div>
    <div className="text-[10px] text-muted-foreground break-all leading-tight">{label}</div>
  </div>
)

const Grid = ({ children }) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">{children}</div>
)

export const FontAwesome = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">Regular — <code>&lt;Fa name="folder" /&gt;</code></h3>
        <Grid>{regular.map(n => <Cell key={n} label={n}><Fa name={n} /></Cell>)}</Grid>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Solid — <code>&lt;Fa name="xmark" variant="solid" /&gt;</code></h3>
        <Grid>{solid.map(n => <Cell key={n} label={n}><Fa name={n} variant="solid" /></Cell>)}</Grid>
      </div>
    </div>
  ),
}

export const Lucide = {
  render: () => (
    <Grid>
      {[['Search', Search], ['Plus', Plus], ['Check', Check], ['X', X], ['ChevronRight', ChevronRight], ['Download', Download], ['Trash2', Trash2], ['Eye', Eye], ['Filter', Filter], ['Folder', Folder]].map(([label, Icon]) => (
        <Cell key={label} label={label}><Icon className="size-5" /></Cell>
      ))}
    </Grid>
  ),
}
