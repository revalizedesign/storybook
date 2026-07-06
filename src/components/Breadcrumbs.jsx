import { House } from 'lucide-react'
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export function Breadcrumbs({ items = [] }) {
  const shouldCollapse = items.length > 3
  const visible = shouldCollapse ? items.slice(-2) : items
  const collapsed = shouldCollapse ? items.slice(0, -2) : []

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#" aria-label="Home"><House className="size-4" /></BreadcrumbLink></BreadcrumbItem>
        {collapsed.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {collapsed.map(item => <DropdownMenuItem key={item.label}>{item.label}</DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
        {visible.map((item, i) => (
          <span key={item.label} className="contents">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {i === visible.length - 1
                ? <BreadcrumbPage>{item.label}</BreadcrumbPage>
                : <BreadcrumbLink href={item.href ?? '#'}>{item.label}</BreadcrumbLink>}
            </BreadcrumbItem>
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
