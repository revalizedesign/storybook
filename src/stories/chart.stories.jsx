import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, XAxis } from 'recharts'

export default {
  title: 'shadcn/Chart',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/chart">Chart - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <ChartContainer config={{ value: { label: 'Value', color: 'var(--chart-1)' } }} className="h-48 w-full max-w-sm">
      <BarChart data={[{ name: 'A', value: 40 }, { name: 'B', value: 30 }, { name: 'C', value: 50 }, { name: 'D', value: 20 }]}>
        <XAxis dataKey="name" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}
