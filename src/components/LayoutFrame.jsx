import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { Bell, MessageCircle, PanelLeft, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Canonical layout slots — names mirror the regions. Every slot renders ALL items targeting it
// (in array order); how many appear is purely a function of the data. Consumers pass `slot(id)`:
// Default labels them, Slots prints the ids, Examples hydrates from a flat array.
//   announce-center
//   header-left · header-center · header-right
//   main-nav-items · nav-pane
//   content-left · content-right
//   page-title · page-actions
//   tabs · json
//   footer-left · footer-right

export function LayoutFrame({ slot = () => null, wireframe = false }) {
  const [navOpen, setNavOpen] = useState(true)
  const [announce, setAnnounce] = useState(true)
  const fill = c => (wireframe ? '' : c)

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {announce && (
        <div className={cn('relative flex shrink-0 items-center justify-center gap-2 border-b px-3 py-1.5', wireframe ? '' : 'bg-primary text-primary-foreground')}>
          <Bell className="size-4" />
          {slot('announce-center')}
          <button onClick={() => setAnnounce(false)} className="absolute right-3"><X className="size-4" /></button>
        </div>
      )}

      <header className={cn('grid shrink-0 grid-cols-3 items-center gap-2 px-3 py-2', wireframe ? 'border-b' : 'relative z-10 bg-card shadow-md')}>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setNavOpen(o => !o)}><PanelLeft className="size-4" /></Button>
          {slot('header-left')}
        </div>
        <div className="flex items-center justify-center gap-1">{slot('header-center')}</div>
        <div className="flex items-center justify-end gap-1">{slot('header-right')}</div>
      </header>

      <div className="flex min-h-0 flex-1">
        <nav className={cn('flex w-14 shrink-0 flex-col items-center gap-1 py-2', wireframe ? 'border-r text-muted-foreground' : 'bg-neutral-900 text-neutral-400')}>
          {slot('main-nav-items')}
        </nav>

        {navOpen && (
          <aside className={cn('flex w-48 shrink-0 flex-col gap-1 p-2', wireframe ? 'border-r text-muted-foreground' : 'bg-neutral-800 text-neutral-300')}>{slot('nav-pane')}</aside>
        )}

        <main className="flex min-w-0 flex-1 flex-col">
          <div className={cn('flex shrink-0 items-center justify-between gap-2 border-b px-3 py-2', fill('bg-card'))}>
            <div className="flex items-center gap-1">{slot('content-left')}</div>
            <div className="flex items-center gap-2">
              {slot('content-right')}
              <Sheet><SheetTrigger render={<Button variant="outline" size="sm" />}>Right</SheetTrigger><SheetContent><SheetHeader><SheetTitle>Right drawer</SheetTitle></SheetHeader></SheetContent></Sheet>
              <Drawer><DrawerTrigger asChild><Button variant="outline" size="sm">Bottom</Button></DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Bottom drawer</DrawerTitle></DrawerHeader></DrawerContent></Drawer>
              <Button variant="outline" size="sm" onClick={() => toast('Toast — top-right')}>Toast</Button>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2 text-lg font-semibold">{slot('page-title')}</div>
            <div className="flex items-center gap-1">{slot('page-actions')}</div>
          </div>

          <div className="flex shrink-0 items-center gap-3 border-b px-4 py-2">{slot('tabs')}</div>

          <div className="flex min-h-0 flex-1 flex-col p-4">{slot('json')}</div>

          <div className={cn('flex shrink-0 items-center justify-between border-t px-3 py-2', fill('bg-card'))}>
            <div className="flex items-center gap-1">{slot('footer-left')}</div>
            <div className="flex items-center gap-1">{slot('footer-right')}</div>
          </div>
        </main>
      </div>

      <Button size="icon" className="absolute bottom-5 right-5 size-12 rounded-full shadow-lg"><MessageCircle className="size-5" /></Button>
      <Toaster position="top-right" />
    </div>
  )
}
