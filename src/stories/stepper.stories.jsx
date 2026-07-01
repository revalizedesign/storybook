import { useState } from 'react'
import { Stepper, StepperItem, StepperTrigger, StepperIndicator, StepperSeparator, StepperTitle, StepperDescription, StepperNav, StepperPanel, StepperContent } from '@/components/stepper'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Fa } from '@/components/Fa'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight, Check, CircleCheckBig, X } from 'lucide-react'
import steps from './stepper.json'

export default {
  title: 'Libraries/Stepper',
  args: { theme: 'shadcn' },
  argTypes: { theme: { control: 'select', options: ['shadcn', 'Revalize'] } },
  parameters: {
    docs: {
      description: {
        component: `<a href="https://www.stepperize.com/">stepperize</a><br/><a href="https://shadcnstudio.com/docs/components/stepper?base=base">shadcn studio</a><br/><a href="https://reui.io/components/stepper">reui</a>

We use \`@stepperize/react@7.0.0\` which has a different API from the shadcn studio reference (v4).

| Stepperize v4 (shadcn studio) | Stepperize v7 |
|---|---|
| \`defineStepper(...steps)\` | \`defineStepper(steps)\` |
| \`stepper.state.current.data.id\` | \`stepper.current.id\` |
| \`stepper.navigation.goTo()\` | \`stepper.goTo()\` |
| \`stepper.lookup.getIndex()\` | \`stepper.index\` |

The \`onValueChange\` effect was patched to prevent an infinite loop caused by \`stepper.current\` creating a new object reference each render in v7.

**Jonathan:** Break complex configuration into steps with a progress indicator. Completed steps checkmarked, current highlighted, always Back + Continue, do not lose data on Back, allow save as draft.

**Matt:** Foundational to the entire product family. Configure, price, quote. Every product uses multi-step workflows as the core interaction model.`,
      },
    },
  },
}

