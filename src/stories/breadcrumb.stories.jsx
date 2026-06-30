import React from 'react'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Home, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Breadcrumb',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/breadcrumb">Breadcrumb - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**Current location in app hierarchy.** Separator: chevron (>). Last item: bold, not a link. Parent items: links. Shows navigation path in products.

**Variants:**
- **Text breadcrumb** (default): "Admin > Interface > Logic Items"
- **With home icon** (🏠 instead of "Home"): More visual, common in newer products
- **With back button** (← before breadcrumb): Mobile/deep navigation pattern

**Rules:**
- Separator: chevron (>), not slash
- Last item: bold, aria-current="page", no link
- Secondary navigation (never replaces sidebar/menu)
- 2-7 levels typical (deep nesting uses truncation)
- Home can be text or icon (both documented)
- Optional: back button for navigation undo
- Accessibility: <nav aria-label="Breadcrumb">, aria-current="page" on current item

**Products:**
- Configure One Cloud: Admin > Interface > Logic Items (text)
- AutoQuotes: Home > Catalog (simple)
- SpecPage: Home > Master data (simple)
- Attainia: 🏠 > Projects > Create with AI (icon + back button)`,
          Matt: `Built from real product implementations.

**Observations:** Four distinct products show consistent pattern: chevron separators, non-clickable current page, optional home variations. Attainia pattern (back button + breadcrumb) suggests deeper navigation workflows. Added 7-level hierarchy (Configure One Edit Rule) with middle-collapse truncation and long-label wrapping validation.

**Completed:** ✅ Truncation story with real 7-level example (Admin > Workspace > Project > Configuration > Rules > Rule Group > Edit Rule). ✅ Mobile collapse behavior (middle levels collapsible with "…"). ✅ Long-label wrapping tested (narrow viewport max-w-xs, shortened labels for mobile).

**Behavior validated:** Root (Admin) and current (Edit: Pressure Threshold Check) always visible. Middle 4 levels collapse into "…". Mobile pattern: icon home + back button + shortened breadcrumb. Desktop: full labels, no wrapping. Narrow (mobile): truncated labels, collapsed middle levels.`,
        },
      }),
    },
  },
}

export const Default = {
  name: 'Configure One Cloud (Default)',
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Admin</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">Interface</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Logic Items</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const Simple = {
  name: 'AutoQuotes (2 Levels)',
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Catalog</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const WithHomeIcon = {
  name: 'Attainia (Home Icon)',
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="flex items-center gap-1">
            <Home className="size-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">Projects</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Create with AI</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const WithBackButton = {
  name: 'Attainia (Back Button)',
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="icon-sm" title="Go back">
        <ChevronLeft className="size-4" />
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="flex items-center gap-1">
              <Home className="size-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Projects</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Create with AI</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
}

export const WithHomeIconSimple = {
  name: 'SpecPage (Home Icon + Simple)',
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="flex items-center gap-1">
            <Home className="size-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Master data</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const DeepNestingTruncation = {
  name: 'Deep Nesting / Truncation',
  render: () => {
    const [expanded, setExpanded] = React.useState(false)
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>Based on FlowIQ Selectors (production implementation).</p>
          <p className="text-xs mt-1">Click "…" to expand/collapse hidden middle levels. Root and current page always visible.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" title="Go back">
            <ChevronLeft className="size-4" />
          </Button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Admin</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  title="Click to expand/collapse">
                  {expanded ? '↑ Collapse' : '…'}
                </button>
              </BreadcrumbItem>
              {expanded && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#">Products</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#">Selector Config</BreadcrumbLink></BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Acme-ES</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>150IEQ-01-demo</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    )
  },
}

export const LongLabels = {
  name: 'Long Labels / Wrapping',
  render: () => (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        <p>Label truncation and wrapping behavior on narrow viewports.</p>
        <p className="text-xs mt-1">Test: resize browser window to see responsive behavior (mobile: 320px, tablet: 768px, desktop: 1024px+)</p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium mb-2 text-muted-foreground">Desktop (full labels)</p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Administration Panel</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Configuration Management</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Advanced Settings</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Language &amp; Localization</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div>
          <p className="text-xs font-medium mb-2 text-muted-foreground">Responsive (narrow: max-w-xs)</p>
          <div className="max-w-xs border border-dashed border-border p-3 rounded">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Admin Panel</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Config</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Language Settings</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium mb-2 text-muted-foreground">With icon + back (mobile pattern)</p>
          <div className="max-w-sm border border-dashed border-border p-3 rounded">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon-sm" title="Go back" className="shrink-0">
                <ChevronLeft className="size-4" />
              </Button>
              <Breadcrumb className="min-w-0">
                <BreadcrumbList className="flex-nowrap">
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="flex items-center gap-1">
                      <Home className="size-4" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#">Settings</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>Language</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const SevenLevelHierarchy = {
  name: '7-Level Hierarchy (Configure One Edit Rule)',
  render: () => {
    const [expanded, setExpanded] = React.useState(false)
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>Real Configure One workflow: Admin &gt; Workspace &gt; Project &gt; Configuration &gt; Rules &gt; Rule Group &gt; Edit Rule</p>
          <p className="text-xs mt-1">7 levels with middle collapse. Click "…" to show/hide intermediate levels (Workspace, Project, Configuration, Rules).</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" title="Go back">
            <ChevronLeft className="size-4" />
          </Button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Admin</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  title="Click to expand/collapse">
                  {expanded ? '↑ Collapse' : '…'}
                </button>
              </BreadcrumbItem>
              {expanded && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#">Workspace A</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#">Project: Hydro-Pro</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#">Config v2.1</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#">Rules</BreadcrumbLink></BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Validation Rules</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Edit: Pressure Threshold Check</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    )
  },
}
