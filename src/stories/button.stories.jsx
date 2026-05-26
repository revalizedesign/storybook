import { Button } from '@/components/ui/button'

export default {
  title: 'shadcn/Button',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/button">Button - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}
