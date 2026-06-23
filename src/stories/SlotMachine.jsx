import { useState } from 'react'
import { LayoutFrame } from '@/components/LayoutFrame'
import { Textarea } from '@/components/ui/textarea'
import { Fa } from '@/components/Fa'

// Every PascalCase export from our components — shadcn-managed (components/ui) and our own authored
// ones (components root, e.g. Band, PageHeader, Fa) — keyed by its real name, so the data can name
// any component (Button, SidebarMenuButton, PageHeader, …). No curated allowlist, no kebab aliases.
const components = {}
for (const mod of Object.values(import.meta.glob(['../components/ui/*.jsx', '../components/*.jsx'], { eager: true }))) {
  for (const [name, exported] of Object.entries(mod)) {
    if (/^[A-Z]/.test(name)) components[name] = exported
  }
}

// BUTTONS ONLY: the three button components compose their own icon (`name` → Fa) and text (`span`).
// We wrap the real button in place, keyed by its real name, so the data still says `SidebarMenuButton`
// (never an alias) — the wrapper just adds the icon/text. Nothing else is wrapped; everything renders raw.
const withIconText = Button => {
  const Wrapped = ({ name, span, children, ...props }) => (
    <Button {...props}>
      {name && <Fa name={name} />}
      {span != null && <span>{span}</span>}
      {children}
    </Button>
  )
  Wrapped.displayName = Button.displayName ?? Button.name
  return Wrapped
}
for (const n of ['Button', 'SidebarMenuButton', 'SidebarMenuSubButton']) components[n] = withIconText(components[n])

// Render one item: its component (or tag) with its props, plus any `nest`ed slot as its children.
// No content magic here — buttons own theirs; everything else passes props/children straight through.
function slottedEl(item, renderSlot, key) {
  const { slot, component, tag, nest, ...props } = item // eslint-disable-line no-unused-vars
  const Component = components[component] ?? tag ?? 'div'
  return nest
    ? <Component key={key} {...props}>{renderSlot(nest)}</Component>
    : <Component key={key} {...props} />
}

// Hydrate a flat array into a recursive renderSlot(slot): a `default` item seeds a slot's defaults,
// every other item renders into its `slot`, and an item's `sub` slot resolves through the same fn.
function hydrate(data) {
  const defaults = {}
  const content = []
  for (const obj of Array.isArray(data) ? data : []) {
    if (!obj || !obj.slot) continue
    if (obj.default) defaults[obj.slot] = obj.default
    else content.push(obj)
  }
  const renderSlot = id => content.filter(it => it.slot === id).map((it, i) => slottedEl({ ...defaults[it.slot], ...it }, renderSlot, i))
  return renderSlot
}

// The slot machine behind every Layout story: a frame (the generic LayoutFrame by default, or a
// per-example frame), hydrated from a flat slots array, with the json slot holding that same array
// as editable/read-only JSON. Collapse state lives in the frame's own SidebarProvider, not here.
export function SlotMachine({ frame: Frame = LayoutFrame, slots, wireframe = false }) {
  const [text, setText] = useState(JSON.stringify(slots, null, 2))
  const [data, setData] = useState(slots)
  const onChange = e => {
    setText(e.target.value)
    try { setData(JSON.parse(e.target.value)) } catch { /* keep last valid */ }
  }
  const renderSlot = hydrate(data)
  const json = (
    <div className="flex min-h-0 flex-1 flex-col">
      <Textarea value={text} onChange={onChange} spellCheck={false} className="min-h-0 flex-1 resize-none font-mono" />
    </div>
  )
  return (
    <div className="h-screen">
      <Frame wireframe={wireframe} slot={id => (id === 'json' ? json : renderSlot(id))} />
    </div>
  )
}
