import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from '@/components/ui/context-menu'

export default {
  title: 'shadcn/Context Menu',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/context-menu">Context Menu - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
