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
import july from './configureone-aiadmin-july.json'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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

// ——— AI admin (July) — recreation of the July 8–9 prototype screenshots. Coverage is tracked in
// ai-admin-inventory.md, rendered as Products/Configure One/AI admin inventory.

const sevDot = { amber: 'bg-amber-500', gray: 'bg-muted-foreground/40', green: 'bg-green-500', red: 'bg-red-500' }
const statusDotColor = { Empty: 'bg-muted-foreground/40', Review: 'bg-amber-500', Trained: 'bg-green-500' }
const Dot = ({ tone = 'gray' }) => <span aria-hidden className={`size-2 shrink-0 rounded-full ${sevDot[tone] ?? sevDot.gray}`} />

const JulyFindings = ({ findings }) => (
  <div className="flex flex-col gap-1">
    <h3 className="font-semibold">Findings · {findings.length} open</h3>
    <p className="text-muted-foreground">Each finding routes to the view that proves it.</p>
    {findings.map(f => (
      <div key={f.text} className="flex items-center gap-3 rounded-md border px-3 py-2">
        <Dot tone={f.sev} />
        <span className="flex-1">{f.text}</span>
        <Button size="sm" variant="outline">Ask agent to fix</Button>
        <Button size="sm" variant="ghost">{f.action}<Fa name="arrow-right" /></Button>
      </div>
    ))}
  </div>
)

