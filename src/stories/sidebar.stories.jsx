import { useState } from 'react'
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
  SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel,
  SidebarGroupContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem,
  SidebarMenuButton, SidebarMenuAction, SidebarMenuSub, SidebarMenuSubItem,
  SidebarMenuSubButton, SidebarRail, SidebarTrigger, useSidebar,
} from '@/components/ui/sidebar'

export default {
  title: 'shadcn/Sidebar',
  parameters: {
    docs: {
      description: {
        component: `<a href="https://ui.shadcn.com/docs/components/base/sidebar">Sidebar - shadcn/ui</a> · <a href="https://ui.shadcn.com/blocks/sidebar">Blocks</a>

Collapsible navigation rail with icon mode, keyboard shortcut (⌘B), and mobile sheet. Composable, themeable, customizable. Inverted and themed variants use CSS custom properties on the same component.

**Structure:**
- **SidebarProvider** — Handles collapsible state and provides sidebar context to child components.
- **Sidebar** — The main collapsible sidebar panel.
- **SidebarHeader** — Sticky at the top; use for branding, titles, or workspace switchers.
- **SidebarFooter** — Sticky at the bottom; use for user menus, settings, or actions.
- **SidebarContent** — Scrollable region between the header and footer.
- **SidebarGroup** — Groups related navigation with optional label, action, and content areas.
- **SidebarMenu / SidebarMenuItem** — Menu structure for links, badges, actions, and nested submenus.
- **SidebarRail** — Resize handle for adjusting sidebar width when applicable.
- **SidebarInset** — Wraps main content when using the inset variant.
- **SidebarTrigger** — Control that toggles the sidebar open or collapsed.

**Also available:** SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarInput, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarSeparator`,
      },
    },
  },
}

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

const user = { name: 'shadcn', email: 'm@example.com' }

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

const AppSidebar = ({ className }) => (
  <SidebarProvider className={className}>
    <Sidebar collapsible="icon">
      <SidebarHeader><TeamSwitcher /></SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter><NavUser /></SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header className="flex h-12 items-center px-4">
        <SidebarTrigger />
      </header>
    </SidebarInset>
  </SidebarProvider>
)

export const Default = { render: () => <AppSidebar /> }

export const Inverted = {
  render: () => <AppSidebar className="[--sidebar:#171717] [--sidebar-foreground:#ffffffd9] [--sidebar-primary:#ffffff] [--sidebar-primary-foreground:#171717] [--sidebar-accent:#ffffff1f] [--sidebar-accent-foreground:#ffffff] [--sidebar-border:#ffffff1a] [--sidebar-ring:#ffffff3d]" />,
}

export const Themed = {
  render: () => <AppSidebar className="[--sidebar:#0856cf] [--sidebar-foreground:#ffffffd9] [--sidebar-primary:#ffffff] [--sidebar-primary-foreground:#0856cf] [--sidebar-accent:#ffffff1f] [--sidebar-accent-foreground:#ffffff] [--sidebar-border:#ffffff2e] [--sidebar-ring:#ffffff3d]" />,
}
