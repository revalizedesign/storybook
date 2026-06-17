import { useState } from 'react'
import * as icons from 'lucide-react'
import {
  SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter,
  SidebarTrigger, SidebarInset, SidebarRail,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'

const brandColors = {
  ConfigureOne: { bg: 'bg-[#0856cf]', text: 'text-white', accent: '#0856cf' },
  AutoQuotes: { bg: 'bg-[#1B2A4A]', text: 'text-white', accent: '#1B2A4A' },
  FlowIQ: { bg: 'bg-[#0856cf]', text: 'text-white', accent: '#0856cf' },
  SpecPage: { bg: 'bg-[#0040A1]', text: 'text-white', accent: '#0040A1' },
  Attainia: { bg: 'bg-[#0856cf]', text: 'text-white', accent: '#0856cf' },
}

function Icon({ name, className }) {
  const Comp = icons[name]
  return Comp ? <Comp className={className} /> : null
}

export function AppShell({ preset, mode = 'wireframe' }) {
  const branded = mode === 'branded'
  const brand = brandColors[preset.name]
  const [activeLabel, setActiveLabel] = useState(
    () => preset.nav.find(i => i.active)?.label ?? preset.nav[0]?.label
  )

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar
          collapsible="icon"
          className={branded && brand ? `${brand.bg} ${brand.text} [&_[data-slot=sidebar-inner]]:bg-transparent` : ''}
        >
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <div className={`flex size-6 items-center justify-center rounded-md font-bold ${branded ? 'bg-white/20 text-white' : 'bg-primary text-primary-foreground'}`}>
                {preset.header.title[0]}
              </div>
              <div className="flex flex-col gap-0 leading-none group-data-[collapsible=icon]:hidden">
                <span className="font-semibold">{preset.header.title}</span>
                {preset.header.subtitle && <span className={branded ? 'text-white/70' : 'text-muted-foreground'}>{preset.header.subtitle}</span>}
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className={branded ? 'text-white/50' : ''}>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                {preset.nav.map(item => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      tooltip={item.label}
                      isActive={item.label === activeLabel}
                      onClick={() => setActiveLabel(item.label)}
                      className={branded ? 'text-white/80 hover:bg-white/10 hover:text-white data-active:bg-white/20 data-active:text-white' : ''}
                    >
                      <Icon name={item.icon} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Settings"
                  className={branded ? 'text-white/80 hover:bg-white/10 hover:text-white' : ''}
                >
                  <Icon name="Settings" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <span className="font-medium">{activeLabel}</span>
            <div className="ml-auto flex items-center gap-1">
              {preset.corner.map((item, i) => (
                <Button key={i} variant="ghost" size="icon-sm">
                  <Icon name={item.icon} className="size-4" />
                </Button>
              ))}
            </div>
          </header>
          <div className="flex-1 p-6">
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed text-muted-foreground">
              {preset.name} — {activeLabel}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
