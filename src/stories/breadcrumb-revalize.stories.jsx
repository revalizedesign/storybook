import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Home } from 'lucide-react'

// Revalize variants for Breadcrumb, built on top of the shadcn/Breadcrumb story (not a fork of that
// file — Default below mirrors that composition so the set reads together). Kept lean on purpose: home
// icon, ellipsis truncation, and mobile wrapping only. No back button (confusing), no custom
// separators, no nested/granular variants.
export default {
  title: 'Revalize/Breadcrumb',
  parameters: {
    docs: {
      description: {
        component: `**When to use:** Wayfinding from the first authenticated landing page — shows where you are in the hierarchy and how deep. Not a navigation or exit mechanism.

**Rules:**
- Last item is the current page: non-clickable, \`BreadcrumbPage\`, bold.
- Parent items are clickable links (\`BreadcrumbLink\`).
- **Revalize rule:** separator is the chevron only — no custom separators, even though shadcn supports them.

**Accessibility:** Handled natively by shadcn — \`<nav aria-label="breadcrumb">\`, \`aria-current="page"\` on the current item, \`sr-only\` text on the ellipsis. Reference it, don't rebuild it.

**Responsive:** Responsive rules use Tailwind's default breakpoints (sm 640 / md 768 / lg 1024), mobile-first. Pending confirmation of any Revalize-specific overrides.

**In context:** <a href="?path=/story/originals-page-header--default">See how this is used in the Page Header →</a>

Real product navigation, rendered through the Page Header:
- <a href="?path=/story/revalize-breadcrumb-in-context--configure-one">See in Configure One →</a> (Admin > Interface > Logic Items)
- <a href="?path=/story/revalize-breadcrumb-in-context--auto-quotes">See in AutoQuotes →</a> (Home > Catalog)
- <a href="?path=/story/revalize-breadcrumb-in-context--spec-page">See in SpecPage →</a> (Home > Master data)
- <a href="?path=/story/revalize-breadcrumb-in-context--attainia">See in Attainia →</a> (home icon > Projects > Create with AI)
- <a href="?path=/story/revalize-breadcrumb-in-context--flow-iq">See in FlowIQ →</a> (Admin > … > Acme-ES > 150IEQ-01-demo — real in-product truncation)`,
      },
    },
  },
}

// Mirrors the shadcn/Breadcrumb Default so it sits alongside the other variants for reference.
export const Default = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const WithHomeIcon = {
  name: 'With home icon',
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="flex items-center gap-1">
            <Home className="size-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

// shadcn documents "Dropdown" (a DropdownMenu on a text crumb) and "Collapsed" (a static
// BreadcrumbEllipsis) as two separate examples — neither combines them, and shadcn's Dropdown example
// uses a custom slash separator. This composes their real primitives (DropdownMenu + BreadcrumbEllipsis)
// into a clickable collapsed menu, keeping the chevron-only separator per the Revalize rule above.
export const WithEllipsis = {
  name: 'With ellipsis',
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              nativeButton={false}
              render={<BreadcrumbEllipsis role={undefined} aria-hidden={undefined} className="cursor-pointer" />}
            />
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

// Responsive rules use Tailwind's default breakpoints (sm 640 / md 768 / lg 1024), mobile-first: the
// unprefixed classes are the base (mobile) style, sm:/md:/lg: apply upward from that breakpoint.
// Pending confirmation of any Revalize-specific overrides — BreadcrumbList's own flex-wrap otherwise
// handles wrapping with no extra classes needed.
export const MobileWrapping = {
  name: 'Mobile wrapping',
  render: () => (
    <div className="max-w-xs gap-1 rounded border border-dashed border-border p-2 md:max-w-none md:gap-2 md:p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
}
