import { Input } from '@/components/ui/input'

export default {
  title: 'shadcn/Input',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/input">Input - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => <Input placeholder="Default" />,
}

export const Disabled = {
  render: () => <Input disabled placeholder="Disabled" />,
}

export const Invalid = {
  render: () => <Input aria-invalid placeholder="Invalid" />,
}

export const File = {
  render: () => <Input type="file" />,
}

export const Password = {
  render: () => <Input type="password" placeholder="Password" />,
}