export const Default = {
  render: ({ theme }) => {
    const [current, setCurrent] = useState(steps[1].id)
    return (
      <Stepper steps={steps} value={current} onValueChange={setCurrent} indicators={{ completed: <Check className="size-4" /> }} className="flex w-full items-center">
        <StepperNav>
          {steps.map((step, index) => (
            <StepperItem key={step.id} stepId={step.id} className="relative flex-1">
              <StepperTrigger className="flex flex-col gap-2.5">
                <StepperIndicator className={theme === 'Revalize' ? 'data-[state=completed]:bg-green-600' : ''}>{index + 1}</StepperIndicator>
                <div className="flex flex-col">
                  <StepperTitle>{step.title}</StepperTitle>
                  <StepperDescription>{step.description}</StepperDescription>
                </div>
              </StepperTrigger>
              {index < steps.length - 1 && (
                <StepperSeparator className="absolute inset-x-0 top-2 right-[calc(-50%+18px)] left-[calc(50%+18px)]" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
      </Stepper>
    )
  },
}

export const WithContent = {
  name: 'With content',
  render: ({ theme }) => {
    const [current, setCurrent] = useState(steps[1].id)
    const currentIndex = steps.findIndex(s => s.id === current)
    const goNext = () => setCurrent(steps[Math.min(currentIndex + 1, steps.length - 1)].id)
    const goBack = () => setCurrent(steps[Math.max(currentIndex - 1, 0)].id)
    return (
      <Stepper steps={steps} defaultValue={steps[1].id} value={current} onValueChange={setCurrent} indicators={{ completed: <Check className="size-4" /> }} className="flex flex-col gap-6">
        <StepperNav>
          {steps.map((step, index) => (
            <StepperItem key={step.id} stepId={step.id} className="relative flex-1">
              <StepperTrigger className="flex flex-col gap-2.5">
                <StepperIndicator className={theme === 'Revalize' ? 'data-[state=completed]:bg-green-600' : ''}>{index + 1}</StepperIndicator>
                <StepperTitle>{step.title}</StepperTitle>
              </StepperTrigger>
              {index < steps.length - 1 && (
                <StepperSeparator className="absolute inset-x-0 top-2 right-[calc(-50%+18px)] left-[calc(50%+18px)]" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel>
          {steps.map(step => (
            <StepperContent key={step.id} value={step.id}>
              <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
                {step.title} content
              </div>
            </StepperContent>
          ))}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={goBack} disabled={currentIndex === 0}><ArrowLeft /> Back</Button>
            <Button onClick={goNext} disabled={currentIndex === steps.length - 1}>Continue <ArrowRight /></Button>
          </div>
        </StepperPanel>
      </Stepper>
    )
  },
}

export const Vertical = {
  render: ({ theme }) => {
    const [current, setCurrent] = useState(steps[1].id)
    const currentIndex = steps.findIndex(s => s.id === current)
    const goNext = () => setCurrent(steps[Math.min(currentIndex + 1, steps.length - 1)].id)
    const goBack = () => setCurrent(steps[Math.max(currentIndex - 1, 0)].id)
    return (
      <Stepper steps={steps} defaultValue={steps[1].id} value={current} onValueChange={setCurrent} indicators={{ completed: <Check className="size-4" /> }} orientation="vertical" className="flex gap-10">
        <StepperNav className="w-60">
          {steps.map((step, index) => (
            <StepperItem key={step.id} stepId={step.id} className="relative items-start">
              <StepperTrigger className="items-start gap-2.5 pb-15 last:pb-0">
                <StepperIndicator className={theme === 'Revalize' ? 'data-[state=completed]:bg-green-600' : ''}>{index + 1}</StepperIndicator>
                <div className="text-left">
                  <StepperTitle>{step.title}</StepperTitle>
                  <StepperDescription>{step.description}</StepperDescription>
                </div>
              </StepperTrigger>
              {index < steps.length - 1 && (
                <StepperSeparator className="absolute inset-y-0 top-[calc(50%-22px)] left-2 group-data-[orientation=vertical]/stepper-nav:h-15" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel>
          {steps.map(step => (
            <StepperContent key={step.id} value={step.id}>
              <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
                {step.title} content
              </div>
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={goBack} disabled={currentIndex === 0}><ArrowLeft /> Back</Button>
                <Button onClick={goNext} disabled={currentIndex === steps.length - 1}>Continue <ArrowRight /></Button>
              </div>
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    )
  },
}

export const CandidateVariants = {
  name: 'Candidates (review)',
  parameters: {
    docs: {
      description: {
        story: 'Existing stepper implementations across products to evaluate for consolidation.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <div className="font-semibold mb-2">c1c-admin — workflow bar</div>
        <p className="text-muted-foreground mb-3">Horizontal stage bar with title prefix from renderWorkflowBar.</p>
        <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
          <b className="shrink-0 font-semibold">Commit to cloud</b>
          {['Model', 'Driven constraints', 'Rules', 'Results'].map((label, i) => {
            const state = i < 2 ? 'done' : i === 2 ? 'active' : 'pending'
            return (
              <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
                {i > 0 && <Separator className={cn('flex-1', state !== 'pending' && 'bg-primary')} />}
                <div className={cn('flex items-center gap-1.5 shrink-0', state === 'active' && 'text-primary font-medium', state === 'pending' && 'text-muted-foreground')}>
                  <span className={cn('size-5 rounded-full flex items-center justify-center font-semibold', state === 'done' && 'bg-primary text-primary-foreground', state === 'active' && 'bg-primary/15 text-primary', state === 'pending' && 'bg-muted text-muted-foreground')}>
                    {state === 'done' ? <Fa name="circle-check" /> : i + 1}
                  </span>
                  <span>{label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <div className="font-semibold mb-2">Jonathan — completeness checklist</div>
        <p className="text-muted-foreground mb-3">In CPQ, incomplete configs can not be quoted. Show completion % and exactly what is missing.</p>
        <div className="rounded-lg border p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Configuration complete</span>
            <span className="font-semibold text-primary">75%</span>
          </div>
          <Progress value={75} />
          <div className="flex flex-col gap-1.5">
            {[['Pricing rules', false, 'required to quote'], ['Compliance certification', false, 'required to quote'], ['Base configuration', true, '']].map(([label, done, note]) => (
              <div key={label} className="flex items-center gap-2">
                {done ? <Check className="size-4 text-emerald-600" /> : <X className="size-4 text-destructive" />}
                <span className={done ? 'text-muted-foreground line-through' : ''}>{label}</span>
                {note && <span className="text-destructive">({note})</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
}