const graphBadge = { AI: 'bg-blue-100 text-blue-800', INF: 'bg-amber-100 text-amber-800', error: 'bg-red-100 text-red-800', warn: 'bg-amber-100 text-amber-800' }
const JulyGraph = ({ graph }) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-4 text-muted-foreground">
      <span>Dependency and lineage view — grouped by input group, colored by status.</span>
      {graph.legend.map(l => <Badge key={l} variant="outline">{l}</Badge>)}
    </div>
    <div className="grid grid-cols-4 items-start gap-4">
      {graph.columns.map(col => (
        <div key={col.name} className="flex flex-col gap-2">
          <div className="font-semibold tracking-widest text-muted-foreground uppercase">{col.name}</div>
          {col.nodes.map(n => (
            <div key={n.name} className={`flex flex-col gap-1 rounded-md border p-2 ${n.muted ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-2">
                <span className="font-mono">{n.name}</span>
                {n.badge && <Badge className={graphBadge[n.badge]}>{n.badge}</Badge>}
              </div>
              <div className="text-muted-foreground">{n.control}{n.note && ` · ${n.note}`}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
)

const JulyModelTree = ({ model }) => (
  <div className="flex flex-col gap-3">
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative w-64">
        <Fa name="magnifying-glass" className="absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search inputs, options, part #s..." className="pl-8" />
      </div>
      {model.filters.map((f, i) => <Badge key={f} variant={i === 0 ? 'default' : 'outline'}>{f}</Badge>)}
      <Select defaultValue={model.types[0]}>
        <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
        <SelectContent>{model.types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
      </Select>
      <div className="flex-1" />
      <Button size="sm" variant="ghost">Expand all</Button>
      <Button size="sm" variant="ghost">Collapse all</Button>
    </div>
    <p className="text-muted-foreground">{model.summary}</p>
    {model.pages.map(pg => (
      <div key={pg.name} className="flex flex-col gap-2">
        <div className="border-b pb-1 font-semibold tracking-widest text-muted-foreground uppercase">{pg.name}</div>
        {pg.groups.map(g => (
          <Collapsible key={g.name} defaultOpen={Boolean(g.inputs)} className="group/tree rounded-md border">
            <CollapsibleTrigger className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted">
              <Fa name="chevron-right" className="transition-transform group-data-[open]/tree:rotate-90" />
              <span className="font-semibold">{g.name}</span>
              {g.chips?.map(c => <Badge key={c} className="bg-amber-100 text-amber-800">{c}</Badge>)}
              <span className="ml-auto text-muted-foreground">{g.source}</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col border-t">
                {g.inputs?.map(input => (
                  <div key={input.var} className="flex flex-col gap-2 border-b px-3 py-2 last:border-b-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span>{input.name}</span>
                      <span className="font-mono text-muted-foreground">{input.var}</span>
                      {input.chips?.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
                      <span className="ml-auto text-muted-foreground">{input.control}</span>
                    </div>
                    {input.options && (
                      <dl className="grid w-fit grid-cols-[auto_1fr] gap-x-6 gap-y-1 rounded-md bg-muted/50 px-3 py-2">
                        {input.options.map(([value, label]) => (
                          <div key={value} className="contents"><dt className="font-mono text-muted-foreground">{value}</dt><dd>{label}</dd></div>
                        ))}
                      </dl>
                    )}
                    {input.callout && (
                      <div className="flex flex-col gap-2 rounded-md bg-amber-50 px-3 py-2 text-amber-900">
                        {input.callout.text}
                        <div className="flex gap-2">{input.callout.actions.map(a => <Button key={a} size="sm" variant="outline">{a}</Button>)}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    ))}
  </div>
)

const specTone = (status) => status === 'In use' ? 'bg-green-100 text-green-800' : status === 'Junk' ? 'bg-muted text-muted-foreground' : status.startsWith('Orphan') ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
const JulySpecs = ({ specs }) => (
  <Table>
    <TableHeader>
      <TableRow><TableHead>Spec (attribute)</TableHead><TableHead>Type</TableHead><TableHead>Carried by</TableHead><TableHead>Read by</TableHead><TableHead>Status</TableHead></TableRow>
    </TableHeader>
    <TableBody>
      {specs.map(s => (
        <TableRow key={s.name}>
          <TableCell>{s.name}</TableCell>
          <TableCell className="text-muted-foreground">{s.type}</TableCell>
          <TableCell className="font-mono text-muted-foreground">{s.carriedBy}</TableCell>
          <TableCell className="text-muted-foreground">{s.readBy}</TableCell>
          <TableCell><Badge className={specTone(s.status)}>{s.status}</Badge></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

const JulyRules = ({ rules }) => (
  <Tabs defaultValue="procedural">
    <TabsList variant="line">
      <TabsTrigger value="procedural">Procedural · 39 + 8 groups</TabsTrigger>
      <TabsTrigger value="relational">Relational · 3</TabsTrigger>
      <TabsTrigger value="query">Query · 1</TabsTrigger>
      <TabsTrigger value="formulas">Formulas · 2</TabsTrigger>
      <TabsTrigger value="loops">Loops · 1 iterator</TabsTrigger>
    </TabsList>
    <TabsContent value="procedural" className="flex flex-col gap-3">
      <p className="text-muted-foreground">{rules.procedural.summary}</p>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline"><Fa name="route" />{rules.procedural.trace}</Badge>
        <div className="relative w-64">
          <Fa name="magnifying-glass" className="absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search logic items, conditions, inputs..." className="pl-8" />
        </div>
        {rules.procedural.filters.map((f, i) => <Badge key={f} variant={i === 0 ? 'default' : 'outline'}>{f}</Badge>)}
      </div>
      <div className="rounded-md bg-amber-50 px-3 py-2 text-amber-900">{rules.procedural.banner}</div>
      <div className="flex flex-col gap-1">
        {rules.procedural.items.map(item => (
          <div key={item.name} className={`flex flex-wrap items-center gap-2 rounded-md border px-3 py-2 ${item.inactive ? 'opacity-60' : ''}`}>
            <Dot tone={item.fired ? 'green' : 'gray'} />
            <Badge variant="secondary">{item.type}</Badge>
            <span className="font-semibold">{item.name}</span>
            {item.group && <span className="text-muted-foreground">({item.group})</span>}
            {item.code && <span className="font-mono text-muted-foreground">{item.code}</span>}
            {item.inactive && <Badge variant="outline">Inactive</Badge>}
            {item.desc && <span className="ml-auto text-muted-foreground">{item.desc}</span>}
          </div>
        ))}
      </div>
    </TabsContent>
    <TabsContent value="relational" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold">{rules.relational.title}</span>
        {rules.relational.chips.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
      </div>
      <Card className="flex-col gap-2 p-4">
        <div className="flex items-center gap-2"><Fa name="wand-magic-sparkles" /><span className="font-semibold">Agent decision — paradigm normalization</span></div>
        <p className="text-muted-foreground">{rules.relational.decision}</p>
        <div className="flex gap-2"><Button size="sm">Approve</Button><Button size="sm" variant="outline">Rebuild as procedural chain</Button><Button size="sm" variant="ghost">View source</Button></div>
      </Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver value</TableHead>
              {rules.relational.columns.map(c => <TableHead key={c}>{c}</TableHead>)}
              <TableHead>Default</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.relational.rows.map(r => (
              <TableRow key={r.name}>
                <TableCell className={r.warn ? 'text-red-600' : ''}>{r.name}</TableCell>
                {r.cells.map((on, i) => (
                  <TableCell key={i} className={rules.relational.columns[i] === r.default ? 'bg-accent font-semibold' : 'text-muted-foreground'}>
                    {on ? <Fa name="check" /> : ''}
                  </TableCell>
                ))}
                <TableCell className={r.default ? '' : 'text-red-600'}>{r.default ?? 'none'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Card className="flex-col gap-3 p-4">
        <span className="font-semibold">Live end-user control — the same rule</span>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <Label>Model (driver)</Label>
            <Select defaultValue="F-350">
              <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
              <SelectContent>{rules.relational.rows.map(r => <SelectItem key={r.name} value={r.name}>{r.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Wheelbase (driven — re-evaluates on driver change)</Label>
            <Select defaultValue="157&quot;">
              <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
              <SelectContent>{rules.relational.columns.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-muted-foreground">{rules.relational.live}</p>
      </Card>
      <div className="flex items-center gap-3 rounded-md border px-3 py-2">
        <Dot tone="amber" /><span className="flex-1">{rules.relational.coverage}</span>
        <Button size="sm" variant="outline">Ask agent to fix</Button>
      </div>
    </TabsContent>
    <TabsContent value="query" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span>{rules.query.summary}</span>
        {rules.query.chips.map(c => <Badge key={c} className="bg-amber-100 text-amber-800">{c}</Badge>)}
      </div>
      <p className="text-muted-foreground">Sources: {rules.query.sources}</p>
      <div className="grid grid-cols-2 items-start gap-4">
        <Card className="flex-col gap-2 p-4">
          <span className="font-semibold tracking-widest text-muted-foreground uppercase">Conditions</span>
          {rules.query.conditions.map((c, i) => (
            <div key={c.text} className="flex items-center gap-2">
              <span className="w-4 text-muted-foreground">{i + 1}</span>
              <span className="flex-1">{c.text}</span>
              <Badge variant={c.paused ? 'destructive' : 'outline'}>{c.paused ? 'Paused' : 'Active'}</Badge>
            </div>
          ))}
        </Card>
        <Card className="flex-col gap-2 p-4">
          <span className="font-semibold tracking-widest text-muted-foreground uppercase">Test inputs</span>
          {rules.query.tests.map(t => (
            <div key={t.label} className="flex items-center gap-2">
              <span className="flex-1 text-muted-foreground">{t.label}{t.note && ` (${t.note})`}</span>
              <Input defaultValue={t.value} className="w-24" />
            </div>
          ))}
        </Card>
        <Card className="flex-col gap-2 p-4">
          <span className="font-semibold text-green-700">Pass · {rules.query.pass.count}</span>
          {rules.query.pass.rows.map(r => (
            <div key={r.name} className="flex items-center gap-2">
              <span className="font-mono">{r.name}</span>
              <span className="flex-1 text-muted-foreground">{r.meta}</span>
              {r.tag && <Badge variant="secondary">{r.tag}</Badge>}
            </div>
          ))}
          <span className="text-muted-foreground">+{rules.query.pass.more} more</span>
        </Card>
        <Card className="flex-col gap-2 p-4">
          <span className="font-semibold text-red-700">Fail · {rules.query.fail.count}</span>
          {rules.query.fail.rows.map(r => (
            <div key={r.name} className="flex items-center gap-2">
              <span className="font-mono">{r.name}</span>
              <span className="flex-1 text-muted-foreground">{r.reason}</span>
            </div>
          ))}
          <span className="text-muted-foreground">+{rules.query.fail.more} more</span>
        </Card>
      </div>
    </TabsContent>
    <TabsContent value="formulas" className="flex flex-col gap-3">
      <p className="text-muted-foreground">What is this number, computed from the others?</p>
      <div className="rounded-md bg-muted/50 px-3 py-2 font-mono">{rules.formulas.strip}</div>
      {rules.formulas.cards.map(f => (
        <Card key={f.name} className="flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{f.name}</span>
            {f.tags.map(t => <Badge key={t} variant={t === 'Semantic finding' ? 'destructive' : 'secondary'}>{t}</Badge>)}
            <span className="ml-auto font-semibold">{f.result}</span>
          </div>
          {f.rows.map(r => <div key={r} className="font-mono text-muted-foreground">{r}</div>)}
          <p className="text-muted-foreground">{f.tests}</p>
          {f.warning && (
            <div className="flex items-center gap-3 rounded-md bg-amber-50 px-3 py-2 text-amber-900">
              <span className="flex-1">{f.warning}</span>
              <Button size="sm" variant="outline">{f.action}</Button>
            </div>
          )}
        </Card>
      ))}
    </TabsContent>
    <TabsContent value="loops" className="flex flex-col gap-3">
      <p className="text-muted-foreground">What repeats for each item? Exactly one real iterator.</p>
      <Card className="flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{rules.loops.iterator.name}</span>
          <Badge variant="secondary">Iterator · TRK</Badge>
        </div>
        <p className="text-muted-foreground">{rules.loops.iterator.meta}</p>
        {rules.loops.iterator.steps.map(s => (
          <div key={s.name} className={`flex items-center gap-2 ${s.inactive ? 'opacity-60' : ''}`}>
            <Fa name="rotate" className="text-muted-foreground" />
            <span>{s.name}</span>
            {s.note && <span className="font-mono text-muted-foreground">{s.note}</span>}
            {s.inactive && <Badge variant="outline">Inactive</Badge>}
          </div>
        ))}
      </Card>
      {rules.loops.findings.map(f => (
        <div key={f.text} className="flex items-center gap-3 rounded-md bg-amber-50 px-3 py-2 text-amber-900">
          <span className="flex-1">{f.text}</span>
          {f.action && <Button size="sm" variant="outline">{f.action}</Button>}
        </div>
      ))}
    </TabsContent>
  </Tabs>
)

function JulyWorkspace() {
  const ws = july.workspace
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center gap-3 border-b p-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-blue-700 font-semibold text-white">C1</div>
        <div className="flex flex-col">
          <span className="font-semibold">{ws.product.name} · AI Model Builder</span>
          <span className="text-muted-foreground">{ws.product.meta}</span>
        </div>
        <Badge variant="secondary">{ws.product.build}</Badge>
        <div className="flex-1" />
        <Button variant="outline"><Fa name="eye" />Open preview</Button>
      </div>
      <div className="flex items-center gap-3 border-b px-4 py-2">
        <Progress value={ws.review.pct} className="w-40" />
        <span className="text-muted-foreground">{ws.review.pct}% reviewed</span>
        {ws.review.chips.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
        <div className="flex-1" />
        <Button>Continue review</Button>
      </div>
      <TabBar tabs={aiAdminTabs} defaultValue="overview" className="min-h-0 flex-1 overflow-y-auto p-4">
        <TabsContent value="overview" className="flex flex-col gap-6">
          <Tabs defaultValue="layout1">
            <TabsList variant="line">
              <TabsTrigger value="layout1">Layout 1</TabsTrigger>
              <TabsTrigger value="layout2">Layout 2</TabsTrigger>
              <TabsTrigger value="graph">Graph</TabsTrigger>
            </TabsList>
            <TabsContent value="layout1" className="flex flex-col gap-3">
              <h3 className="font-semibold">What the agent built, and from what</h3>
              <div className="grid grid-cols-5 gap-3">
                {ws.stats.map(s => (
                  <Card key={s.label} className={`gap-1 p-3 ${s.alert ? 'border-red-300' : ''}`}>
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="text-2xl font-semibold">{s.value}</span>
                    <span className="text-muted-foreground">{s.sub}</span>
                    <Progress value={s.pct} />
                    <Badge variant={s.alert ? 'destructive' : 'secondary'} className="w-fit">{s.chip}</Badge>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="layout2" className="flex flex-col gap-2">
              <h3 className="font-semibold">What to review next</h3>
              <p className="text-muted-foreground">Ordered by risk.</p>
              {ws.reviewNext.map((r, i) => (
                <div key={r} className="flex items-center gap-3 rounded-md border px-3 py-2">
                  <span className="text-muted-foreground">{i + 1}</span>
                  <span className="flex-1">{r}</span>
                  <Fa name="chevron-right" className="text-muted-foreground" />
                </div>
              ))}
            </TabsContent>
            <TabsContent value="graph"><JulyGraph graph={ws.graph} /></TabsContent>
          </Tabs>
          <JulyFindings findings={ws.findings} />
        </TabsContent>
        <TabsContent value="files" className="flex flex-col gap-2">
          {ws.files.map(f => (
            <div key={f.name} className="flex items-center gap-3 rounded-md border px-3 py-2">
              <Fa name={f.icon} />
              <span className="font-mono">{f.name}</span>
              <span className="flex-1 text-muted-foreground">{f.meta}</span>
              <Badge variant="secondary">staged</Badge>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="model">
          <Tabs defaultValue="tree">
            <TabsList variant="line">
              <TabsTrigger value="tree">Tree</TabsTrigger>
              <TabsTrigger value="specs">Specs · {ws.specs.length}</TabsTrigger>
              <TabsTrigger value="graph">Graph</TabsTrigger>
              <TabsTrigger value="json">Raw JSON</TabsTrigger>
            </TabsList>
            <TabsContent value="tree"><JulyModelTree model={ws.model} /></TabsContent>
            <TabsContent value="specs" className="flex flex-col gap-2">
              <p className="text-muted-foreground">Usage-first catalog: carried by and read by. Findings route here pre-filtered.</p>
              <JulySpecs specs={ws.specs} />
            </TabsContent>
            <TabsContent value="graph"><JulyGraph graph={ws.graph} /></TabsContent>
            <TabsContent value="json">
              <Textarea readOnly defaultValue={JSON.stringify(ws.model, null, 2)} spellCheck={false} className="h-96 resize-none font-mono" />
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="rules"><JulyRules rules={ws.rules} /></TabsContent>
        <TabsContent value="results" className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {ws.results.chips.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
            {ws.results.explainer.map(e => <Badge key={e} variant="outline">{e}</Badge>)}
          </div>
          <p className="text-muted-foreground">{ws.results.note}</p>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Line</TableHead><TableHead>Type</TableHead><TableHead>Part</TableHead><TableHead>Include when</TableHead><TableHead>Which part</TableHead><TableHead>Qty driven by</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {ws.results.bom.map(b => (
                <TableRow key={b.line}>
                  <TableCell>{b.line} {b.tag && <Badge variant="destructive">{b.tag}</Badge>}</TableCell>
                  <TableCell className="text-muted-foreground">{b.type}</TableCell>
                  <TableCell className="font-mono">{b.part}</TableCell>
                  <TableCell className="text-muted-foreground">{b.include ?? '—'}</TableCell>
                  <TableCell className="text-muted-foreground">{b.which ?? '—'}</TableCell>
                  <TableCell className="text-muted-foreground">{b.qty ?? '1'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="preview" className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">What just fired</h3>
            <p className="text-muted-foreground">Live rule activity for the current configuration.</p>
          </div>
          {ws.preview.fired.map(f => (
            <div key={f.text} className={`flex items-center gap-3 rounded-md border px-3 py-2 ${f.muted ? 'opacity-60' : ''}`}>
              <Dot tone={f.sev ?? 'green'} />
              <span className="flex-1">{f.text}</span>
              <Fa name="arrow-right" className="text-muted-foreground" />
            </div>
          ))}
          <div className="rounded-md bg-muted/50 px-3 py-2 text-muted-foreground">{ws.preview.note}</div>
        </TabsContent>
        <TabsContent value="verify" className="flex flex-col gap-2">
          {ws.verify.map(t => (
            <div key={t.name} className="flex items-center gap-3 rounded-md border px-3 py-2">
              <Fa name="badge-check" />
              <span className="flex-1">{t.name}</span>
              <Badge variant="secondary">{t.status}</Badge>
              <Button size="sm" variant="outline">Run</Button>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="commit" className="flex flex-col gap-3">
          {ws.commit.map(c => (
            <div key={c.text} className="flex items-center gap-3 rounded-md border border-green-300 bg-green-50 px-3 py-2 text-green-900">
              <Fa name="code-commit" />
              <span className="flex-1">Staged change — {c.text}</span>
              <Button size="sm" variant="ghost">Undo</Button>
            </div>
          ))}
          <p className="text-muted-foreground">{ws.product.meta}</p>
          <Button className="w-fit"><Fa name="cloud-arrow-up" />Commit build</Button>
        </TabsContent>
      </TabBar>
    </div>
  )
}

function JulyWizard({ onDone, onOpenChange, open }) {
  const [step, setStep] = useState(0)
  const w = july.wizard
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Fa name="wand-magic-sparkles" />Set up Knowledge</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          {w.steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className={`flex size-6 items-center justify-center rounded-full ${i < step ? 'bg-green-100 text-green-800' : i === step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {i < step ? <Fa name="check" /> : i + 1}
              </span>
              <span className={i === step ? 'font-semibold' : 'text-muted-foreground'}>{s}</span>
              {i < w.steps.length - 1 && <Fa name="chevron-right" className="text-muted-foreground" />}
            </div>
          ))}
        </div>
        {step === 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Where should we learn from?</h3>
            <Tabs defaultValue="From a link">
              <TabsList>{w.source.tabs.map(t => <TabsTrigger key={t} value={t}>{t}</TabsTrigger>)}</TabsList>
              <TabsContent value="From a link" className="flex flex-col gap-3">
                <div className="relative">
                  <Fa name="globe" className="absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground" />
                  <Input defaultValue="sumitmomo.com" className="pl-8" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Extract:</span>
                  {w.source.chips.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
                </div>
                <Button onClick={() => setStep(1)}>Analyze source</Button>
              </TabsContent>
              <TabsContent value="Upload files" className="text-muted-foreground">Drop product data, logic, and BOM files here.</TabsContent>
              <TabsContent value="Describe it" className="flex flex-col gap-3">
                {w.source.describe.map(f => (
                  <div key={f.label} className="flex flex-col gap-1">
                    <Label>{f.label}</Label>
                    {f.label === 'What you make' ? <Textarea placeholder={f.placeholder} className="resize-none" /> : <Input placeholder={f.placeholder} />}
                  </div>
                ))}
                <Button disabled>Continue</Button>
              </TabsContent>
            </Tabs>
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Reading sumitmomo.com</h3>
            <p className="text-muted-foreground">The agent is pulling your knowledge…</p>
            {w.extract.map((item, i) => (
              <div key={item} className="flex items-center gap-2">
                {i < 2 ? <Fa name="circle-check" className="text-green-600" /> : <Spinner className="size-4" />}
                <span className={i < 2 ? '' : 'text-muted-foreground'}>{item}</span>
              </div>
            ))}
            <Progress value={60} />
            <Button variant="outline" onClick={() => setStep(2)}>Continue</Button>
          </div>
        )}
        {step === 2 && (
          <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
            <h3 className="font-semibold">Here's what we learned</h3>
            <p className="text-muted-foreground">Confirm or edit each area before we train the agent. You can refine later in Knowledge.</p>
            <Tabs defaultValue="Company">
              <TabsList variant="line">{w.review.areas.map(a => <TabsTrigger key={a} value={a}>{a}</TabsTrigger>)}</TabsList>
            </Tabs>
            <p className="text-muted-foreground">{w.review.summary}</p>
            {w.review.fields.map(f => (
              <div key={f.label} className="flex flex-col gap-1">
                <Label>{f.label}</Label>
                <Textarea defaultValue={f.value} className="min-h-16 resize-none" />
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground">Vocabulary the agent should use:</span>
              {w.review.vocab.map(v => <Badge key={v} variant="secondary">{v}</Badge>)}
            </div>
            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)}>Confirm and train agent</Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center gap-3 text-center">
            <Fa name="circle-check" className="text-3xl text-green-600" />
            <h3 className="font-semibold">Knowledge is set</h3>
            <p className="text-muted-foreground">{w.done.subtitle}</p>
            {w.done.cards.map(c => (
              <div key={c} className="flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left"><Fa name="check" className="text-green-600" />{c}</div>
            ))}
            <Button onClick={onDone}>Build your first product</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

const KnowledgeLayerRow = ({ depth = 0, layer }) => (
  <>
    <div className={`flex items-center gap-2 rounded-md py-1.5 pr-2 ${depth === 0 ? 'pl-2' : depth === 1 ? 'pl-6' : 'pl-10'} ${layer.selected ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}>
      <span className="flex-1">{layer.name}</span>
      {layer.type && <span className="text-muted-foreground">{layer.type}</span>}
      {layer.status && <span aria-hidden className={`size-2 rounded-full ${statusDotColor[layer.status]}`} />}
    </div>
    {layer.children?.map(child => <KnowledgeLayerRow key={child.name} depth={depth + 1} layer={child} />)}
  </>
)

function JulyKnowledge() {
  const k = july.knowledge
  return (
    <div className="flex h-full">
      <VerticalPane title="Context Layers" width="w-72">
        <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2">
          {k.layers.map(layer => <KnowledgeLayerRow key={layer.name} layer={layer} />)}
        </div>
        <div className="flex items-center gap-3 border-t p-3 text-muted-foreground">
          {k.legend.map(l => <span key={l} className="flex items-center gap-1"><span aria-hidden className={`size-2 rounded-full ${statusDotColor[l]}`} />{l}</span>)}
        </div>
      </VerticalPane>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-6">
        <span className="font-semibold tracking-widest text-muted-foreground uppercase">{k.detail.eyebrow}</span>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">{k.detail.title}</h2>
          <Badge className="bg-amber-100 text-amber-800">Needs review</Badge>
        </div>
        <p className="text-muted-foreground">{k.detail.description}</p>
        <Tabs defaultValue="review">
          <TabsList variant="line">
            <TabsTrigger value="sources">Sources · 2</TabsTrigger>
            <TabsTrigger value="review">Review · 1</TabsTrigger>
          </TabsList>
          <TabsContent value="sources" className="flex flex-col gap-2">
            {['NTEA Work Truck standards', 'Vocational_Body_Market_2026'].map(s => (
              <div key={s} className="flex items-center gap-3 rounded-md border px-3 py-2"><Fa name="file-lines" />{s}</div>
            ))}
          </TabsContent>
          <TabsContent value="review" className="flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-md bg-amber-50 px-3 py-2 text-amber-900">
              <span className="flex-1">1 block waiting for your call. Only accepted blocks load into the context window.</span>
              <Button size="sm" variant="outline">Accept all</Button>
            </div>
            {k.detail.proposed.map(b => (
              <Card key={b.title} className="flex-col gap-2 p-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{b.title}</span>
                  <Badge variant="secondary">Proposed</Badge>
                  <span className="ml-auto text-muted-foreground">{b.meta}</span>
                </div>
                <p>{b.text}</p>
                <div className="flex gap-2"><Button size="sm">Accept</Button><Button size="sm" variant="outline">Edit</Button><Button size="sm" variant="ghost">Discard</Button></div>
              </Card>
            ))}
            <span className="font-semibold tracking-widest text-muted-foreground uppercase">Reviewed · in context</span>
            {k.detail.reviewed.map(b => (
              <Card key={b.title} className="flex-col gap-2 p-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{b.title}</span>
                  <Badge className="bg-green-100 text-green-800">In context</Badge>
                  <span className="ml-auto text-muted-foreground">{b.meta}</span>
                </div>
                <p>{b.text}</p>
                <div className="flex gap-2"><Button size="sm" variant="outline">Edit</Button><Button size="sm" variant="ghost">Remove</Button></div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function JulyAgent() {
  const a = july.agent
  return (
    <div className="flex flex-col gap-6 overflow-y-auto p-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2"><h2 className="text-xl font-semibold">Agent</h2><Badge variant="outline">Concept</Badge></div>
        <p className="text-muted-foreground">{a.intro}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Review cadence</h3>
        <RadioGroup defaultValue={a.cadence[0].label} className="flex gap-3">
          {a.cadence.map(c => (
            <label key={c.label} className="flex flex-1 cursor-pointer items-start gap-3 rounded-lg border p-4 hover:bg-muted has-[:checked]:border-primary">
              <RadioGroupItem value={c.label} />
              <span className="flex flex-col gap-1">
                <span className="flex items-center gap-2 font-semibold">{c.label}{c.recommended && <Badge variant="secondary">Recommended</Badge>}</span>
                <span className="text-muted-foreground">{c.desc}</span>
              </span>
            </label>
          ))}
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">What the agent can do on its own</h3>
        {a.autonomy.map(row => (
          <div key={row.label} className="flex items-center gap-3 rounded-md border px-3 py-2">
            <span className="flex-1">{row.label}{row.note && <span className="text-muted-foreground"> — {row.note}</span>}</span>
            {row.locked ? (
              <Badge variant="outline"><Fa name="lock" />{row.locked}</Badge>
            ) : (
              ['Auto', 'Needs sign-off'].map(mode => (
                <Button key={mode} size="sm" variant={row.mode === mode ? 'default' : 'outline'}>{mode}</Button>
              ))
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Guardrails</h3>
        {a.guardrails.map(g => (
          <div key={g.label} className="flex items-center gap-3 rounded-md border px-3 py-2">
            <span className="flex-1">{g.label}</span>
            {g.options?.map(o => <Button key={o} size="sm" variant={g.value === o ? 'default' : 'outline'}>{o}</Button>)}
            {!g.options && !g.locked && <Input defaultValue={g.value} className="w-32" />}
            {g.locked && <><Switch checked disabled /><Badge variant="outline"><Fa name="lock" />{g.locked}</Badge></>}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Model & explainability</h3>
        <div className="flex items-center gap-3 rounded-md border px-3 py-2">
          <span className="flex-1">Builder model</span>
          <Select defaultValue="Balanced (default)">
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>{['Balanced (default)', 'Fast', 'Thorough'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        {a.explainability.map(e => (
          <div key={e.label} className="flex items-center gap-3 rounded-md border px-3 py-2">
            <span className="flex-1">{e.label}</span>
            <Switch defaultChecked={e.on} />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <p className="flex-1 text-muted-foreground">{a.note}</p>
        <Button variant="ghost">Reset</Button>
        <Button>Save changes</Button>
      </div>
    </div>
  )
}

function AiAdminJulyView() {
  const [page, setPage] = useState('Products')
  const [product, setProduct] = useState('AAA Freight Truck')
  const [wizardOpen, setWizardOpen] = useState(false)
  return (
    <AppShell
      header={<><div className="size-7 rounded bg-blue-700" /><span className="font-semibold">Intelligence for Configure One</span></>}
      sidebar={
        <>
          <SidebarHeader><TeamSwitcher /></SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {july.nav.main.map(item => (
                    <SidebarMenuItem key={item.title}>
                      <AutoCollapseSidebar isActive={page === item.title} onClick={() => setPage(item.title)}><Fa name={item.icon} />{item.title}</AutoCollapseSidebar>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Manage</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {july.nav.manage.map(item => (
                    <SidebarMenuItem key={item.title}>
                      <AutoCollapseSidebar isActive={page === item.title} onClick={() => setPage(item.title)}><Fa name={item.icon} />{item.title}</AutoCollapseSidebar>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter><NavUser /></SidebarFooter>
          <SidebarRail />
        </>
      }
    >
      {page === 'Home' ? (
        <div className="flex h-full flex-col gap-4 p-6">
          <Card className="w-full flex-row items-center gap-4 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted"><Fa name="brain" /></div>
            <div className="flex flex-1 flex-col gap-1">
              <CardTitle>Set up Knowledge</CardTitle>
              <CardDescription>Teach the agent your company, industry, and catalog before the first build.</CardDescription>
            </div>
            <Button onClick={() => setWizardOpen(true)}>Set up Knowledge</Button>
          </Card>
          <Card className="w-full flex-row items-center gap-4 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted"><Fa name="cube" /></div>
            <div className="flex flex-1 flex-col gap-1">
              <CardTitle>Build your first product</CardTitle>
              <CardDescription>Upload product data, logic, and BOM files — the agent stages a model for review.</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setPage('Products')}>Go to Products</Button>
          </Card>
        </div>
      ) : page === 'Products' ? (
        <div className="flex h-full">
          <VerticalPane title="Products" menu={[{ label: 'New product', icon: 'plus' }]}>
            <div className="flex flex-col gap-1 overflow-auto p-2">
              {['AAA Freight Truck', 'Cyclo'].map(p => (
                <Button key={p} variant="ghost" size="sm" onClick={() => setProduct(p)} className={`w-full justify-start ${product === p ? 'bg-accent text-accent-foreground' : ''}`}>{p}</Button>
              ))}
            </div>
          </VerticalPane>
          {product === 'Cyclo' ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex items-center gap-3 border-b p-4">
                <Button variant="ghost" size="icon" aria-label="Back"><Fa name="chevron-left" /></Button>
                <Fa name="cube" />
                <div className="flex flex-col">
                  <span className="font-semibold">Cyclo</span>
                  <span className="text-muted-foreground">Dry Freight</span>
                </div>
                <Badge variant="secondary">Building…</Badge>
              </div>
              <div className="flex min-h-0 flex-1">
                <ChatPane pinned working messages={july.build.messages} status="Laying foundations…" />
                <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
                  <Spinner />
                  <span>Building your model… watch the agent work in the chat.</span>
                </div>
              </div>
            </div>
          ) : <JulyWorkspace />}
        </div>
      ) : page === 'Knowledge' ? (
        <JulyKnowledge />
      ) : page === 'Catalog' ? (
        <div className="flex flex-col gap-3 p-6">
          <h2 className="text-xl font-semibold">Catalog</h2>
          <p className="text-muted-foreground">Published, live products — configurable and quotable in Configure One.</p>
          <div className="flex flex-col gap-2">
            {july.catalog.map(p => (
              <div key={p.name} className="flex items-center gap-3 rounded-md border px-3 py-2 hover:bg-muted">
                <Fa name={p.icon} />
                <span className="flex-1">{p.name}<span className="text-muted-foreground"> · {p.category}</span></span>
                <span className="text-muted-foreground">Published {p.published}</span>
                <Badge className="bg-green-100 text-green-800">Published</Badge>
                <Fa name="chevron-right" className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      ) : page === 'Agent' ? (
        <JulyAgent />
      ) : (
        <div className="flex h-full items-center justify-center text-muted-foreground">{page}</div>
      )}
      <JulyWizard open={wizardOpen} onOpenChange={setWizardOpen} onDone={() => { setWizardOpen(false); setPage('Products'); setProduct('Cyclo') }} />
    </AppShell>
  )
}

export const AiAdminJuly = {
  name: 'AI admin (July)',
  parameters: {
    docs: {
      description: {
        story: 'Recreation of the July 8–9 prototype screenshots ("Intelligence home" and "Aaa truck model workspace"): app shell nav, Set up Knowledge wizard, Knowledge context layers with block review, Catalog, Agent settings (concept), the Cyclo chat-first build flow (uses ChatPane pinned), and the full AI Model Builder workspace — Overview layouts + findings + graph, Files, Model tree/specs, Rules (procedural, relational matrix, query, formulas, loops), Results BOM, Preview "what just fired", Verify, Commit. All data in configureone-aiadmin-july.json; coverage tracked in the AI admin inventory page.',
      },
    },
  },
  render: () => <AiAdminJulyView />,
}
