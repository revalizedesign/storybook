import { useState } from 'react'
import { SlotMachine } from './SlotMachine'
import { AppShell } from '@/components/AppShell'
import { ChatPane } from '@/components/ChatPane'
import { StoryGuide } from '@/components/StoryGuide'
import { VerticalPane } from '@/components/VerticalPane'
import { Fa } from '@/components/Fa'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Icon } from '@/components/Icon'
import { SidebarManagerProvider, SidebarManager, SidebarManagerTrigger } from '@/components/SidebarManager'
import adminData from './configureone-admin.json'
import aiAdminData from './configureone-aiadmin.json'
import aiAdminGuide from './configureone-aiadmin-guide.json'
import {
  AudioWaveform, BadgeCheck, Bell, BookOpen, Bot, ChevronRight, ChevronsUpDown, Command,
  CreditCard, Folder, Forward, GalleryVerticalEnd, LogOut, Map, MoreHorizontal, PieChart,
  Plus, Settings2, Sparkles, SquareTerminal, Trash2, Frame,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction,
  SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarProvider, SidebarRail, useSidebar,
} from '@/components/ui/sidebar'

const teams = [
  { name: 'Acme Inc', logo: GalleryVerticalEnd, plan: 'Enterprise' },
  { name: 'Acme Corp.', logo: AudioWaveform, plan: 'Startup' },
  { name: 'Evil Corp.', logo: Command, plan: 'Free' },
]

const navMain = [
  { title: 'Playground', icon: SquareTerminal, isActive: true, items: ['History', 'Starred', 'Settings'] },
  { title: 'Models', icon: Bot, items: ['Genesis', 'Explorer', 'Quantum'] },
  { title: 'Documentation', icon: BookOpen, items: ['Introduction', 'Get Started', 'Tutorials', 'Changelog'] },
  { title: 'Settings', icon: Settings2, items: ['General', 'Team', 'Billing', 'Limits'] },
]

const projects = [
  { name: 'Design Engineering', icon: Frame },
  { name: 'Sales & Marketing', icon: PieChart },
  { name: 'Travel', icon: Map },
]

const user = { name: 'Test User', email: 'test@configureone.com' }

