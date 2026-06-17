import { Fragment } from 'react'
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'

// The default title is a greeting, localized by `lang` (falls back to English for an unknown lang).
const greetings = { de: 'Willkommen zurück', en: 'Welcome back', es: 'Bienvenido de nuevo', fr: 'Bon retour', nl: 'Welkom terug' }

// PageHeader — the standard top-of-page block: a breadcrumb trail with a subtle status affordance
// opposite it, then the page title and a lede line. Everything is plain data (a string[] of crumbs,
// strings for the rest) so it drives straight from the slot machine. The last crumb is the current
// page (bold, not a link); earlier crumbs are links. Any region is omitted when its prop is empty.
// `title` defaults to the localized greeting for `lang`; pass `title` to override it entirely.
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
                    <BreadcrumbItem key={i}><BreadcrumbPage>{crumb}</BreadcrumbPage></BreadcrumbItem>
                  ) : (
                    <Fragment key={i}>
                      <BreadcrumbItem><BreadcrumbLink href="#">{crumb}</BreadcrumbLink></BreadcrumbItem>
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
