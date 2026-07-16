import { useState } from 'react'
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperPanel, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/stepper'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Fa } from '@/components/Fa'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight, Check, CircleCheckBig, X } from 'lucide-react'
import steps from './stepper.json'

// Revalize theme marks completed steps green — filled bg for the default variant, border/text for outline.
const completedClass = (theme, variant) => {
  if (theme !== 'Revalize') return ''
  return variant === 'outline'
    ? 'data-[state=completed]:border-green-600 data-[state=completed]:text-green-600'
    : 'data-[state=completed]:bg-green-600'
}

export default {
  title: 'Libraries/Stepper',
  args: { orientation: 'horizontal', theme: 'shadcn', variant: 'default' },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    theme: { control: 'select', options: ['shadcn', 'Revalize'] },
    variant: { control: 'select', options: ['default', 'outline'] },
  },
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

**Shorthand:** \`<StepperNav />\` with no children renders the common case itself — steps mapped to items, triggers, indicators, title/description, and separators, orientation-aware automatically via \`data-orientation\` on the nav. Pass children only when a step needs custom composition. Use \`indicatorClassName\` on \`Stepper\` for a shared completed-state override (e.g. Revalize's green) instead of repeating it per \`StepperIndicator\`. See <a href="?path=/docs/originals-context-wizard--docs">Context wizard</a> and <a href="?path=/docs/experiments-context-readiness--docs">Context readiness</a> for real usage.

**Jonathan:** Break complex configuration into steps with a progress indicator. Completed steps checkmarked, current highlighted, always Back + Continue, do not lose data on Back, allow save as draft.

**Matt:** Foundational to the entire product family. Configure, price, quote. Every product uses multi-step workflows as the core interaction model.`,
      },
    },
  },
}

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Horizontal orientation, shadcn theme, and not outline variant.',
      },
    },
  },
  render: ({ orientation, theme, variant }) => {
    const [current, setCurrent] = useState(steps[1].id)
    const vertical = orientation === 'vertical'
    return (
      <Stepper steps={steps} value={current} onValueChange={setCurrent} indicators={{ completed: <Check className="size-4" /> }} indicatorVariant={variant} indicatorClassName={completedClass(theme, variant)} orientation={orientation} className={vertical ? 'w-60' : 'flex w-full items-center'}>
        <StepperNav />
      </Stepper>
    )
  },
}

export const Outline = {
  args: { variant: 'outline' },
  render: Default.render,
}

export const WithContent = {
  name: 'With content',
  render: ({ orientation, theme, variant }) => {
    const [current, setCurrent] = useState(steps[1].id)
    const currentIndex = steps.findIndex(s => s.id === current)
    const goNext = () => setCurrent(steps[Math.min(currentIndex + 1, steps.length - 1)].id)
    const goBack = () => setCurrent(steps[Math.max(currentIndex - 1, 0)].id)
    const vertical = orientation === 'vertical'
    const actions = (
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={goBack} disabled={currentIndex === 0}><ArrowLeft /> Back</Button>
        <Button onClick={goNext} disabled={currentIndex === steps.length - 1}>Continue <ArrowRight /></Button>
      </div>
    )
    return (
      <Stepper steps={steps} defaultValue={steps[1].id} value={current} onValueChange={setCurrent} indicators={{ completed: <Check className="size-4" /> }} indicatorVariant={variant} indicatorClassName={completedClass(theme, variant)} orientation={orientation} className={vertical ? 'flex gap-10' : 'flex flex-col gap-6'}>
        <StepperNav className={vertical ? 'w-60' : ''}>
          {steps.map((step, index) => (
            <StepperItem key={step.id} stepId={step.id}>
              <StepperTrigger>
                <StepperIndicator>{index + 1}</StepperIndicator>
                {vertical ? (
                  <div className="text-left">
                    <StepperTitle>{step.title}</StepperTitle>
                    <StepperDescription>{step.description}</StepperDescription>
                  </div>
                ) : (
                  <StepperTitle>{step.title}</StepperTitle>
                )}
              </StepperTrigger>
              {index < steps.length - 1 && <StepperSeparator />}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel>
          {steps.map(step => (
            <StepperContent key={step.id} value={step.id}>
              <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
                {step.title} content
              </div>
              {vertical && actions}
            </StepperContent>
          ))}
          {!vertical && actions}
        </StepperPanel>
      </Stepper>
    )
  },
}

export const Vertical = {
  args: { orientation: 'vertical' },
  render: WithContent.render,
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
