import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default {
  title: 'Design patterns/Navigation/Module tabs',
  parameters: {
    docs: { description: { component: '**Already built** · High. Pill-style tabs for filtering content within a page (Active / Archived / Draft). Max 4 tabs. Never use underline tabs in Revalize — always pill style.' } },
  },
}

export const Default = {
  render: () => (
    <Tabs defaultValue="active" className="w-96">
      <TabsList>
        <TabsTrigger value="active">Active Products</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
        <TabsTrigger value="draft">Draft</TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="text-sm text-muted-foreground pt-2">Showing 8 active results</TabsContent>
      <TabsContent value="archived" className="text-sm text-muted-foreground pt-2">Showing 3 archived results</TabsContent>
      <TabsContent value="draft" className="text-sm text-muted-foreground pt-2">Showing 1 draft</TabsContent>
    </Tabs>
  ),
}
