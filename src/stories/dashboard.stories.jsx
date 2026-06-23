import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default {
  title: 'Layout/Dashboard',
  parameters: {
    docs: {
      description: {
        component: `**Jonathan:** Home screen with key metrics, recent activity and quick actions. Metrics differ per product (C1C: quotes/configs, SpecPage: formulations, PROCAD: projects).`,
      },
    },
  },
}

const metrics = [
  ['Active configs', '247'],
  ['Quotes pending', '12'],
  ['Completed today', '89'],
]
const activity = [
  ['Hydro-Pro Series updated', '2m ago'],
  ['New quote submitted', '15m ago'],
  ['Config approved', '1h ago'],
]

export const Candidates = {
  name: 'Candidates (review)',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        {metrics.map(([label, value]) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <div className="text-muted-foreground">{label}</div>
              <div className="text-2xl font-semibold">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
        <CardContent className="flex flex-col">
          {activity.map(([action, time]) => (
            <div key={action} className="flex justify-between py-2 border-b last:border-0">
              <span>{action}</span><span className="text-muted-foreground">{time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  ),
}
