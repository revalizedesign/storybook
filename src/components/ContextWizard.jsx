import { useState, useEffect } from 'react'
import { AgentStatus } from '@/components/AgentStatus'
import { Check, Play, Upload } from 'lucide-react'
import { Stepper, StepperItem, StepperTrigger, StepperIndicator, StepperSeparator, StepperTitle, StepperDescription, StepperNav } from '@/components/stepper'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const StepContent = ({ step }) => {
  switch (step.type) {
    case 'video':
      return (
        <AspectRatio ratio={16 / 9}>
          <div className="flex size-full items-center justify-center rounded-lg bg-muted">
            <Play className="size-10 text-muted-foreground" />
          </div>
        </AspectRatio>
      )
    case 'review': {
      const ctx = step._context
      if (!ctx) return null
      const filled = ctx.questions.filter(q => q.value).length
      return (
        <div className="flex flex-col gap-4 overflow-auto">
          <h3 className="font-semibold">{filled} answer{filled !== 1 ? 's' : ''} from {ctx.sources} source{ctx.sources !== 1 ? 's' : ''}</h3>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
            {ctx.questions.map(q => (
              <div key={q.label} className="contents">
                <dt className="text-muted-foreground">{q.label}</dt>
                <dd>{q.value || <span className="text-destructive">Missing</span>}</dd>
              </div>
            ))}
          </dl>
          {ctx.template && (
            <div className="flex flex-col gap-3 rounded-lg border bg-muted/50 p-4">
              <h4 className="font-semibold">{ctx.template.heading}</h4>
              <p className="text-muted-foreground">{ctx.template.description}</p>
              <p className="whitespace-pre-line">{ctx.template.excerpt}</p>
              {ctx.template.action && (
                <button className="self-start text-primary underline">{ctx.template.action}</button>
              )}
            </div>
          )}
          {step._editing && (
            <div className="flex flex-col gap-3 border-t pt-4">
              <p className="text-muted-foreground">Ask user question</p>
              <p>Before we edit, I need to know more about scope and intent.</p>
              {[
                'Most of this context is wrong',
                'Retry everything with a different link or file',
                'Retry specific answers',
                'Edit the answers directly',
                'Something else',
              ].map(option => (
                <label key={option} className="flex items-center gap-2">
                  <input type="radio" name="edit-triage" className="rounded" />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      )
    }
    case 'input':
      return (
        <>
          {step.label && <Label>{step.label}</Label>}
          <Input placeholder={step.placeholder ?? 'Type here...'} />
          {step.fallback && <button className="self-start text-muted-foreground underline">{step.fallback}</button>}
        </>
      )
    case 'upload':
      return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-muted-foreground">
          <Upload className="size-6" />
          <span className="text-muted-foreground">Drop files here or click to browse</span>
        </div>
      )
    case 'flow':
      return null
    case 'placeholder':
      return (
        <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground">
          {step.title}
        </div>
      )
    case 'stepper':
      return (
        <div className="flex flex-col gap-4 rounded-lg border p-4">
          {step.stepperHeading && <h3 className="text-center font-semibold">{step.stepperHeading}</h3>}
          <Stepper steps={step.steps} value={step.activeStep} indicators={{ completed: <Check className="size-4" /> }} className="mt-4 flex w-full items-center">
            <StepperNav>
              {step.steps.map((s, i) => (
                <StepperItem key={s.id} stepId={s.id} className="relative flex-1">
                  <StepperTrigger className="flex flex-col gap-2.5">
                    <StepperIndicator className="data-[state=completed]:bg-green-600">
                      {i + 1}
                    </StepperIndicator>
                    <div className="flex flex-col">
                      <StepperTitle>{s.title}</StepperTitle>
                      <StepperDescription>{s.description}</StepperDescription>
                    </div>
                  </StepperTrigger>
                  {i < step.steps.length - 1 && (
                    <StepperSeparator className="absolute inset-x-0 top-2 right-[calc(-50%+18px)] left-[calc(50%+18px)]" />
                  )}
                </StepperItem>
              ))}
            </StepperNav>
          </Stepper>
          </div>
      )
    case 'options':
      return (
        <div className="flex flex-col gap-2">
          {step.options.map(opt => (
            <label key={opt.label} className="flex items-center gap-2">
              <input type="checkbox" defaultChecked={opt.checked !== false} className="rounded" />
              {opt.label}
            </label>
          ))}
        </div>
      )
    default:
      return null
  }
}

const FlowRender = ({ state }) => {
  switch (state.render) {
    case 'input':
      return (
        <>
          {state.label && <Label>{state.label}</Label>}
          <Input placeholder={state.placeholder ?? 'Type here...'} />
          {state.skip && <button className="self-start text-muted-foreground underline" onClick={state.skip.onClick}>{state.skip.label}</button>}
        </>
      )
    case 'upload':
      return (
        <>
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-muted-foreground">
            <Upload className="size-6" />
            <span className="text-muted-foreground">Drop files here or click to browse</span>
          </div>
          {state.skip && <button className="self-start text-muted-foreground underline" onClick={state.skip.onClick}>{state.skip.label}</button>}
        </>
      )
    case 'textarea':
      return (
        <>
          {state.label && <Label>{state.label}</Label>}
          <Textarea className="min-h-0 flex-1 resize-none" />
          {state.skip && <button className="self-start text-muted-foreground underline" onClick={state.skip.onClick}>{state.skip.label}</button>}
        </>
      )
    default:
      return null
  }
}

const RiskNotice = ({ step }) => {
  if (step.type !== 'review' || !step._context) return null
  const ctx = step._context
  if (ctx.confident && ctx.questions.every(q => q.value)) return null
  return <div className="rounded-md bg-amber-50 px-3 py-2 text-amber-900 dark:bg-amber-950 dark:text-amber-200">Incomplete or unverified context may reduce product modeling quality.</div>
}

const Footer = ({ step, editing, setEditing, working, activeState, current, setCurrent, isFlow, flowState, setFlowState, handleNext, isLast }) => {
  const actions = step.type === 'review' ? (
    editing ? (
      <>
        <Button variant="outline" onClick={() => setEditing(false)}>Back</Button>
        <Button onClick={() => setEditing(false)}>Continue</Button>
      </>
    ) : (
      <>
        <Button variant="outline" onClick={() => setEditing(true)}>Edit</Button>
        <Button onClick={() => { setEditing(false); handleNext() }}>Approve</Button>
      </>
    )
  ) : (
    <>
      {current > 0 && <Button variant="outline" onClick={() => {
        if (isFlow && flowState !== step.initial) setFlowState(step.initial)
        else setCurrent(c => c - 1)
      }}>Back</Button>}
      <Button onClick={handleNext} disabled={working}>
        {step.action ?? (isLast ? 'Done' : 'Next')}
      </Button>
    </>
  )
  return (
    <div className="flex items-center justify-end gap-2">
      {working && <div className="mr-auto"><AgentStatus status={activeState?.status ?? 'Working...'} working /></div>}
      {actions}
    </div>
  )
}

export function ContextWizard({ format, open: controlledOpen, steps, onClose }) {
  const [internalOpen, setInternalOpen] = useState(true)
  const open = controlledOpen ?? internalOpen
  const [current, setCurrent] = useState(0)
  const [editing, setEditing] = useState(false)
  const [flowState, setFlowState] = useState(null)
  const [working, setWorking] = useState(false)
  const step = steps[current]
  const isLast = current === steps.length - 1
  const isFlow = step.type === 'flow'
  const activeState = isFlow ? step.states[flowState ?? step.initial] : null

  useEffect(() => {
    if (isFlow) setFlowState(step.initial)
    else setFlowState(null)
  }, [current])

  const handleNext = () => {
    if (isFlow) {
      if (activeState?.next === 'advance') {
        setWorking(true)
        setTimeout(() => { setWorking(false); setCurrent(c => c + 1) }, 1500)
      }
      else if (activeState?.next) setFlowState(activeState.next)
    } else if (isLast) {
      if (step.alert) alert(step.alert)
      onClose?.()
    } else {
      setCurrent(c => c + 1)
    }
  }

  const handleSkip = () => {
    if (activeState?.skip) setFlowState(activeState.skip.to)
  }

  const description = isFlow ? activeState?.description : step.description
  const enrichedStep = { ...step, _editing: editing }
  const footerProps = { step: enrichedStep, editing, setEditing, working, activeState, current, setCurrent, isFlow, flowState, setFlowState, handleNext, isLast }

  const stepIndicator = <div className="text-xs text-muted-foreground">Step {current + 1} of {steps.length}</div>
  const content = (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      {isFlow ? (
        <FlowRender state={{ ...activeState, skip: activeState?.skip ? { ...activeState.skip, onClick: handleSkip } : null }} />
      ) : (
        <StepContent step={enrichedStep} />
      )}
    </div>
  )

  if (format === 'dialog') {
    return (
      <Dialog open={open} onOpenChange={(v) => { if (!v) { setInternalOpen(false); onClose?.() } }}>
        <DialogContent className="flex min-h-[30rem] max-h-[calc(100vh-2rem)] flex-col sm:max-w-[40rem] [&_[data-slot=dialog-title]]:text-base">
          <DialogHeader>
            {stepIndicator}
            {step.title && <DialogTitle>{step.title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {content}
          <RiskNotice step={enrichedStep} />
          <DialogFooter>
            <Footer {...footerProps} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  if (format === 'drawer') {
    return (
      <Drawer open={open} onOpenChange={(v) => { if (!v) { setInternalOpen(false); onClose?.() } }} direction="right">
        <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-[40rem]">
          <DrawerHeader>
            {stepIndicator}
            {step.title && <DrawerTitle>{step.title}</DrawerTitle>}
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto px-4">
            {isFlow ? (
              <FlowRender state={{ ...activeState, skip: activeState?.skip ? { ...activeState.skip, onClick: handleSkip } : null }} />
            ) : (
              <StepContent step={enrichedStep} />
            )}
          </div>
          <RiskNotice step={enrichedStep} />
          <DrawerFooter>
            <Footer {...footerProps} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <div className="flex h-full w-[40rem] flex-col gap-6 border-r p-6">
      <div className="flex flex-col gap-1.5">
        <div className="text-xs text-muted-foreground">Step {current + 1} of {steps.length}</div>
        {step.title && <h2 className="text-base font-semibold">{step.title}</h2>}
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4">
        {isFlow ? (
          <FlowRender state={{ ...activeState, skip: activeState?.skip ? { ...activeState.skip, onClick: handleSkip } : null }} />
        ) : (
          <StepContent step={enrichedStep} />
        )}
      </div>
      <RiskNotice step={enrichedStep} />
      <Footer {...footerProps} />
    </div>
  )
}
