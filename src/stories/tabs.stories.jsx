import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { createDocsPage } from './DocsPage'
import { List, LayoutGrid, TrendingUp } from 'lucide-react'

export default {
  title: 'shadcn/Tabs',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/tabs">Tabs - shadcn/ui</a>' },
      page: createDocsPage(),
    },
  },
}

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Jonathan: Already built · High priority. Pill-style tabs for filtering content within a page (Active / Archived / Draft). Max 4 tabs. Never use underline tabs in Revalize — always pill style.',
      },
    },
  },
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

export const WithIcons = {
  name: 'With icons',
  render: () => (
    <Tabs defaultValue="list">
      <TabsList>
        <TabsTrigger value="list"><List /> List</TabsTrigger>
        <TabsTrigger value="grid"><LayoutGrid /> Grid</TabsTrigger>
        <TabsTrigger value="graph"><TrendingUp /> Graph</TabsTrigger>
      </TabsList>
      <TabsContent value="list">List view content.</TabsContent>
      <TabsContent value="grid">Grid view content.</TabsContent>
      <TabsContent value="graph">Graph view content.</TabsContent>
    </Tabs>
  ),
}

export const Line = {
  render: () => (
    <Tabs defaultValue="list">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content.</TabsContent>
      <TabsContent value="activity">Activity content.</TabsContent>
      <TabsContent value="settings">Settings content.</TabsContent>
    </Tabs>
  ),
}
