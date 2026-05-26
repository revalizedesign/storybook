import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default {
  title: 'shadcn/Tabs',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/tabs">Tabs - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings here.</TabsContent>
      <TabsContent value="password">Password settings here.</TabsContent>
    </Tabs>
  ),
}
