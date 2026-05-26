import { NativeSelect } from '@/components/ui/native-select'

export default {
  title: 'shadcn/Native Select',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/native-select">Native Select - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <NativeSelect className="w-48">
      <option value="">Select...</option>
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </NativeSelect>
  ),
}
