import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default {
  title: 'Design patterns/Layout & Content/Cards',
  parameters: {
    docs: { description: { component: '**Already built** · Critical. Standard content container: bg-card, 1px border, rounded-xl, p-6. No shadow by default (shadow-sm only for elevated surfaces). Cards sit on a muted background.' } },
  },
}

export const Default = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Product configuration</CardTitle>
        <CardDescription>Hydro-Pro Series</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        High-performance hydraulic system with automated pressure controls and ISO 9001 certification.
      </CardContent>
    </Card>
  ),
}
