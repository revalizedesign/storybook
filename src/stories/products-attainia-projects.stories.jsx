import { PageHeader } from '@/components/PageHeader'
import { SlotShell } from '@/components/SlotShell'
import { Fa } from '@/components/Fa'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarTrigger } from '@/components/ui/sidebar'
import projects from './products-attainia-projects.json'

/*
 * Products/Attainia/Projects — recreation of the Attainia "Projects" list page.
 *
 * Built EXCLUSIVELY from components that already exist in this repo; every component below was
 * verified against its source file before use (no shadcn-docs / memory guesses). It is composed
 * hand-written in a render() (Configure One's authoring style) rather than data-driven via
 * SlotMachine, because the iteration-1 "Create" dropdown button cannot be expressed in the current
 * SlotMachine JSON schema (which renders flat components + one nested slot, with no way to compose
 * DropdownMenuTrigger render={<Button/>} + DropdownMenuContent + items). The page still renders
 * inside the real Attainia app frame by passing a hand-written `slot` fn to SlotShell — the same
 * SlotShell + blue-rail brand the Attainia "App shell" story uses.
 *
 * ── (a) COMPONENT INVENTORY USED (verified at path) ──────────────────────────────────────────────
 *   PageHeader                — src/components/PageHeader.jsx     (title, lede, breadcrumbs props)
 *   Breadcrumbs               — via PageHeader (breadcrumbs prop; items are {label, href} objects)
 *   Button                    — src/components/ui/button.jsx      (variant: secondary | default)
 *   DropdownMenu + Trigger    — src/components/ui/dropdown-menu.jsx
 *     + Content + Item          (Trigger composes onto Button via Base UI render prop, not asChild)
 *   Fa                        — src/components/Fa.jsx             (icon name is a string, e.g. "download")
 *   SlotShell                 — src/components/SlotShell.jsx      (the Attainia app frame)
 *   SidebarTrigger / SidebarMenuButton / SidebarMenuItem / SidebarMenuSub / SidebarMenuSubButton
 *                             — src/components/ui/sidebar.jsx     (nav, reproduced from Attainia's slots)
 *
 * ── (b) COMPONENT / VARIANT GAPS FOUND ───────────────────────────────────────────────────────────
 *   None for iteration 1. PageHeader has no built-in actions slot, but that is a LAYOUT concern, not
 *   a missing component: the Export/Create actions are composed beside PageHeader in a flex row here
 *   (composition, not raw-HTML approximation of any missing component). No GAP placeholders were
 *   needed. (If a future iteration surfaces UI with no matching component, render a dashed-border
 *   box labeled "GAP: <what's missing>" and list it here.)
 *
 * ── (c) ASSUMPTIONS ──────────────────────────────────────────────────────────────────────────────
 *   - Breadcrumb "Projects" single-level: rendered as [{ label: 'Projects' }]. Breadcrumbs always
 *     prepends a Home icon crumb and renders the last item as the bold current page — so this shows
 *     Home › Projects, which is the parent-link pattern the brief describes.
 *   - "Export" secondary button uses variant="secondary" + Fa "download".
 *   - "Create" primary uses the default (primary) Button variant as a DropdownMenu trigger.
 *   - The page renders inside the Attainia app shell (confirmed with the user) using the same blue
 *     rail brand tokens as products-attainia.stories.jsx.
 *   - Header/nav content is reproduced from products-attainia.json so the frame matches the existing
 *     Attainia "App shell" screen; mock data lives in the colocated products-attainia-projects.json.
 */

// Attainia's inverted blue rail — brand tokens applied to the shell's own Sidebar CSS variables,
// copied verbatim from products-attainia.stories.jsx (product config, not a design-system frame).
const brand =
  '[--sidebar:#1d4ed8] [--sidebar-foreground:#ffffffd9] [--sidebar-primary:#ffffff] [--sidebar-primary-foreground:#1d4ed8] [--sidebar-accent:#ffffff1f] [--sidebar-accent-foreground:#ffffff] [--sidebar-border:#ffffff2e] [--sidebar-ring:#ffffff3d]'

const CreateMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger render={<Button />}>
      <Fa name="plus" />
      <span>Create</span>
      <Fa name="chevron-down" className="size-3" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {projects.createMenu.map(item => (
        <DropdownMenuItem key={item.label}>
          <Fa name={item.icon} />
          {item.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

// Iteration 1 — the page-header block: breadcrumb + title + lede on the left, Export + Create on the right.
const ProjectsPageHeader = () => (
  <div className="flex items-end justify-between gap-4">
    <PageHeader
      breadcrumbs={[{ label: 'Projects' }]}
      lede="Manage facility planning projects for your organization"
      title="Projects"
    />
    {/* Create is the only page-level CTA. Export intentionally lives NOT here — it moves to the
        table toolbar in the next slice (see TODO(iter2) below). */}
    <div className="flex items-center gap-2">
      <CreateMenu />
    </div>
  </div>

  // ── ITERATION 2 (stub — do NOT build yet) ──────────────────────────────────────────────────────
  // TODO(iter2): Resume banner — info Alert with icon, title, supporting text, "Discard" (ghost) +
  //   "Resume" (primary) actions. (Verify: src/components/ui/alert.jsx variants before building.)
  // TODO(iter2): 5 stat cards row — icon, label, large value, caption. (Verify: ui/card.jsx.)
  // TODO(iter2): Tabs with counts — All (23), My Projects (9), Drafts (1), Archived (14).
  //   (Verify: ui/tabs.jsx — line vs default TabsList variant.)
  // TODO(iter2): Toolbar — Export (secondary, Fa "download") moves here, alongside search input +
  //   filter dropdowns (Status, Type, Owner, Modified) + view toggle. Export is a toolbar action,
  //   not a page-level CTA. (Verify: ui/input.jsx, ui/select.jsx or DropdownMenu, components/ViewToggle.jsx.)
  // TODO(iter2): Data table — columns Project, Type, Source, Status, Owner, GPO Savings, Modified,
  //   with mock data. (Verify: ui/table.jsx, ui/badge.jsx for Status.)
)

// Reproduce the Attainia frame's header + nav (hand-written mirror of products-attainia.json) so the
// Projects page sits in the same shell as the "App shell" story. Only the page-header slot is new.
const slot = (id) => {
  switch (id) {
    case 'header-left':
      return [
        <SidebarTrigger key="trigger" />,
        <div key="logo" className="size-8 rounded-full bg-neutral-800" />,
        <span key="brand" className="text-xl font-semibold tracking-wide text-gray-500">PLAN·IT</span>,
      ]
    case 'header-right-nav':
      return [
        <Button key="help" variant="ghost"><Fa name="user-question" /></Button>,
        <Button key="tasks" variant="ghost"><Fa name="list-check" /></Button>,
      ]
    case 'header-right':
      return [
        <div key="avatar" className="flex size-8 items-center justify-center rounded-full bg-rose-900 text-white">T</div>,
        <span key="org">Test organization</span>,
      ]
    case 'main-nav-items':
      return projects.nav.map(item =>
        item.sub ? (
          <SidebarMenuItem key={item.span}>
            <SidebarMenuButton isActive={item.isActive}><Fa name={item.icon} /><span>{item.span}</span></SidebarMenuButton>
            <SidebarMenuSub>
              {item.sub.map(s => (
                <SidebarMenuSubButton key={s.span}><Fa name={s.icon} /><span>{s.span}</span></SidebarMenuSubButton>
              ))}
            </SidebarMenuSub>
          </SidebarMenuItem>
        ) : (
          <SidebarMenuButton key={item.span} isActive={item.isActive}><Fa name={item.icon} /><span>{item.span}</span></SidebarMenuButton>
        )
      )
    case 'page-header':
      return <ProjectsPageHeader />
    default:
      return null
  }
}

export default {
  title: 'Products/Attainia/Projects',
  parameters: {
    a11y: { test: 'error' },
    layout: 'fullscreen',
  },
}

export const ProjectsList = {
  name: 'Projects list',
  render: () => <SlotShell slot={slot} sidebar={{ className: brand }} />,
}
