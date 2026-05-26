import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default {
  title: 'shadcn/Checkbox',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/checkbox">Checkbox - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}
