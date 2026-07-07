import { Breadcrumbs } from '@/components/Breadcrumbs'
import { StatusDot } from '@/components/StatusDot'
import { cn } from '@/lib/utils'

const greetings = { de: 'Willkommen zurück', en: 'Welcome back', es: 'Bienvenido de nuevo', fr: 'Bon retour', nl: 'Welkom terug' }

export function PageHeader({ breadcrumbs = [], className, lang = 'en', lede, status, title = greetings[lang] ?? greetings.en, ...props }) {
  return (
    <div className={cn('flex flex-col gap-2', className)} lang={lang} {...props}>
      {(breadcrumbs.length || status) && (
        <div className="mb-2 flex items-center justify-between gap-4">
          {breadcrumbs.length && <Breadcrumbs items={breadcrumbs} />}
          <StatusDot>{status}</StatusDot>
        </div>
      )}
      {title && <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>}
      {lede && <p className="max-w-2xl text-muted-foreground">{lede}</p>}
    </div>
  )
}
