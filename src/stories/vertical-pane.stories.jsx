import { Button } from '@/components/ui/button'
import { VerticalPane } from '@/components/VerticalPane'
import { StoryPage } from './StoryPage'

export default {
  title: 'Originals/Vertical pane',
  component: VerticalPane,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    floating: { control: 'boolean' },
    defaultCollapsed: { control: 'boolean' },
    width: { control: 'text' },
    title: { control: 'text' },
  },
  args: {
    floating: false,
    defaultCollapsed: false,
    width: 'w-60',
    title: 'Products',
    menu: [{ label: 'New product', icon: 'plus' }],
  },
}

export const Default = {
  render: (args) => (
    <div className="flex h-screen">
      <VerticalPane {...args}>
        <div className="flex flex-col gap-1 p-2">
          <Button variant="ghost" size="sm" className="w-full justify-start bg-accent text-accent-foreground">Product 1</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">Product 2</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">Product 3</Button>
        </div>
      </VerticalPane>
    </div>
  ),
}

export const Floating = {
  args: { floating: true, title: 'Admin Agent' },
  render: (args) => (
    <StoryPage>
      <VerticalPane {...args}>
        <div className="p-3 text-muted-foreground">Floating pane body — pinned inside a padded body region.</div>
      </VerticalPane>
    </StoryPage>
  ),
}
