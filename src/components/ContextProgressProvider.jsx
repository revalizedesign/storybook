import { createContext, useContext, useState } from 'react'

const ContextProgressContext = createContext(null)

export function ContextProgressProvider({ children, layers }) {
  const [layerState, setLayerState] = useState(() =>
    Object.fromEntries(layers.map(l => [l, { approved: false, sourceFound: false }])))

  const completeStep = (step) => {
    if (step.type === 'flow') {
      setLayerState(s => Object.fromEntries(layers.map(l => [l, { ...s[l], sourceFound: true }])))
    } else if (step.type === 'review') {
      setLayerState(s => ({ ...s, [step.context]: { ...s[step.context], approved: true } }))
    }
  }

  return <ContextProgressContext.Provider value={{ completeStep, layerState }}>{children}</ContextProgressContext.Provider>
}

export function useContextProgress() {
  const ctx = useContext(ContextProgressContext)
  if (!ctx) throw new Error('useContextProgress must be used within a ContextProgressProvider')
  return ctx
}
