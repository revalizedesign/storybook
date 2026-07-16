import { PageHeader } from '@/components/PageHeader'

export default {
  title: 'Originals/Page header',
  component: PageHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The standard top-of-page block: a breadcrumb trail with a subtle status affordance opposite it, then the page title and a lede line. All content is plain data, and the last crumb is the bold current page. The wrapping content region owns background, padding, and spacing — PageHeader carries none.',
      },
    },
  },
}

export const Default = {
  render: () => (
    <PageHeader
      breadcrumbs={[{ label: 'Components', href: '#components' }, { label: 'Page header' }]}
      lede="The standard top-of-page block with breadcrumbs, title, and lede."
      status="Saved"
      title="Page header"
    />
  ),
}

export const Localization = {
  render: () => (
    <div className="flex flex-col gap-10">
      <PageHeader breadcrumbs={[{ label: 'Home' }]} lede="English — the default greeting when no lang is passed." />
      <PageHeader breadcrumbs={[{ label: 'Startseite' }]} lang="de" lede="German — passed via lang=de." />
      <PageHeader breadcrumbs={[{ label: 'Inicio' }]} lang="es" lede="Spanish — passed via lang=es." />
      <PageHeader breadcrumbs={[{ label: 'Accueil' }]} lang="fr" lede="French — passed via lang=fr." />
      <PageHeader breadcrumbs={[{ label: 'Start' }]} lang="nl" lede="Dutch — passed via lang=nl." />
    </div>
  ),
}
