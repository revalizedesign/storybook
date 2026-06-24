import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Card',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/card">Card - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**Standard content container:**
- Background: card color (white/gray)
- Border: 1px subtle
- Border-radius: rounded-lg
- Padding: p-6 (24px)
- Shadow: none by default (use shadow-sm for elevated)
- Cards sit on muted/lighter background

**Composition:**
- CardHeader: Title + optional description (top section)
- CardContent: Main content area (body)
- CardFooter: Actions and secondary content (bottom)

**Variants:**
- **Default**: Static content display
- **Interactive**: Clickable (cursor, hover effect)
- **Elevated**: With shadow for layered effect
- **Outlined**: Stronger border for emphasis

**When to use:**
- Grouped related information
- Reusable item in a list (product, configuration, quote)
- Dashboard panels
- Forms or modals with card wrapper

**When NOT to use:**
- Single isolated content → Use div
- Complex nested cards → Flatten hierarchy`,
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

export const Interactive = {
  render: () => (
    <Card className="w-80 cursor-pointer hover:bg-muted/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-primary">Configuration</CardTitle>
        <CardDescription>Hydro-Pro Series</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          47 pricing rules • 12 linked quotes • Last updated 2 days ago
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Edit</Button>
      </CardFooter>
    </Card>
  ),
}

export const Elevated = {
  render: () => (
    <Card className="w-80 shadow-lg">
      <CardHeader>
        <CardTitle>Featured Configuration</CardTitle>
        <CardDescription>Most used this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm font-medium">Solar Energy Pro</p>
          <p className="text-xs text-muted-foreground">
            3,247 quotes generated • 89% conversion rate
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button>View Stats</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithBadge = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Active Configuration</CardTitle>
          <CardDescription>Current production config</CardDescription>
        </div>
        <Badge>Active</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Thermal Series X1</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm">Edit</Button>
        <Button variant="outline" size="sm">Duplicate</Button>
      </CardFooter>
    </Card>
  ),
}

export const ListItem = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      {['Config A', 'Config B', 'Config C', 'Config D'].map((name) => (
        <Card key={name} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base">{name}</CardTitle>
            <CardDescription>12 pricing rules</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Active • Last updated: today
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}

export const FormCard = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create New Configuration</CardTitle>
        <CardDescription>Define your product configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Configuration Name</label>
          <input type="text" placeholder="e.g., Solar Pro Series" className="w-full mt-1 px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea placeholder="What is this for?" className="w-full mt-1 px-3 py-2 border rounded text-sm" />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button variant="outline">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  ),
}
