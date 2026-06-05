import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Sonner',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/sonner">Sonner - shadcn/ui</a>' },
      page: createDocsPage(),
    },
  },
}

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Jonathan: Defined · High priority. Sonner toasts, 4 types: success, error, warning, info. Non-blocking feedback for save/import/delete/error. Never use browser alert() dialogs.',
      },
    },
  },
  render: () => (
    <>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => toast('Default toast')}>Default</Button>
        <Button variant="outline" onClick={() => toast.success('Product saved successfully')}>Success</Button>
        <Button variant="outline" onClick={() => toast.error('Import failed — invalid CSV format', { action: { label: 'View errors', onClick: () => {} } })}>Error</Button>
        <Button variant="outline" onClick={() => toast.warning('Session expires in 5 minutes')}>Warning</Button>
        <Button variant="outline" onClick={() => toast.info('3 products have no pricing rules')}>Info</Button>
      </div>
      <Toaster richColors />
    </>
  ),
}
