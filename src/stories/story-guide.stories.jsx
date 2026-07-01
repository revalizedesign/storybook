import { StoryGuide } from '@/components/StoryGuide'

export default {
  title: 'Internal/Story guide',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A corner widget for presenting design review topics during walkthroughs. Data-driven — each story passes a JSON array of groups with items that drill into detail views showing questions and ideas.',
      },
    },
  },
}

const data = [
  {
    group: 'Example topics',
    items: [
      { title: 'Topic one', detail: 'Description of the first topic.', questions: ['What problem does this solve?', 'Who is the user?'], ideas: ['Idea A', 'Idea B'] },
      { title: 'Topic two', detail: 'Description of the second topic.', questions: ['How does this work?'] },
    ],
  },
]

export const Default = {
  render: () => (
    <div className="relative h-screen flex items-center justify-center text-muted-foreground">
      Click the book icon in the bottom right
      <StoryGuide data={data} />
    </div>
  ),
}
