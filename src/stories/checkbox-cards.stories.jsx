import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

export default {
  title: 'Other frameworks/Checkbox cards',
  parameters: {
    docs: { description: { component: '<a href="https://www.radix-ui.com/themes/docs/components/checkbox-cards">Checkbox Cards - Radix Themes</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex gap-3">
      {['Option A', 'Option B', 'Option C'].map(label => (
        <label key={label} className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:bg-muted has-[:checked]:border-primary">
          <Checkbox />
          <span className="text-sm font-medium">{label}</span>
        </label>
      ))}
    </div>
  ),
}
