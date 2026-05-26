import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'

export default {
  title: 'shadcn/Navigation Menu',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/navigation-menu">Navigation Menu - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem><NavigationMenuLink href="#">Home</NavigationMenuLink></NavigationMenuItem>
        <NavigationMenuItem><NavigationMenuLink href="#">About</NavigationMenuLink></NavigationMenuItem>
        <NavigationMenuItem><NavigationMenuLink href="#">Contact</NavigationMenuLink></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
