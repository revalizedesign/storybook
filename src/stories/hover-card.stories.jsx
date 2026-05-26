import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'

export default {
  title: 'shadcn/Hover Card',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/hover-card">Hover Card - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger className="underline cursor-pointer">Hover me</HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">This is hover card content.</p>
      </HoverCardContent>
    </HoverCard>
  ),
}
