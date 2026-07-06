import { PageHeader } from '@/components/PageHeader'

// PageHeader — top-of-page block: breadcrumb trail with a subtle status affordance opposite it, then
// the page title and a lede line. Driven by plain data; any region is omitted when its prop is empty.
export default {
  title: 'Originals/Page header',
  component: PageHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The standard top-of-page block: a breadcrumb trail with a subtle status affordance opposite it, then the page title and a lede line. All content is plain data (`breadcrumbs` is a string array, the rest are strings), and the last crumb is the bold current page. The wrapping content region owns background, padding, and spacing — PageHeader carries none.',
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

// The default title is a greeting localized by `lang` — English when unset, translated for de/es.
// No `title` is passed here, so each header shows how "Welcome back" renders in that language.
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
