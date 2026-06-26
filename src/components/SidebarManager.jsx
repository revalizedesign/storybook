import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { PanelLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export const SidebarManagerContext = createContext(null)

export function SidebarManagerProvider({ children }) {
  const [sidebars, setSidebars] = useState({})
  const register = useCallback((name, context) => setSidebars(prev => ({ ...prev, [name]: context })), [])
  const unregister = useCallback((name) => setSidebars(prev => { const next = { ...prev }; delete next[name]; return next }), [])
  const value = useMemo(() => ({ register, unregister, use: (name) => sidebars[name] ?? null }), [register, unregister, sidebars])
  return <SidebarManagerContext.Provider value={value}>{children}</SidebarManagerContext.Provider>
}

export function useSidebarManager() {
  const context = useContext(SidebarManagerContext)
  if (!context) throw new Error('useSidebarManager must be used within a SidebarManagerProvider.')
  return context
}

export function SidebarManager({ children, name }) {
  const sidebarContext = useSidebar()
  const manager = useSidebarManager()
  const sidebarContextRef = useRef(sidebarContext)
  const managerRef = useRef(manager)
  useLayoutEffect(() => { sidebarContextRef.current = sidebarContext; managerRef.current = manager })
  useEffect(() => { managerRef.current.register(name, sidebarContextRef.current); return () => managerRef.current.unregister(name) }, [name])
  useEffect(() => { managerRef.current.register(name, sidebarContext) }, [name, sidebarContext])
  return <>{children}</>
}

export function SidebarManagerTrigger({ name, className, onClick, ...props }) {
  const manager = useContext(SidebarManagerContext)
  const fallback = useSidebar()
  const toggle = name && manager ? manager.use(name) : fallback
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => { onClick?.(event); toggle?.toggleSidebar() }}
      disabled={!toggle}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}
