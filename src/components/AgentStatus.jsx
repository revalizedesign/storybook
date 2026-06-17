import { useEffect, useState } from 'react'
import { Fa } from '@/components/Fa'
import { Spinner } from '@/components/ui/spinner'

const formatElapsed = (s) => (s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`)

// AgentStatus — the chat's status line. When `working`: a spinner + the label + a ticking elapsed
// timer right after it (1s…59s, then 1m 1s, 2m 5s…). Otherwise the static default state: an asterisk
// + the label. Unbounded (no box). Renders nothing when `status` is empty.
export function AgentStatus({ status, working = false }) {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    if (!working) return undefined
    const id = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(id)
  }, [working])
  if (!status) return null
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 text-muted-foreground">
      {working ? <Spinner className="size-3.5" /> : <Fa name="asterisk" />}
      <span>{status}</span>
      {working && <span className="tabular-nums">{formatElapsed(elapsed)}</span>}
    </div>
  )
}
