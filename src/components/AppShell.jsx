import { useContext } from 'react'
import { Band } from '@/components/Band'
import { SidebarManagerContext, SidebarManagerTrigger } from '@/components/SidebarManager'
import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

const brand =
  '[--sidebar:#0856cf] [--sidebar-foreground:#ffffffd9] [--sidebar-primary:#ffffff] [--sidebar-primary-foreground:#0856cf] [--sidebar-accent:#ffffff1f] [--sidebar-accent-foreground:#ffffff] [--sidebar-border:#ffffff2e] [--sidebar-ring:#ffffff3d]'

const brandDark =
  '[--sidebar:#064ab8] [--sidebar-foreground:#ffffffd9] [--sidebar-primary:#ffffff] [--sidebar-primary-foreground:#064ab8] [--sidebar-accent:#ffffff1f] [--sidebar-accent-foreground:#ffffff] [--sidebar-border:#ffffff12] [--sidebar-ring:#ffffff3d]'

export function AppShell({ defaultOpen, header, sidebar, children }) {
  const nested = useContext(SidebarManagerContext) !== null
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={defaultOpen ?? !nested} className={`h-screen min-h-0 ${brand}`}>
        <Band
          axis="vertical"
          first={
            <header className="relative z-10 flex items-center gap-2 bg-card px-3 py-2 shadow-md">
              <SidebarManagerTrigger name={nested ? 'nav' : undefined} />
              {header}
            </header>
          }
          middle={
            <div className="flex h-full w-full min-h-0 min-w-0 [transform:translateZ(0)]">
              <Sidebar collapsible="icon" className="h-full group-data-[side=left]:border-r-0">
                {sidebar}
              </Sidebar>
              <SidebarInset className={nested ? brandDark : ''}>{children}</SidebarInset>
            </div>
          }
        />
      </SidebarProvider>
    </TooltipProvider>
  )
}
