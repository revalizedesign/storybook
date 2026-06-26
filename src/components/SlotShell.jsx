import { Band } from '@/components/Band'
import { cn } from '@/lib/utils'
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarInset, SidebarMenu, SidebarProvider,
} from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

/**
 * SlotShell — the SlotMachine prototyping shell: a full-width header above a row of (collapsible sidebar | content),
 * composed from Band, the generic alternating-axis primitive (components/Band.jsx):
 *   vertical [ header | <horizontal [ sidebar | <vertical [ toolbar | <horizontal panes> | footer ]> ]> ]
 *
 * first/middle/last are BAND's generic props (it doesn't know its own orientation). Slots, by
 * contrast, are CONCRETE — they know exactly where they sit — so they never reuse those words:
 *   header-left/left-nav/right-nav/right · main-nav-top/items/bottom · nav-pane · chat-panel ·
 *   toolbar-left/right · page-header · pane-left/right · footer-left/right · json.
 * nav-pane (a secondary nav, e.g. Workspaces) and chat-panel (a docked Admin Agent-style panel) sit in
 * the content row between the main-nav sidebar and the content; each is empty by default.
 *
 * THE SIDEBAR IS PURE SHADCN — the real <Sidebar collapsible="icon">, so collapse, tokens, ⌘B, and
 * the mobile Sheet all work unchanged. shadcn renders its desktop sidebar `fixed inset-y-0 h-svh`
 * (full viewport), which would slide under the header. Shell scopes it to the row with two classes:
 * a `transform` on the row makes it the containing block for the `fixed` sidebar, and `h-full` on
 * <Sidebar> wins over `h-svh` via tailwind-merge — no `!important`, no height hacks. The sidebar then
 * fills exactly the row beneath the header.
 *
 * NAMES CONSIDERED — Layout (too generic; collides with the Storybook section and the CSS term),
 * Compose (too generic), Position (too generic; collides with the CSS property), Masonry (implies a
 * packing/grid algorithm this isn't), Outer (vague), ZigZag / ZigZigZagZag (describe the alternating
 * model but read as jargon). Landed on Band (the positional primitive) + Shell (this composition).
 */

// Slot content is an array (SlotMachine) or a single node (a direct slot fn) — both count as filled.
const filled = (x) => (Array.isArray(x) ? x.length > 0 : x != null)

// A horizontal leaf bar: left | spacer | right. Renders nothing when both ends are empty.
const Bar = ({ left, right, className }) =>
  filled(left) || filled(right) ? (
    <div className={cn('flex items-center gap-2 px-3 py-2', className)}>
      <div className="flex items-center gap-1">{left}</div>
      <div className="flex-1" />
      <div className="flex items-center gap-1">{right}</div>
    </div>
  ) : null

export function SlotShell({ sidebar = {}, slot = () => null }) {
  // `sidebar` is forwarded straight to shadcn's SidebarProvider — defaultOpen, className (brand
  // tokens), style (e.g. { '--sidebar-width': '10rem' }), etc. — so the sidebar's own API is the API;
  // Shell never grows a prop per knob.
  const { className: sidebarClassName, style: sidebarStyle, ...sidebarProps } = sidebar
  const top = slot('main-nav-top')
  const bottom = slot('main-nav-bottom')
  return (
    <TooltipProvider>
      <SidebarProvider {...sidebarProps} className={cn('h-full min-h-0', sidebarClassName)} style={sidebarStyle}>
        <Band
          axis="vertical"
          first={
            <header className="relative z-10 flex items-center gap-2 bg-card px-3 py-2 shadow-md">
              {slot('header-left')}
              <nav className="flex items-center gap-1">{slot('header-left-nav')}</nav>
              <div className="flex-1" />
              <nav className="flex items-center gap-1">{slot('header-right-nav')}</nav>
              <div className="flex items-center gap-2">{slot('header-right')}</div>
            </header>
          }
          middle={
            <div className="flex h-full w-full min-h-0 min-w-0 [transform:translateZ(0)]">
              <Sidebar collapsible="icon" className="h-full">
                {filled(top) ? <SidebarHeader>{top}</SidebarHeader> : null}
                <SidebarContent><SidebarGroup><SidebarMenu>{slot('main-nav-items')}</SidebarMenu></SidebarGroup></SidebarContent>
                {filled(bottom) ? <SidebarFooter><SidebarMenu>{bottom}</SidebarMenu></SidebarFooter> : null}
              </Sidebar>
              {slot('nav-pane')}
              {slot('chat-panel')}
              <SidebarInset>
                <Bar left={slot('toolbar-left')} right={slot('toolbar-right')} className="border-b" />
                <div className="flex min-h-0 flex-1 flex-col gap-4 bg-muted/60 p-6">
                  {slot('page-header')}
                  <Band
                    axis="horizontal"
                    className="min-h-0 flex-1"
                    first={slot('pane-left')}
                    middle={slot('json')}
                    last={slot('pane-right')}
                  />
                </div>
                <Bar left={slot('footer-left')} right={slot('footer-right')} className="border-t text-muted-foreground" />
              </SidebarInset>
            </div>
          }
        />
      </SidebarProvider>
    </TooltipProvider>
  )
}
