import { cn } from '@/lib/utils'

// Font Awesome icon — mirrors c1c-admin's `<i class="fa-regular fa-folder">` usage so
// patterns ported from c1c-admin can reuse icon names verbatim. FA loads via
// .storybook/preview-head.html. For React-native icons, prefer lucide-react.
// variant: 'regular' | 'solid' | 'brands'
export function Fa({ name, variant = 'regular', className, ...props }) {
  return <i className={cn(`fa-${variant} fa-${name} size-4 shrink-0`, className)} aria-hidden {...props} />
}
