import { useState } from 'react'
import { ArchiveX, File, Inbox, Send, Trash2 } from 'lucide-react'
import { SidebarManagerProvider, SidebarManager, SidebarManagerTrigger } from '@/components/SidebarManager'
import { Band } from '@/components/Band'
import { Label } from '@/components/ui/label'
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuItem,
  SidebarMenuButton, SidebarProvider, SidebarRail,
} from '@/components/ui/sidebar'
import { Switch } from '@/components/ui/switch'
import { TooltipProvider } from '@/components/ui/tooltip'

export default {
  title: 'Other frameworks/Sidebar manager',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `<a href="https://github.com/shadcn-ui/ui/issues/5651#issuecomment-3715137601">Sidebar Manager pattern</a> by Injamul

A registry for managing multiple sidebars with unique names. Register each sidebar with SidebarManager, control any of them from anywhere with SidebarManagerTrigger.

**Available components:** SidebarManagerProvider, SidebarManager, SidebarManagerTrigger, useSidebarManager

**Usage:**
- Wrap your app in \`SidebarManagerProvider\`
- Wrap each \`Sidebar\` in \`SidebarManager name="..."\`
- Use \`SidebarManagerTrigger name="..."\` to toggle by name
- Without a \`name\`, SidebarManagerTrigger falls back to the nearest SidebarProvider (works as a drop-in replacement for SidebarTrigger)

See **Layout / App shell / Nested sidebar** for a branded implementation.`,
      },
    },
  },
}

const nav = [
  { title: 'Inbox', icon: Inbox, isActive: true },
  { title: 'Drafts', icon: File },
  { title: 'Sent', icon: Send },
  { title: 'Junk', icon: ArchiveX },
  { title: 'Trash', icon: Trash2 },
]

export const Default = {
  render: () => {
    const [activeItem, setActiveItem] = useState(nav[0])
    return (
      <SidebarManagerProvider>
        <TooltipProvider>
          <SidebarProvider defaultOpen={false} className="h-screen">
            <Band
              axis="vertical"
              first={
                <header className="relative z-10 flex items-center gap-2 bg-card px-3 py-2 shadow-md">
                  <SidebarManagerTrigger name="nav" />
                  <span className="font-semibold">App</span>
                </header>
              }
              middle={
                <div className="flex h-full w-full min-h-0 min-w-0 [transform:translateZ(0)]">
                  <SidebarManager name="nav">
                    <Sidebar collapsible="icon" className="h-full">
                      <SidebarContent>
                        <SidebarGroup>
                          <SidebarGroupContent>
                            <SidebarMenu>
                              {nav.map(item => (
                                <SidebarMenuItem key={item.title}>
                                  <SidebarMenuButton
                                    tooltip={{ children: item.title, hidden: false }}
                                    isActive={activeItem?.title === item.title}
                                    onClick={() => setActiveItem(item)}
                                  >
                                    <item.icon />
                                    <span>{item.title}</span>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              ))}
                            </SidebarMenu>
                          </SidebarGroupContent>
                        </SidebarGroup>
                      </SidebarContent>
                      <SidebarRail />
                    </Sidebar>
                  </SidebarManager>
                  <SidebarInset>
                    <SidebarProvider className="min-h-0 flex-1 [&_[data-slot=sidebar-container]]:absolute [&_[data-slot=sidebar-container]]:z-0">
                      <SidebarManager name="panel">
                        <Sidebar collapsible="offcanvas" side="left" className="h-full [&_[data-slot=sidebar-container]]:border-0">
                          <SidebarHeader className="gap-3.5 p-4">
                            <div className="flex w-full items-center justify-between">
                              <div className="text-base font-medium">{activeItem?.title}</div>
                              <Label className="flex items-center gap-2 text-sm">
                                <span>Unreads</span>
                                <Switch className="shadow-none" />
                              </Label>
                            </div>
                            <SidebarInput placeholder="Type to search..." />
                          </SidebarHeader>
                          <SidebarContent />
                        </Sidebar>
                      </SidebarManager>
                      <SidebarInset>
                        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
                          <SidebarManagerTrigger name="panel" />
                        </header>
                        <div className="flex flex-1 items-center justify-center text-muted-foreground">Main content</div>
                      </SidebarInset>
                    </SidebarProvider>
                  </SidebarInset>
                </div>
              }
            />
          </SidebarProvider>
        </TooltipProvider>
      </SidebarManagerProvider>
    )
  },
}
