import { useState } from 'react'
import { AppShell } from '@/components/AppShell'
import { AutoCollapseSidebar } from '@/components/AutoCollapseSidebar'
import { ChatPane } from '@/components/ChatPane'
import { ContextProgressProvider, useContextProgress } from '@/components/ContextProgressProvider'
import { ContextWizard } from '@/components/ContextWizard'
import { Icon } from '@/components/Icon'
import { StatusDot } from '@/components/StatusDot'
import { StoryGuide } from '@/components/StoryGuide'
import { VerticalPane } from '@/components/VerticalPane'
import { Fa } from '@/components/Fa'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabBar } from '@/components/TabBar'
import { SidebarManagerProvider, SidebarManager, SidebarManagerTrigger } from '@/components/SidebarManager'
import adminData from './configureone-admin.json'
import aiAdminData from './configureone-aiadmin.json'
import aiAdminGuide from './configureone-aiadmin-guide.json'
// aiAdminContext holds every context layer as a { initial, found } sequence — 'initial' is the
// product’s current state (nothing set up yet), 'found' is what the agent surfaces once the wizard’s
// first-source flow runs. Consumers pick the stage that matches what they’re showing.
import aiAdminContext from './configureone-aiadmin-context.json'
import aiAdminWizard from './configureone-aiadmin-wizard.json'
import {
  BadgeCheck, Bell, BookOpen, Bot, ChevronRight, ChevronsUpDown,
  CreditCard, Folder, Forward, Layers, LogOut, Map, MoreHorizontal, PieChart,
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
  { icon: 'GalleryVerticalEnd', name: 'Acme Inc', plan: 'Enterprise' },
  { icon: 'AudioWaveform', name: 'Acme Corp.', plan: 'Startup' },
  { icon: 'Command', name: 'Evil Corp.', plan: 'Free' },
]

