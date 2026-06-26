import { SlotMachine } from './SlotMachine'
import { SlotShell } from '@/components/SlotShell'

export default {
  title: 'Layout/Slot shell',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `A rapid prototyping shell driven by flat JSON arrays. Each item targets a named slot; the SlotMachine hydrates the array into the layout and provides an editable JSON editor to tweak it live.

**How it works:** A frame (SlotShell or any custom JSX) defines the layout with named regions. A flat JSON array populates those regions — each object has a \`slot\` key that routes it to the right place. The \`component\` key maps to any shadcn or custom component. The \`nest\` key enables recursive composition.

**Available slots:**
- **header-left** · **header-left-nav** · **header-right-nav** · **header-right** — top bar
- **main-nav-top** · **main-nav-items** · **main-nav-bottom** — collapsible sidebar
- **nav-pane** · **chat-panel** — secondary panels between sidebar and content
- **toolbar-left** · **toolbar-right** — content toolbar
- **page-header** — page title area
- **pane-left** · **pane-right** — content side panels
- **json** — main content (the JSON editor)
- **footer-left** · **footer-right** — bottom bar

**Slot conventions:**
- \`default\` items set shared props for all items in that slot
- \`nest\` renders child items as children of the component
- \`component\` resolves to any PascalCase export from components/ui or components
- \`tag\` renders a plain HTML element

For production product layouts, use **App shell** instead.`,
      },
    },
  },
}

const VOCABULARY = [
  { "slot": "header-left", "component": "SidebarTrigger" },
  { "slot": "header-left", "children": "header-left" },
  { "slot": "header-left-nav", "children": "header-left-nav" },
  { "slot": "header-right-nav", "children": "header-right-nav" },
  { "slot": "header-right", "children": "header-right" },
  { "slot": "main-nav-items", "component": "SidebarMenuButton", "span": "main-nav-items" },
  { "slot": "nav-pane", "children": "nav-pane" },
  { "slot": "chat-panel", "children": "chat-panel" },
  { "slot": "toolbar-left", "children": "toolbar-left" },
  { "slot": "toolbar-right", "children": "toolbar-right" },
  { "slot": "page-header", "children": "page-header" },
  { "slot": "pane-left", "children": "pane-left" },
  { "slot": "pane-right", "children": "pane-right" },
  { "slot": "footer-left", "children": "footer-left" },
  { "slot": "footer-right", "children": "footer-right" },
]

const MINIMAL = [
  { "slot": "header-left", "component": "SidebarTrigger" },
  { "slot": "main-nav-items", "component": "SidebarMenuButton", "name": "grip", "span": "Nav item" },
]

export const Slots = { render: () => <SlotMachine frame={SlotShell} slots={VOCABULARY} /> }
export const Minimal = { render: () => <SlotMachine frame={SlotShell} slots={MINIMAL} /> }
