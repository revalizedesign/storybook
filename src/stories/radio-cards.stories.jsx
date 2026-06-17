import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default {
  title: 'Other frameworks/Radio cards',
  parameters: {
    docs: { description: { component: '<a href="https://www.radix-ui.com/themes/docs/components/radio-cards">Radio Cards - Radix Themes</a>' } },
  },
}

export const Default = {
  render: () => (
    <RadioGroup defaultValue="a" className="flex gap-3">
      {[['a', 'Option A'], ['b', 'Option B'], ['c', 'Option C']].map(([value, label]) => (
        <label key={value} className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:bg-muted has-[:checked]:border-primary">
          <RadioGroupItem value={value} />
          <span className="text-sm font-medium">{label}</span>
        </label>
      ))}
    </RadioGroup>
  ),
}
