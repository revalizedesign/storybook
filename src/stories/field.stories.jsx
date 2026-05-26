import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default {
  title: 'shadcn/Field',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/field">Field - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@example.com" />
      <FieldDescription>We will never share your email.</FieldDescription>
    </Field>
  ),
}
