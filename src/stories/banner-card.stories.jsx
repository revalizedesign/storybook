import { BannerCard } from '@/components/BannerCard'

export default {
  args: { theme: 'shadcn' },
  argTypes: {
    theme: { control: 'select', options: ['shadcn', 'Revalize'] },
  },
  component: BannerCard,
  title: 'Originals/Banner card',
  parameters: {
    docs: {
      description: {
        component: 'A callout card for a required setup step — icon, title, description, and a CTA. The `theme` prop layers Revalize brand blue onto the icon, outline, and CTA via a scoped CSS custom-property override; no shadcn primitive is modified.',
      },
    },
  },
}

export const Default = {
  render: ({ theme }) => (
    <BannerCard
      cta="Set up Knowledge"
      description={<>Before you can build product models with the <strong className="font-semibold text-primary">AI Model Builder</strong>, you must add your Company, Industry, and Catalog knowledge to help train the agent.</>}
      icon="Layers"
      theme={theme}
      title="Knowledge setup needed"
    />
  ),
}
