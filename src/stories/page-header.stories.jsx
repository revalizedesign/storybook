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
      breadcrumbs={['Catalog', 'Pumps', 'Cyclo 6000']}
      lede="Configure, price, and quote the Cyclo 6000 gearmotor family. Changes autosave to your workspace."
      status="Saved"
      title="Cyclo 6000"
    />
  ),
}

// The default title is a greeting localized by `lang` — English when unset, translated for de/es.
// No `title` is passed here, so each header shows how "Welcome back" renders in that language.
export const Localization = {
  render: () => (
    <div className="flex flex-col gap-10">
      <PageHeader breadcrumbs={['Home']} lede="English — the default greeting when no lang is passed." />
      <PageHeader breadcrumbs={['Startseite']} lang="de" lede="German — passed via lang=de." />
      <PageHeader breadcrumbs={['Inicio']} lang="es" lede="Spanish — passed via lang=es." />
      <PageHeader breadcrumbs={['Accueil']} lang="fr" lede="French — passed via lang=fr." />
      <PageHeader breadcrumbs={['Start']} lang="nl" lede="Dutch — passed via lang=nl." />
    </div>
  ),
}
