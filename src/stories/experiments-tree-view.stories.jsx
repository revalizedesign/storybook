import { useState, forwardRef } from 'react'
import { SortableTree, SimpleTreeItemWrapper, FolderTreeItemWrapper } from 'dnd-kit-sortable-tree'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import initialData from './tree-view.json'

export default { title: 'Libraries/Tree view' }

const typeBadgeColors = {
  'logic-group': 'bg-muted text-muted-foreground',
  'input-group': 'bg-blue-100 text-blue-800',
  input: 'bg-green-100 text-green-800',
  driven: 'bg-purple-100 text-purple-800',
  equation: 'bg-teal-100 text-teal-800',
}

const TreeItem = forwardRef((props, ref) => (
  <SimpleTreeItemWrapper {...props} ref={ref}>
    <div className="group/row flex items-center gap-2 flex-1">
      <span className="text-sm">{props.item.value}</span>
      <Badge variant="outline" className={`${typeBadgeColors[props.item.type] || ''} border-transparent`}>
        {props.item.type}
      </Badge>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" className="ml-auto opacity-0 group-hover/row:opacity-100" onClick={e => e.stopPropagation()} />}>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </SimpleTreeItemWrapper>
))

const FolderItem = forwardRef((props, ref) => (
  <FolderTreeItemWrapper {...props} ref={ref}>
    <div className="group/row flex items-center gap-2 flex-1">
      <span className="text-sm">{props.item.value}</span>
      <Badge variant="outline" className={`${typeBadgeColors[props.item.type] || ''} border-transparent`}>
        {props.item.type}
      </Badge>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" className="ml-auto opacity-0 group-hover/row:opacity-100" onClick={e => e.stopPropagation()} />}>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </FolderTreeItemWrapper>
))

export const Default = {
  render: () => {
    const [items, setItems] = useState(initialData)
    return (
      <SortableTree items={items} onItemsChanged={setItems} TreeItemComponent={TreeItem} />
    )
  },
}

export const FolderLines = {
  name: 'Folder lines',
  render: () => {
    const [items, setItems] = useState(initialData)
    return (
      <SortableTree items={items} onItemsChanged={setItems} TreeItemComponent={FolderItem} />
    )
  },
}
