import { Inbox } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { StoryPage } from './StoryPage'

export default {
  title: 'Internal/Story page',
  parameters: { layout: 'fullscreen' },
}

export const Default = {
  render: () => (
    <StoryPage>
      <Empty className="flex-1 rounded-lg bg-background">
        <EmptyHeader>
          <EmptyMedia variant="icon"><Inbox /></EmptyMedia>
          <EmptyTitle>No items</EmptyTitle>
          <EmptyDescription>Your component goes here.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </StoryPage>
  ),
}
