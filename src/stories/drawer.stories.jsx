import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

export default {
  title: 'shadcn/Drawer',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/drawer">Drawer - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild><Button variant="outline">Open Drawer</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>Drawer description here.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">Drawer body content.</div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
