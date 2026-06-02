import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Check } from 'lucide-react'

export default {
  title: 'Design patterns/Forms & Input/Wizard / multi-step',
  parameters: {
    docs: { description: { component: '**Missing** · Critical. Storybook priority (Matt, 05/27). Break complex configuration into steps with a progress indicator. Completed steps checkmarked, current highlighted, always Back + Continue, never lose data on Back, allow save as draft. No dedicated primitive — light composition.' } },
  },
}

const steps = [
  ['Base config', 'done'],
  ['Pricing', 'active'],
  ['Options', ''],
  ['Review', ''],
]

export const Default = {
  render: () => (
    <div className="w-[34rem] rounded-lg border">
      <div className="flex items-center gap-2 p-4">
        {steps.map(([label, state], i) => (
          <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={`size-6 rounded-full flex items-center justify-center text-xs font-semibold ${state ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {state === 'done' ? <Check className="size-3" /> : i + 1}
              </div>
              <span className={`text-[10px] ${state === 'active' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{label}</span>
            </div>
            {i < steps.length - 1 && <Separator className={`flex-1 ${state === 'done' ? 'bg-primary' : ''}`} />}
          </div>
        ))}
      </div>
      <Separator />
      <div className="p-4 flex flex-col gap-2">
        <div className="text-sm font-semibold">Step 2: Pricing</div>
        <p className="text-sm text-muted-foreground">Set the base price and pricing rules for this configuration.</p>
        <div className="flex justify-between pt-2">
          <Button variant="outline">← Back</Button>
          <Button>Continue →</Button>
        </div>
      </div>
    </div>
  ),
}
