export function FlowHeader({ heading, lede, step, steps }) {
  return (
    <div className="flex flex-col gap-1.5">
      {steps && <div className="text-xs text-muted-foreground">Step {step} of {steps}</div>}
      {heading && <h2 className="text-base font-semibold">{heading}</h2>}
      {lede && <p className="text-muted-foreground">{lede}</p>}
    </div>
  )
}
