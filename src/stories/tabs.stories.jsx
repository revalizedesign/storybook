import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { createDocsPage } from './DocsPage'
import { List, LayoutGrid, TrendingUp } from 'lucide-react'

export default {
  title: 'shadcn/Tabs',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/tabs">Tabs - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**Tabs for content switching within a page.**

**Types:**
- **Pill-style** (default): Filtering/view modes (Active/Archived/Draft)
- **Underline-style**: Main page navigation
- **Icon-only**: View modes (list, grid, graph)
- **Nested**: Sub-sections within tabs
- **Functional**: State-dependent behavior

**Rules (Revalize):**
- Max 4 tabs per group (5+ use dropdown select)
- Clear semantic labels (not "Tab 1, 2, 3")
- Pill-style for filtering, underline for navigation
- Never mix styles (all pills or all underline)
- Icon + text when possible (icon-only needs tooltip)

**Accessibility:**
- Keyboard: Tab to focus, arrow keys to switch
- aria-selected for current tab
- aria-label for icon-only tabs
- No auto-switching (user clicks to change)

**Product Examples:**
- ConfigureOne: Active/Draft/Archived configs (pill)
- PROCAD: Parts/Assemblies/Documents (pill)
- SpecPage: Overview/Activity/Settings (underline)`,
          Matt: `Current implementation includes the native-style tabs plus an added line style with icons.

**Observations:** Current direction is solid overall. The "never use underline" rule feels too absolute. Tabs serve different purposes depending on context: View modes, Unique page content, Nested child content, Panel-level navigation, Main page navigation, Canvas-style product workflows, Functional tabs in product-specific contexts.

**What's missing:** More exhaustive tab stories. Clearer distinction between tab types and usage contexts. Deprecated tab variants. Guidance for nested, functional, and product-specific tab behavior.

**Roadmap:** Expand tab stories by intent and context. Avoid blanket usage rules until more real product patterns are documented. Add discontinued variants where relevant. Define when underline, native, icon, nested, and functional tabs are appropriate.`,
        },
      }),
    },
  },
}

export const Default = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings here.</TabsContent>
      <TabsContent value="password">Password settings here.</TabsContent>
    </Tabs>
  ),
}

export const WithIcons = {
  name: 'With icons',
  render: () => (
    <Tabs defaultValue="list">
      <TabsList>
        <TabsTrigger value="list"><List /> List</TabsTrigger>
        <TabsTrigger value="grid"><LayoutGrid /> Grid</TabsTrigger>
        <TabsTrigger value="graph"><TrendingUp /> Graph</TabsTrigger>
      </TabsList>
      <TabsContent value="list">List view content.</TabsContent>
      <TabsContent value="grid">Grid view content.</TabsContent>
      <TabsContent value="graph">Graph view content.</TabsContent>
    </Tabs>
  ),
}

export const Line = {
  render: () => (
    <Tabs defaultValue="list">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content.</TabsContent>
      <TabsContent value="activity">Activity content.</TabsContent>
      <TabsContent value="settings">Settings content.</TabsContent>
    </Tabs>
  ),
}

export const FilteringTabs = {
  name: 'Filtering (ConfigureOne)',
  render: () => (
    <Tabs defaultValue="active" className="w-full">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="draft">Draft</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="space-y-2">
        <div className="p-3 border rounded">Hydro-Pro Series</div>
        <div className="p-3 border rounded">Solar Config A</div>
        <div className="p-3 border rounded">Wind Energy X</div>
      </TabsContent>
      <TabsContent value="draft" className="space-y-2">
        <div className="p-3 border rounded">New Template</div>
      </TabsContent>
      <TabsContent value="archived" className="space-y-2">
        <p className="text-sm text-muted-foreground">No archived configurations</p>
      </TabsContent>
    </Tabs>
  ),
}

export const ViewModeTabs = {
  name: 'View Modes (PROCAD)',
  render: () => (
    <Tabs defaultValue="parts">
      <TabsList>
        <TabsTrigger value="parts">Parts</TabsTrigger>
        <TabsTrigger value="assemblies">Assemblies</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      <TabsContent value="parts">
        <div className="space-y-2">
          <div className="p-2 border rounded text-sm">Part HYD-001</div>
          <div className="p-2 border rounded text-sm">Part HYD-002</div>
        </div>
      </TabsContent>
      <TabsContent value="assemblies">
        <div className="p-2 border rounded text-sm">Assembly A-100</div>
      </TabsContent>
      <TabsContent value="documents">
        <div className="p-2 border rounded text-sm">Drawing HYD-DWG-001.pdf</div>
      </TabsContent>
    </Tabs>
  ),
}

export const IconOnlyTabs = {
  name: 'Icon Only View Modes',
  render: () => (
    <Tabs defaultValue="list">
      <TabsList>
        <TabsTrigger value="list" title="List view"><List className="size-4" /></TabsTrigger>
        <TabsTrigger value="grid" title="Grid view"><LayoutGrid className="size-4" /></TabsTrigger>
        <TabsTrigger value="graph" title="Graph view"><TrendingUp className="size-4" /></TabsTrigger>
      </TabsList>
      <TabsContent value="list">
        <div className="space-y-1">
          <div className="text-sm">Item 1</div>
          <div className="text-sm">Item 2</div>
          <div className="text-sm">Item 3</div>
        </div>
      </TabsContent>
      <TabsContent value="grid">
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 border rounded text-sm text-center">Item 1</div>
          <div className="p-2 border rounded text-sm text-center">Item 2</div>
          <div className="p-2 border rounded text-sm text-center">Item 3</div>
        </div>
      </TabsContent>
      <TabsContent value="graph">
        <div className="p-4 border rounded text-sm text-muted-foreground">Graph visualization</div>
      </TabsContent>
    </Tabs>
  ),
}

export const NestedTabs = {
  name: 'Nested Tabs',
  render: () => (
    <Tabs defaultValue="config1" className="w-full">
      <TabsList>
        <TabsTrigger value="config1">Hydro-Pro</TabsTrigger>
        <TabsTrigger value="config2">Solar Config</TabsTrigger>
      </TabsList>
      <TabsContent value="config1" className="space-y-3">
        <Tabs defaultValue="rules">
          <TabsList>
            <TabsTrigger value="rules">Pricing Rules</TabsTrigger>
            <TabsTrigger value="quotes">Linked Quotes</TabsTrigger>
          </TabsList>
          <TabsContent value="rules" className="text-sm">47 pricing rules configured</TabsContent>
          <TabsContent value="quotes" className="text-sm">12 active quotes</TabsContent>
        </Tabs>
      </TabsContent>
      <TabsContent value="config2" className="space-y-3">
        <Tabs defaultValue="rules">
          <TabsList>
            <TabsTrigger value="rules">Pricing Rules</TabsTrigger>
            <TabsTrigger value="quotes">Linked Quotes</TabsTrigger>
          </TabsList>
          <TabsContent value="rules" className="text-sm">23 pricing rules configured</TabsContent>
          <TabsContent value="quotes" className="text-sm">8 active quotes</TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  ),
}

export const DisabledTabs = {
  name: 'With Disabled Tab',
  render: () => (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="draft">Draft</TabsTrigger>
        <TabsTrigger value="archived" disabled>Archived (Coming Soon)</TabsTrigger>
      </TabsList>
      <TabsContent value="active">Active configurations visible here</TabsContent>
      <TabsContent value="draft">Draft configurations visible here</TabsContent>
    </Tabs>
  ),
}
