import { revalizeContent } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/Icon'

export function BannerCard({ cta, description, icon, onCtaClick, theme = 'shadcn', title }) {
  const branded = theme === 'Revalize'
  return (
    <Card className={cn('w-full flex-row items-center gap-4 p-4', branded && [revalizeContent, 'border border-primary/30'])}>
      <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', branded ? 'bg-primary/10 text-primary' : 'bg-muted')}>
        <Icon name={icon} className="size-5" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <Button onClick={onCtaClick}>{cta}</Button>
    </Card>
  )
}