const TeamSwitcher = () => {
  const { isMobile } = useSidebar()
  const [active, setActive] = useState(teams[0])
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" />
          }>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <active.logo className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{active.name}</span>
              <span className="truncate text-xs">{active.plan}</span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56 rounded-lg" align="start" side={isMobile ? 'bottom' : 'right'} sideOffset={4}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
              {teams.map((team, i) => (
                <DropdownMenuItem key={team.name} onClick={() => setActive(team)} className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border"><team.logo className="size-3.5" /></div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{i + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border"><Plus className="size-4" /></div>
              <span className="font-medium text-muted-foreground">Add team</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

const NavMain = () => (
  <SidebarGroup>
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {navMain.map(item => (
          <Collapsible key={item.title} defaultOpen={item.isActive} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger render={<SidebarMenuButton isActive={item.isActive} />}>
                <item.icon />
                {item.title}
                <ChevronRight className="ml-auto transition-transform group-data-[open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map(sub => (
                    <SidebarMenuSubItem key={sub}><SidebarMenuSubButton>{sub}</SidebarMenuSubButton></SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
)

const NavProjects = () => {
  const { isMobile } = useSidebar()
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map(p => (
          <SidebarMenuItem key={p.name}>
            <SidebarMenuButton><p.icon />{p.name}</SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger render={<SidebarMenuAction showOnHover />}>
                <MoreHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 rounded-lg" side={isMobile ? 'bottom' : 'right'} align={isMobile ? 'end' : 'start'}>
                <DropdownMenuItem><Folder className="text-muted-foreground" />View Project</DropdownMenuItem>
                <DropdownMenuItem><Forward className="text-muted-foreground" />Share Project</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Trash2 className="text-muted-foreground" />Delete Project</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            More
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

const NavUser = () => {
  const { isMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" />
          }>
            <Avatar className="size-8 rounded-lg">
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56 rounded-lg" side={isMobile ? 'bottom' : 'right'} align="end" sideOffset={4}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem><Sparkles />Upgrade to Pro</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem><BadgeCheck />Account</DropdownMenuItem>
              <DropdownMenuItem><CreditCard />Billing</DropdownMenuItem>
              <DropdownMenuItem><Bell />Notifications</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem><LogOut />Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

const c1Sidebar = (
  <>
    <SidebarHeader><TeamSwitcher /></SidebarHeader>
    <SidebarContent>
      <NavMain />
      <NavProjects />
    </SidebarContent>
    <SidebarFooter><NavUser /></SidebarFooter>
    <SidebarRail />
  </>
)

const c1Header = (
  <>
    <div className="size-7 rounded bg-blue-700" />
    <span className="font-semibold">Configure One</span>
    <span className="text-xs tracking-widest text-muted-foreground">CLOUD</span>
  </>
)

export default {
  title: 'Products/ConfigureOne',
  parameters: { layout: 'fullscreen' },
}

export const AppShellStory = {
  name: 'App shell',
  render: () => (
    <AppShell header={c1Header} sidebar={c1Sidebar}>
      <div className="flex flex-1 items-center justify-center text-muted-foreground">Main content</div>
    </AppShell>
  ),
}

const adminHeader = (
  <>
    <div className="size-7 rounded bg-blue-700" />
    <span className="font-semibold">Configure One</span>
    <span className="text-xs tracking-widest text-muted-foreground">CLOUD</span>
    <div className="flex-1" />
    <div className="relative w-48">
      <Fa name="magnifying-glass" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder="Search" className="pl-8" />
    </div>
    <Button variant="ghost" size="sm"><Fa name="arrow-up-right-from-square" />Front End</Button>
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
        <Fa name="circle-user" />Test User<Fa name="chevron-down" className="size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>
)

export const Admin = {
  render: () => (
    <SidebarManagerProvider>
      <AppShell header={adminHeader} sidebar={
        <SidebarManager name="nav">
          <SidebarHeader><TeamSwitcher /></SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminData.nav.map(item => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton isActive={item.isActive}><Fa name={item.icon} />{item.title}</SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter><NavUser /></SidebarFooter>
          <SidebarRail />
        </SidebarManager>
      }>
        <SidebarProvider className="min-h-0 flex-1 [&_[data-slot=sidebar-container]]:absolute [&_[data-slot=sidebar-container]]:z-0">
          <SidebarManager name="panel">
            <Sidebar collapsible="offcanvas" side="left" className="h-full [&_[data-slot=sidebar-container]]:border-0">
              <SidebarHeader className="gap-3.5 p-4">
                <div className="text-base font-medium">{adminData.panel.title}</div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {adminData.panel.items.map(item => (
                        <SidebarMenuItem key={item}>
                          <SidebarMenuButton>{item}</SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </SidebarManager>
          <SidebarInset>
            <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
              <SidebarManagerTrigger name="panel" />
            </header>
            <div className="flex min-h-0 flex-1 flex-col p-4">
              <Textarea defaultValue={JSON.stringify(adminData, null, 2)} spellCheck={false} className="min-h-0 flex-1 resize-none font-mono" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </AppShell>
    </SidebarManagerProvider>
  ),
}

export const AiAdmin = {
  name: 'AI admin',
  render: () => (
    <AppShell
      defaultOpen
      header={<><div className="size-7 rounded bg-blue-700" /><span className="font-semibold">Intelligence</span></>}
      sidebar={
        <>
          <SidebarHeader><TeamSwitcher /></SidebarHeader>
          <SidebarContent>
            {[
              { label: 'Workflow', items: aiAdminData.nav.slice(0, 5), defaultOpen: true },
              { label: 'Platform', items: aiAdminData.nav.slice(5, 7), defaultOpen: false },
              { label: 'Access', items: aiAdminData.nav.slice(7), defaultOpen: false },
            ].map(group => (
              <Collapsible key={group.label} defaultOpen={group.defaultOpen} className="group/collapsible">
                <SidebarGroup>
                  <CollapsibleTrigger render={<SidebarGroupLabel className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />}>
                    {group.label}
                    <ChevronRight className="ml-auto size-3 transition-transform group-data-[open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {group.items.map(item => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton isActive={item.isActive}><Fa name={item.icon} />{item.title}</SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ))}
          </SidebarContent>
          <SidebarFooter><NavUser /></SidebarFooter>
          <SidebarRail />
        </>
      }
    >
      <StoryGuide data={aiAdminGuide} />
      <div className="flex h-full">
        <VerticalPane title="Products" menu={[{ label: 'New product', icon: 'plus' }]}>
          <div className="flex flex-col gap-1 overflow-auto p-2">
            <Button variant="ghost" size="sm" className="w-full justify-start bg-accent text-accent-foreground">Product 1</Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">Product 2</Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">Product 3</Button>
          </div>
        </VerticalPane>
        <ChatPane />
        <div className="flex min-h-0 flex-1 flex-col p-4">
          <Textarea defaultValue={JSON.stringify(aiAdminData, null, 2)} spellCheck={false} className="min-h-0 flex-1 resize-none font-mono" />
        </div>
      </div>
    </AppShell>
  ),
}
