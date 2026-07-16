import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Fa } from '@/components/Fa'
import { cn } from '@/lib/utils'

// TabBar — chip-style tab strip on the Tabs primitive (keyboard + aria for free), for panel-level
// workspace nav. Data-driven: `sep` adds a group divider, `color` is a per-tab active-state class.
// Pass TabsContent panels as children. variant="chip" is undefined in the primitive, so its
// default/line trigger cascades don't match and only these classes apply.
export function TabBar({ children, className, tabs = [], ...props }) {
  return (
    <Tabs className={className} {...props}>
      <TabsList variant="chip" className="w-full flex-wrap justify-start gap-1 rounded-none bg-transparent p-0 group-data-horizontal/tabs:h-fit">
        {tabs.flatMap(({ color, icon, key, label, sep }) => [
          sep && <span key={`${key}-sep`} aria-hidden className="mx-1 h-4 w-px shrink-0 self-center bg-border" />,
          <TabsTrigger key={key} value={key} className={cn('h-auto flex-none rounded-md px-2.5 text-muted-foreground hover:bg-muted hover:text-foreground data-active:bg-accent data-active:text-accent-foreground', color)}>
            <Fa name={icon} />{label}
          </TabsTrigger>,
        ])}
      </TabsList>
      {children}
    </Tabs>
  )
}
