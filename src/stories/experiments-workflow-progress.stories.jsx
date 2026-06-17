import { Fa } from '@/components/Fa'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default {
  title: 'Experiments/Workflow progress',
  parameters: {
    docs: { description: { component: 'Horizontal stage bar from c1c-admin (`renderWorkflowBar`). Iterates `workflow.steps` and marks each by index vs `workflow.step`: done (`i < step`), active (`i === step`), else pending.' } },
  },
}

// workflows['commit-to-cloud'] from fixtures.json
const steps = ['Model', 'Driven constraints', 'Rules', 'Results']

const Bar = ({ name, step }) => (
  <div className="w-[40rem] flex items-center gap-2 rounded-lg border bg-card p-4 text-sm">
    <b className="shrink-0 font-semibold">{name}</b>
    {steps.map((label, i) => {
      const state = i < step ? 'done' : i === step ? 'active' : 'pending'
      return (
        <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
          <Separator className={cn('flex-1', state !== 'pending' && 'bg-primary')} />
          <div className={cn('flex items-center gap-1.5 shrink-0', state === 'active' && 'text-primary font-medium', state === 'pending' && 'text-muted-foreground')}>
            <span className={cn('size-5 rounded-full flex items-center justify-center text-[0.625rem] font-semibold', state === 'done' && 'bg-primary text-primary-foreground', state === 'active' && 'bg-primary/15 text-primary', state === 'pending' && 'bg-muted text-muted-foreground')}>
              {state === 'done' ? <Fa name="circle-check" className="text-xs" /> : i + 1}
            </span>
            <span>{label}</span>
          </div>
        </div>
      )
    })}
  </div>
)

export const Default = {
  render: () => <Bar name="Commit to cloud" step={2} />,
}

export const Start = {
  render: () => <Bar name="Commit to cloud" step={0} />,
}
