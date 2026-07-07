import { Breadcrumbs } from '@/components/Breadcrumbs'

export default {
  title: 'shadcn/Breadcrumb',
  component: Breadcrumbs,
  argTypes: {
    items: { control: 'object' },
  },
  args: {
    items: [
      { label: 'Components', href: '#components' },
      { label: 'Breadcrumb' },
    ],
  },
  parameters: {
    docs: {
      description: {
        component: `<a href="https://ui.shadcn.com/docs/components/base/breadcrumb">Breadcrumb - shadcn/ui</a>

<p class="rounded-md bg-amber-50 px-4 py-3 text-amber-900">⚠️ <strong>Do not use directly.</strong> Use <a href="?path=/docs/originals-page-header--docs">Page header</a> instead.</p>

**Unsupported variant:** the Revalize design system does not support custom separators with \`<BreadcrumbSeparator />\`.`,
      },
    },
  },
}

export const Default = {
  parameters: { docs: { description: { story: 'A basic breadcrumb using `BreadcrumbLink` with a `House` icon, `BreadcrumbSeparator`, and `BreadcrumbPage` for the current location. Automatically collapses into a `BreadcrumbEllipsis` dropdown when more than 3 items.' } } },
}

export const Collapsed = {
  parameters: { docs: { description: { story: 'We provide a `<BreadcrumbEllipsis />` component to show a collapsed state when the breadcrumb is too long.' } } },
  args: { items: [
    { label: 'Documentation', href: '#docs' },
    { label: 'Themes', href: '#themes' },
    { label: 'GitHub', href: '#github' },
    { label: 'Components', href: '#components' },
    { label: 'Breadcrumb' },
  ] },
}
