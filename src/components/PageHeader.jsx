import { Fragment } from 'react'
import {
  Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Fa } from '@/components/Fa'
import { cn } from '@/lib/utils'

// The default title is a greeting, localized by `lang` (falls back to English for an unknown lang).
const greetings = { de: 'Willkommen zurück', en: 'Welcome back', es: 'Bienvenido de nuevo', fr: 'Bon retour', nl: 'Welkom terug' }

// A crumb is a plain string (rendered as-is, unchanged), or an object for the non-text cases:
// { icon } renders a Font Awesome icon in place of the label (e.g. a home icon as the first crumb),
// { ellipsis: true } renders the standard collapsed-levels affordance in place of a link/page.
function crumbContent(crumb) {
  if (typeof crumb === 'string') return crumb
  if (crumb.ellipsis) return <BreadcrumbEllipsis />
  if (crumb.icon) return <Fa name={crumb.icon} />
  return null
}

// PageHeader — the standard top-of-page block: a breadcrumb trail with a subtle status affordance
// opposite it, then the page title and a lede line. Everything is plain data (an array of crumbs —
// strings, or { icon } / { ellipsis: true } objects for non-text crumbs — strings for the rest) so it
// drives straight from the slot machine. The last crumb is the current page (bold, not a link);
// earlier crumbs are links, except an { ellipsis: true } crumb, which is never a link. Any region is
// omitted when its prop is empty. `title` defaults to the localized greeting for `lang`; pass `title`
// to override it entirely.
export function PageHeader({ breadcrumbs = [], className, lang = 'en', lede, status, title = greetings[lang] ?? greetings.en, ...props }) {
  return (
    <div className={cn('flex flex-col gap-2', className)} lang={lang} {...props}>
      {(breadcrumbs.length > 0 || status) && (
        <div className="mb-2 flex items-center justify-between gap-4">
          {breadcrumbs.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, i) =>
                  i === breadcrumbs.length - 1 ? (
                    <BreadcrumbItem key={i}><BreadcrumbPage>{crumbContent(crumb)}</BreadcrumbPage></BreadcrumbItem>
                  ) : (
                    <Fragment key={i}>
                      <BreadcrumbItem>
                        {crumb?.ellipsis ? crumbContent(crumb) : <BreadcrumbLink href="#">{crumbContent(crumb)}</BreadcrumbLink>}
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </Fragment>
                  ),
                )}
              </BreadcrumbList>
            </Breadcrumb>
          )}
          {status && (
            <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
              <span className="size-1.5 rounded-full bg-current" />
              {status}
            </span>
          )}
        </div>
      )}
      {title && <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>}
      {lede && <p className="max-w-2xl text-muted-foreground">{lede}</p>}
    </div>
  )
}
