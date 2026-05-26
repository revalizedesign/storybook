import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'

export default {
  title: 'shadcn/Resizable',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/resizable">Resizable - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="rounded-lg border w-full max-w-md">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-32 items-center justify-center">Panel A</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-32 items-center justify-center">Panel B</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
