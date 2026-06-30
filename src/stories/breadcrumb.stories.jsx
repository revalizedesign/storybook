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

**Observations:** Four distinct products show consistent pattern: chevron separators, non-clickable current page, optional home variations. Attainia pattern (back button + breadcrumb) suggests deeper navigation workflows.

**What's missing:** Truncation pattern for 7+ level hierarchies. Long label wrapping behavior. Mobile responsiveness testing.

**Roadmap:** Add truncation story with real 7-level example. Confirm mobile collapse behavior. Validate long-label wrapping.`,
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

// TODO: Deep nesting with truncation pattern
// Truncation behavior shown with placeholder labels (Home > … > Parent Level > Current Page).
// Pending a real deep-hierarchy example from a product to confirm exact truncation trigger.
// Pattern follows standard UX guidance: Root and current page always visible, middle levels collapse with "…"
// when path exceeds viewport width. This ensures the layout never breaks and users always know where they are.
// Confirmation needed: When does truncation activate? (6+ levels? 8+?). Mobile behavior?
export const DeepNestingTruncation = {
  name: 'Deep Nesting / Truncation (Pending Real Example)',
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><span className="text-muted-foreground">...</span></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">Parent Level</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Current Page</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}
