import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { BannerCard } from '@/components/BannerCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Fa } from '@/components/Fa'
import { Textarea } from '@/components/ui/textarea'
import data from './generic-ai-app.json'

const statusVariant = { Draft: 'outline', Editing: 'secondary', 'In review': 'outline', Published: 'default' }

export default {
  args: { theme: 'shadcn' },
  argTypes: {
    theme: { control: 'select', options: ['shadcn', 'Revalize'] },
  },
  parameters: {
    docs: {
      description: {
        component: '<a href="https://ds.shadcn.com/docs">shadcn Design System docs</a>',
      },
    },
  },
  title: 'Generic/AI app',
}

export const Default = {
  render: ({ theme }) => {
    const [ask, setAsk] = useState('')

    return (
      <div className="flex h-full flex-col gap-10 overflow-y-auto p-6">
        <BannerCard
          cta={data.setupBanner.cta}
          description={<>Before you can build product models with the <strong className="font-semibold text-primary">AI Model Builder</strong>, you must add your Company, Industry, and Catalog knowledge to help train the agent.</>}
          icon="Layers"
          theme={theme}
          title={data.setupBanner.title}
        />

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 text-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-semibold tracking-tight">{data.hero.title}</h2>
            <p className="text-muted-foreground">{data.hero.description}</p>
          </div>

          <div className="flex flex-col gap-2 rounded-xl border bg-card shadow-xs transition-shadow focus-within:ring-3 focus-within:ring-ring/50">
            <Textarea
              value={ask}
              onChange={e => setAsk(e.target.value)}
              placeholder="Import your product data to build a model, or describe the product you want to build…"
              className="min-h-28 resize-none border-0 bg-transparent text-left shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center justify-end gap-2 px-3 pb-3">
              <Button variant="outline" size="icon"><Fa name="paperclip" /></Button>
              <Button size="icon"><Fa name="paper-plane" /></Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {data.chips.map(chip => (
              <Button key={chip} variant="outline" size="sm" className="rounded-full" onClick={() => setAsk(chip)}>{chip}</Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <h3 className="text-lg font-semibold">Pick up where you left off</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.recentProducts.map(product => (
                <Card key={product.name} className="cursor-pointer gap-3 p-4 transition-shadow hover:shadow-md">
                  <Badge variant="outline" className="w-fit text-primary">Product</Badge>
                  <div className="flex-1 font-semibold">{product.name}</div>
                  <div className="flex items-center justify-between gap-2 border-t pt-3">
                    <span className="text-muted-foreground">{product.time}</span>
                    <Badge variant={statusVariant[product.status]}>{product.status}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Start a new product</h3>
            <div className="flex flex-col gap-3">
              {data.createOptions.map(option => (
                <Card key={option.title} className="cursor-pointer gap-2 p-4 transition-shadow hover:shadow-md">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted"><Fa name={option.icon} className="text-primary" /></div>
                  <div className="flex items-center gap-2 font-semibold">{option.title}<Fa name="arrow-right" className="ml-auto text-muted-foreground" /></div>
                  <p className="text-muted-foreground">{option.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
}