// Resolve the AI admin tabs' semantic colors to literal active-icon classes (literal so Tailwind sees them).
const tabAccent = { amber: 'data-active:[&_i]:text-amber-500', blue: 'data-active:[&_i]:text-blue-500', green: 'data-active:[&_i]:text-green-500' }
const aiAdminTabs = aiAdminData.tabs.map((t) => ({ ...t, color: tabAccent[t.color] }))
const aiAdminWizardSteps = aiAdminWizard.map(s => s.type === 'review' ? { ...s, _context: aiAdminContext[s.context].found } : s)
const contextLayerNames = Object.keys(aiAdminContext)
const globalLayers = ['Company', 'Industry', 'Catalog']

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
              <Icon name={active.icon} />
            </div>
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate font-semibold">{active.name}</span>
              <span className="truncate text-sidebar-foreground/70">{active.plan}</span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56 rounded-lg" align="start" side={isMobile ? 'bottom' : 'right'} sideOffset={4}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground">Teams</DropdownMenuLabel>
              {teams.map((team, i) => (
                <DropdownMenuItem key={team.name} onClick={() => setActive(team)} className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border"><Icon name={team.icon} className="size-3.5" /></div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{i + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border"><Plus className="size-4" /></div>
              <span className="font-semibold text-muted-foreground">Add team</span>
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
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-sidebar-foreground/70">{user.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56 rounded-lg" side={isMobile ? 'bottom' : 'right'} align="end" sideOffset={4}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-muted-foreground">{user.email}</span>
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
    <span className="tracking-widest text-muted-foreground">CLOUD</span>
  </>
)

export default {
  title: 'Products/Configure One',
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
    <span className="tracking-widest text-muted-foreground">CLOUD</span>
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
                <div className="text-base font-semibold">{adminData.panel.title}</div>
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

// AiAdminView reads useContextProgress(), so it must render as a ContextProgressProvider descendant
// rather than as AiAdmin’s own render() — same reason TeamSwitcher/NavUser above call useSidebar()
// as their own components instead of from inside AppShell’s caller.
function AiAdminView() {
  const [page, setPage] = useState('Dashboard')
  const { completeStep, layerState } = useContextProgress()
  const contextReady = Object.values(layerState).every(l => l.approved)

  const [saveStatus, setSaveStatus] = useState({})
  const handleAnswerChange = (section) => {
    setSaveStatus(s => ({ ...s, [section]: 'Saving…' }))
    setTimeout(() => setSaveStatus(s => ({ ...s, [section]: 'Saved' })), 800)
  }

  // The "Add your first source" flow adds one shared source across every Global layer at once.
  const filesCount = Object.values(layerState).some(l => l.sourceFound) ? 1 : 0

  return (
    <AppShell
      header={<><div className="size-7 rounded bg-blue-700" /><span className="font-semibold">Intelligence</span></>}
      sidebar={
        <>
          <SidebarHeader><TeamSwitcher /></SidebarHeader>
          <SidebarContent>
            {[
              { label: 'Workflow', items: aiAdminData.nav.slice(0, 4), defaultOpen: true },
              { label: 'Platform', items: aiAdminData.nav.slice(4, 6), defaultOpen: false },
              { label: 'Access', items: aiAdminData.nav.slice(6), defaultOpen: false },
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
                            <AutoCollapseSidebar isActive={page === item.title} onClick={() => setPage(item.title)}><Fa name={item.icon} />{item.title}</AutoCollapseSidebar>
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
      {page === 'Dashboard' ? (
        <div className="flex h-full flex-col gap-4 p-6">
          <Card className="w-full flex-row items-center gap-4 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted"><Layers className="size-5" /></div>
            <div className="flex flex-1 flex-col gap-1">
              <CardTitle>{contextReady ? 'Context setup complete' : 'Context setup needed'}</CardTitle>
              <CardDescription>
                {contextReady
                  ? 'Your context is ready to help train the agent.'
                  : <>Before you can build product models with C1 Intelligence, you must provide your {contextLayerNames.join(', ')}, and Categorical context to help train the agent.</>}
              </CardDescription>
            </div>
            <Button onClick={() => setPage('Context manager')}>{contextReady ? 'Review context' : 'Start context setup'}</Button>
          </Card>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="gap-3 p-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </Card>
            ))}
          </div>
          <Card className="min-h-0 flex-1 gap-3 p-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="flex-1" />
          </Card>
        </div>
      ) : page === 'Context manager' ? (
        <div className="flex h-full">
          <ContextWizard format="pane" steps={aiAdminWizardSteps} onClose={() => setPage('Dashboard')} onStepComplete={completeStep} />
          <TabBar tabs={aiAdminData.contextTabs} defaultValue="global" className="min-h-0 flex-1 overflow-y-auto p-4">
            <TabsContent value="global" className="flex flex-col gap-6">
              {globalLayers.map(section => {
                const { approved, sourceFound } = layerState[section]
                const sources = aiAdminContext[section][sourceFound ? 'found' : 'initial']
                const context = aiAdminContext[section][approved ? 'found' : 'initial']
                return (
                  <div key={section} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold">{section}</h3>
                      <StatusDot>{saveStatus[section]}</StatusDot>
                    </div>
                    <Tabs key={approved ? 'context' : 'sources'} defaultValue={approved ? 'context' : 'sources'}>
                      <TabsList variant="line">
                        <TabsTrigger value="sources">Sources</TabsTrigger>
                        <TabsTrigger value="context">Context</TabsTrigger>
                      </TabsList>
                      <TabsContent value="sources">
                        <p className="text-muted-foreground">{sources.sources} source{sources.sources !== 1 && 's'}</p>
                      </TabsContent>
                      <TabsContent value="context">
                        <dl className="grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-3">
                          {context.questions.map(q => (
                            <div key={q.label} className="contents">
                              <dt className="pt-2 text-muted-foreground">{q.label}</dt>
                              <dd>
                                <Textarea defaultValue={q.value} onChange={() => handleAnswerChange(section)} className="min-h-16 resize-none" />
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </TabsContent>
                    </Tabs>
                  </div>
                )
              })}
            </TabsContent>
            <TabsContent value="categorical"><div className="text-muted-foreground">Categorical</div></TabsContent>
          </TabBar>
        </div>
      ) : page === 'Products' ? (
        <div className="flex h-full">
          <VerticalPane title="Products" defaultCollapsed menu={[{ label: 'New product', icon: 'plus' }]}>
            <div className="flex flex-col gap-1 overflow-auto p-2">
              <Button variant="ghost" size="sm" className="w-full justify-start bg-accent text-accent-foreground">Product 1</Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">Product 2</Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">Product 3</Button>
            </div>
          </VerticalPane>
          <ChatPane />
          <TabBar tabs={aiAdminTabs} defaultValue="model" className="min-h-0 flex-1 p-4">
            {aiAdminData.tabs.map(({ key, label }) => (
              <TabsContent key={key} value={key} className="min-h-0">
                {key === 'model' ? (
                  <Textarea defaultValue={JSON.stringify(aiAdminData, null, 2)} spellCheck={false} className="h-full resize-none font-mono" />
                ) : key === 'files' ? (
                  <p className="text-muted-foreground">
                    {filesCount} file{filesCount !== 1 && 's'} {filesCount === 1 ? 'is' : 'are'} sources in Global context. <button className="text-primary underline" onClick={() => setPage('Context manager')}>Go to Context manager</button>
                  </p>
                ) : (
                  <div className="text-muted-foreground">{label}</div>
                )}
              </TabsContent>
            ))}
          </TabBar>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-muted-foreground">{page}</div>
      )}
    </AppShell>
  )
}

export const AiAdmin = {
  name: 'AI admin',
  render: () => (
    <ContextProgressProvider layers={globalLayers}>
      <AiAdminView />
    </ContextProgressProvider>
  ),
}
