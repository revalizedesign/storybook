import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default {
  title: 'shadcn/Radio Group',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/radio-group">Radio Group - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <RadioGroup defaultValue="a">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="a" />
        <Label htmlFor="a">Option A</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="b" />
        <Label htmlFor="b">Option B</Label>
      </div>
    </RadioGroup>
  ),
}
