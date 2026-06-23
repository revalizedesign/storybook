import { Button } from '@/components/ui/button'
import { VerticalPane } from '@/components/VerticalPane'

// VerticalPane is the generic collapsible side pane behind every shell pane (the Workspaces nav-pane,
// the Admin Agent chat-panel). Specific panes are just a title + an optional ellipsis menu + content.
export default {
  title: 'Originals/Vertical pane',
  component: VerticalPane,
  parameters: {
    docs: {
      description: {
        component:
          'The generic collapsible side pane: a PaneHeader (title + an optional ellipsis `menu` of `{ label, icon }` items) over the body. Docked it collapses to a w-10 icon strip; `floating` pins the same pane as a card inside a padded body (Attainia’s AI agent).',
      },
    },
  },
}

export const Default = {
  render: () => (
    <div className="flex h-[24rem]">
      <VerticalPane title="Workspaces" menu={[{ label: 'New workspace', icon: 'plus' }]}>
        <div className="flex flex-col gap-1 p-2">
          <Button variant="ghost" size="sm" className="w-full justify-start bg-accent text-accent-foreground">Workspace 1</Button>
        </div>
      </VerticalPane>
    </div>
  ),
}

export const Floating = {
  render: () => (
    <div className="relative h-[24rem] overflow-hidden rounded-lg border bg-muted/40">
      <VerticalPane floating title="Admin Agent" menu={[{ label: 'New workspace', icon: 'plus' }]}>
        <div className="p-3 text-muted-foreground">Floating pane body — pinned inside a padded body region.</div>
      </VerticalPane>
    </div>
  ),
}

export const SecondaryNav = {
  name: 'Candidates (review)',
  parameters: {
    docs: {
      description: {
        story: 'Jonathan: Icon rail + context panel — the universal Revalize shell. Same structure, different colors per product via theme class.',
      },
    },
  },
  render: () => (
    <div className="flex h-[24rem]">
      <VerticalPane title="Navigation">
        <div className="flex flex-col gap-1 p-2">
          <Button variant="ghost" size="sm" className="w-full justify-start bg-accent text-accent-foreground">Dashboard</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">Products</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">Quotes</Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">Reports</Button>
        </div>
      </VerticalPane>
    </div>
  ),
}
