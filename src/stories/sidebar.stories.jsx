import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'

export default {
  title: 'shadcn/Sidebar',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/sidebar">Sidebar - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem><SidebarMenuButton>Home</SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton>Settings</SidebarMenuButton></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
}
