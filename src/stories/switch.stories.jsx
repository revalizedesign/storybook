import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default {
  title: 'shadcn/Switch',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/switch">Switch - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane mode</Label>
    </div>
  ),
}
