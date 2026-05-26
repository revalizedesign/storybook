import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default {
  title: 'shadcn/Avatar',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/avatar">Avatar - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  ),
}
