import { useState } from 'react'
import {
  ArchiveX, AudioWaveform, BadgeCheck, Bell, BookOpen, Bot, ChevronRight, ChevronsUpDown,
  Command, CreditCard, File, Folder, Forward, GalleryVerticalEnd, Inbox, LogOut, Map,
  MoreHorizontal, PanelLeft, PieChart, Plus, Send, Settings2, Sparkles, SquareTerminal, Trash2, Frame,
} from 'lucide-react'
import { AppShell } from '@/components/AppShell'
import { SidebarManagerProvider, SidebarManager, SidebarManagerTrigger } from '@/components/SidebarManager'
import { Band } from '@/components/Band'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
  SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction,
  SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarRail, SidebarTrigger,
  SidebarInset, SidebarProvider, useSidebar,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { TooltipProvider } from '@/components/ui/tooltip'
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default {
  title: 'Layout/App shell',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `<a href="https://ui.shadcn.com/blocks/sidebar">shadcn Sidebar Blocks</a>

Full-width header above a shadcn Sidebar. Revalize branded theme by default. The production layout for all product screens — sidebar content is JSX composition using shadcn primitives directly.

**How it works:** The full-width header uses Band with \`[transform:translateZ(0)]\` on the content row to create a containing block for the sidebar's fixed positioning. This keeps the sidebar below the header instead of spanning the full viewport height.`,
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
            <SidebarMenuButton size="lg" className="group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" />
          }>
            <Avatar className="size-8 rounded-lg after:rounded-lg">
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
                  <Avatar className="size-8 rounded-lg after:rounded-lg">
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

const sidebar = (
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

export const Default = {
  render: () => (
    <AppShell header={<span className="font-semibold">App</span>} sidebar={sidebar}>
      <div className="flex flex-1 items-center justify-center text-muted-foreground">Main content</div>
    </AppShell>
  ),
}

// Verbatim from shadcn sidebar-15 block — app-sidebar.tsx
const nestedData = {
  user: { name: 'shadcn', email: 'm@example.com', avatar: '' },
  navMain: [
    { title: 'Inbox', url: '#', icon: Inbox, isActive: true },
    { title: 'Drafts', url: '#', icon: File, isActive: false },
    { title: 'Sent', url: '#', icon: Send, isActive: false },
    { title: 'Junk', url: '#', icon: ArchiveX, isActive: false },
    { title: 'Trash', url: '#', icon: Trash2, isActive: false },
  ],
}

export const NestedSidebarStory = {
  name: 'Nested sidebar',
  parameters: {
    docs: {
      description: {
        story: `Two independently collapsible sidebars using the <a href="https://github.com/shadcn-ui/ui/issues/5651#issuecomment-3715137601">Sidebar Manager pattern</a>.

**Layout:** Outer SidebarProvider (\`collapsible="icon"\`, \`defaultOpen={false}\`) for the icon rail. Inner SidebarProvider (\`collapsible="offcanvas"\`) inside SidebarInset for the content panel. Each sidebar is registered with SidebarManager and controlled by its own SidebarManagerTrigger.

**Key fixes for side-by-side sidebars:**
- Inner sidebar container must be \`position: absolute\` instead of \`fixed\` — override via \`[&_[data-slot=sidebar-container]]:absolute\` on the inner SidebarProvider
- Inner sidebar needs \`z-0\` so it slides behind the icon rail when collapsing, not on top
- Inner SidebarProvider needs \`min-h-0 flex-1\` to fit within the outer SidebarInset instead of taking full viewport
`,
      },
    },
  },
  render: () => (
    <SidebarManagerProvider>
      <AppShell
        header={<span className="font-semibold">App</span>}
        sidebar={
          <SidebarManager name="nav">
            <SidebarHeader><TeamSwitcher /></SidebarHeader>
            <SidebarContent>
              <NavMain />
              <NavProjects />
            </SidebarContent>
            <SidebarFooter><NavUser /></SidebarFooter>
            <SidebarRail />
          </SidebarManager>
        }
      >
        <SidebarProvider className="min-h-0 flex-1 [&_[data-slot=sidebar-container]]:absolute [&_[data-slot=sidebar-container]]:z-0 [--sidebar:#064ab8] [--sidebar-foreground:#ffffffd9] [--sidebar-primary:#ffffff] [--sidebar-primary-foreground:#064ab8] [--sidebar-accent:#ffffff1f] [--sidebar-accent-foreground:#ffffff] [--sidebar-border:#ffffff12] [--sidebar-ring:#ffffff3d]">
          <SidebarManager name="panel">
            <Sidebar collapsible="offcanvas" side="left" className="h-full [&_[data-slot=sidebar-container]]:border-0">
              <SidebarHeader className="gap-3.5 border-b border-sidebar-border p-4">
                <div className="flex w-full items-center justify-between">
                  <div className="text-base font-medium">Inbox</div>
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
      </AppShell>
    </SidebarManagerProvider>
  ),
}
