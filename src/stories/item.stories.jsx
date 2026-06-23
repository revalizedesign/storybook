import { Item, ItemContent, ItemTitle, ItemDescription } from '@/components/ui/item'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Fa } from '@/components/Fa'
import { Kbd } from '@/components/ui/kbd'
import { Switch } from '@/components/ui/switch'

export default {
  title: 'shadcn/Item',
  parameters: {
    docs: {
      description: {
        component: `<a href="https://ui.shadcn.com/docs/components/base/item">Item - shadcn/ui</a>

**Jonathan:** Enterprise B2B compliance: who changed what and when. Lives in the detail drawer Activity tab. Newest first, avatar + name + action + timestamp, real field names and values.`,
      },
    },
  },
}

export const Default = {
  render: () => (
    <Item>
      <ItemContent>
        <ItemTitle>Item title</ItemTitle>
        <ItemDescription>Item description goes here.</ItemDescription>
      </ItemContent>
    </Item>
  ),
}

export const Activity = {
  name: 'Candidates (review)',
  parameters: {
    docs: {
      description: {
        story: 'Audit trail entry — avatar, name, action, timestamp. Repeated in a list for activity feeds.',
      },
    },
  },
  render: () => (
    <Item>
      <Avatar className="size-7"><AvatarFallback>JP</AvatarFallback></Avatar>
      <ItemContent>
        <ItemTitle><span className="font-medium">Jonathan Pacheco</span> <span className="text-muted-foreground">changed base price from $1,200 to $1,450</span></ItemTitle>
        <ItemDescription>2 hours ago</ItemDescription>
      </ItemContent>
    </Item>
  ),
}

export const Shortcut = {
  parameters: {
    docs: {
      description: {
        story: 'Jonathan: Power-user shortcuts standardized across products. ⌘K (global search) is the most important to lock in first.',
      },
    },
  },
  render: () => (
    <Item>
      <ItemContent>
        <ItemTitle>Global search</ItemTitle>
        <ItemDescription>universal</ItemDescription>
      </ItemContent>
      <div className="flex gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></div>
    </Item>
  ),
}

export const SwitchRow = {
  name: 'Switch',
  parameters: {
    docs: {
      description: {
        story: 'Jonathan: Consistent settings layout: toggle rows with label + description. Without a standard, every product\'s settings page diverges.',
      },
    },
  },
  render: () => (
    <Item>
      <ItemContent>
        <ItemTitle>Email on quote approval</ItemTitle>
        <ItemDescription>Notify me when a quote I created is approved</ItemDescription>
      </ItemContent>
      <Switch defaultChecked />
    </Item>
  ),
}

export const Status = {
  render: () => (
    <Item>
      <span className="text-emerald-600"><Fa name="circle-check" /></span>
      <ItemContent>
        <ItemTitle>All inputs have values</ItemTitle>
        <ItemDescription>24 inputs resolved</ItemDescription>
      </ItemContent>
      <Badge variant="outline" className="text-emerald-600">PASS</Badge>
    </Item>
  ),
}
