import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'

export default {
  title: 'shadcn/Button Group',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/button-group">Button Group - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
}
