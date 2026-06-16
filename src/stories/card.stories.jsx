import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Card',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/card">Card - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `Already built · Critical priority. Standard content container: bg-card, 1px border, rounded-xl, p-6. No shadow by default (shadow-sm only for elevated surfaces). Cards sit on a muted background.`,
          Matt: `Current implementation is effectively a standard card primitive.

**Observations:** ShadCN baseline remains appropriate. Some documented rules feel overly prescriptive. Muted background treatment lacks sufficient rationale.

**What's missing:** Additional variants. More representative product examples. Clearer guidance for composition patterns.

**Roadmap:** Expand story coverage substantially. Document common card layouts and compositions. Validate rules against real product implementations.`,
        },
      }),
    },
  },
}

export const Default = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent><p>Card content</p></CardContent>
      <CardFooter><Button>Action</Button></CardFooter>
    </Card>
  ),
}
