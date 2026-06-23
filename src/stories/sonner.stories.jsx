import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default {
  title: 'shadcn/Sonner',
  parameters: {
    docs: {
      description: {
        component: `<a href="https://ui.shadcn.com/docs/components/base/sonner">Sonner - shadcn/ui</a>

**Jonathan:** Sonner toasts, 4 types: success, error, warning, info. Non-blocking feedback for save/import/delete/error. Not browser alert() dialogs.

**Undo:** Reverse the last action, especially after bulk operations. Show undo in a toast, ~5s timeout, one level only, reversible actions only.

**Matt:** Current implementation combines ShadCN patterns with the third-party Sonner library.

**Observations:** Strong from a UX and UI standpoint. Interaction model feels solid. Color treatment may not be fully compatible with the Revalize system.

**What's missing:** Stress testing against Revalize color semantics. Examples of previous toast patterns used across products. Deprecated variants showing what we are moving away from.

**Roadmap:** Validate Sonner colors against the system palette. Add legacy toast examples as deprecated variants. Include "do this / not this" guidance so engineers can clearly identify outdated patterns.`,
      },
    },
  },
}

export const Default = {
  render: () => (
    <>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => toast('Default toast')}>Default</Button>
        <Button variant="outline" onClick={() => toast.success('Product saved successfully')}>Success</Button>
        <Button variant="outline" onClick={() => toast.error('Import failed — invalid CSV format', { action: { label: 'View errors', onClick: () => {} } })}>Error</Button>
        <Button variant="outline" onClick={() => toast.warning('Session expires in 5 minutes')}>Warning</Button>
        <Button variant="outline" onClick={() => toast.info('3 products have no pricing rules')}>Info</Button>
        <Button variant="outline" onClick={() => toast('Deleted 3 configurations', { action: { label: 'Undo', onClick: () => toast('Restored') }, duration: 5000 })}>Undo</Button>
      </div>
      <Toaster richColors />
    </>
  ),
}
