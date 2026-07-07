import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader } from '@/components/ui/drawer'

export function CompareLayout({ children, className, footer, format, header, onClose, open: controlledOpen }) {
  const [internalOpen, setInternalOpen] = useState(true)
  useEffect(() => { setInternalOpen(true) }, [format])
  const open = controlledOpen ?? internalOpen
  const handleClose = (v) => { if (!v) { setInternalOpen(false); onClose?.() } }

  if (format === 'dialog') {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className={cn('flex min-h-[30rem] max-h-[calc(100vh-2rem)] flex-col sm:max-w-[40rem] [&_[data-slot=dialog-title]]:text-base', className)}>
          <DialogHeader>{header}</DialogHeader>
          {children}
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
    )
  }

  if (format === 'drawer') {
    return (
      <Drawer open={open} onOpenChange={handleClose} direction="right">
        <DrawerContent className={cn('data-[vaul-drawer-direction=right]:sm:max-w-[40rem]', className)}>
          <DrawerHeader>{header}</DrawerHeader>
          <div className="flex min-h-0 flex-1 flex-col gap-6 px-4">{children}</div>
          {footer && <DrawerFooter>{footer}</DrawerFooter>}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <div className={cn('flex h-full w-[40rem] flex-col gap-6 border-r p-6', className)}>
      {header}
      {children}
      {footer}
    </div>
  )
}
