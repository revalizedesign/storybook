import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Fa } from '@/components/Fa'

export default {
  title: 'Experiments/Verification card',
  parameters: {
    docs: {
      description: {
        component:
          'Verification panel from c1c-admin (`renderVerifyTab`/`renderResultsTab`). Runs the staged spec through the simulator engine and lists per-check pass/fail/warning states with a summary header.',
      },
    },
  },
}

// TODO: theme tokens — no success/warning tokens exist yet, so emerald/amber/destructive are interim.
const states = {
  passed: { color: 'text-emerald-600', icon: <Fa name="circle-check" />, label: 'PASS' },
  failed: { color: 'text-destructive', icon: <Fa name="xmark" variant="solid" />, label: 'FAIL' },
  warning: { color: 'text-amber-600', icon: <Fa name="clock" />, label: 'WARN' },
}

const checks = [
  { state: 'passed', label: 'All inputs have values', detail: '24 inputs resolved' },
  { state: 'passed', label: 'No circular references', detail: 'Logic groups acyclic' },
  { state: 'passed', label: 'BOM resolves', detail: '46 lines, 0 unresolved refs' },
  { state: 'failed', label: 'Pricing rules complete', detail: 'Missing rule for SKU T-LEG' },
  { state: 'warning', label: 'IS NULL guards', detail: '2 equations lack null guards' },
  { state: 'warning', label: 'Item masters mapped', detail: '1 family without master' },
]

export const Default = {
  render: () => {
    const counts = checks.reduce((a, c) => ({ ...a, [c.state]: (a[c.state] ?? 0) + 1 }), {})
    const passed = !counts.failed && !counts.warning
    return (
      <Card className="w-[28rem]">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Verification</CardTitle>
            <p className="text-sm text-muted-foreground">
              {[counts.passed && `${counts.passed} passed`, counts.failed && `${counts.failed} failed`, counts.warning && `${counts.warning} warnings`].filter(Boolean).join(' · ')}
            </p>
          </div>
          <Badge variant={passed ? 'default' : 'destructive'}>{passed ? 'PASS' : 'ATTENTION'}</Badge>
        </CardHeader>
        <CardContent className="space-y-0 text-sm">
          {checks.map((c, i) => {
            const s = states[c.state]
            return (
              <div key={c.label}>
                {i > 0 && <Separator />}
                <div className="flex items-center gap-3 py-2.5">
                  <span className={s.color}>{s.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{c.label}</div>
                    <div className="truncate text-muted-foreground">{c.detail}</div>
                  </div>
                  <Badge variant="outline" className={s.color}>{s.label}</Badge>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    )
  },
}
