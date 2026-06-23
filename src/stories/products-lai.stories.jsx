import { SlotMachine } from './SlotMachine'
import { Shell } from '@/components/Shell'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Fa } from '@/components/Fa'
import data from './lai.json'

const LaiCanvasFrame = ({ slot }) => (
  <div className="flex h-full flex-col">
    <div className="flex items-center gap-2 border-b px-3 py-1">
      <Button variant="ghost" size="icon-sm"><Fa name="arrow-left" /></Button>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">LAI Cloud</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Projects</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Luminance Testing</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-1" />
      <div className="flex items-center gap-1">{slot('header-right-nav')}</div>
    </div>
    <div className="flex items-center gap-1 border-b px-3 py-1">
      {slot('tabs')}
    </div>
    <div className="flex items-center gap-3 border-b px-3 py-2 bg-muted/30 overflow-x-auto">
      {slot('tool-ribbon')}
    </div>
    <div className="flex min-h-0 flex-1 flex-col p-4">{slot('json')}</div>
    <div className="flex items-center gap-2 border-t px-3 py-1">
      <div className="flex items-center gap-1">{slot('footer-left')}</div>
      <div className="flex-1" />
      <div className="flex items-center gap-1">{slot('footer-right')}</div>
    </div>
  </div>
)

export default {
  title: 'Products/LAI',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Lighting design software. Tab workflow: Model → Light → Calculate → Render.

<a href="https://mining-bulb-75056100.figma.site">Figma prototype</a>`,
      },
    },
  },
}

export const AppShellStory = { name: 'App shell', render: () => <SlotMachine frame={Shell} slots={data.app} /> }
export const CanvasShell = { name: 'Canvas shell', render: () => <SlotMachine frame={LaiCanvasFrame} slots={data.canvas} /> }
