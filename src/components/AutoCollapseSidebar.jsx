import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'

export function AutoCollapseSidebar({ onClick, ...props }) {
  const { setOpen } = useSidebar()
  return <SidebarMenuButton onClick={(e) => { onClick?.(e); setOpen(false) }} {...props} />
}
