import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'

export default {
  title: 'shadcn/Carousel',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/carousel">Carousel - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {[1, 2, 3, 4, 5].map(i => (
          <CarouselItem key={i}>
            <div className="flex aspect-square items-center justify-center rounded-lg border bg-card p-6 text-4xl font-semibold">{i}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
