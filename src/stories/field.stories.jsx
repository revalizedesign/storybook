import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default {
  title: 'shadcn/Field',
  parameters: {
    docs: {
      description: {
        component: `<a href="https://ui.shadcn.com/docs/components/base/field">Field - shadcn/ui</a>

**Jonathan:** Pre-fill the most common value to cut entry time. Label defaults clearly ("default", "typical"), user can always override, base on real usage data. Do not default required compliance fields.`,
      },
    },
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

export const Required = {
  render: () => (
    <Field>
      <FieldLabel>Email <span className="text-destructive">*</span></FieldLabel>
      <Input required type="email" placeholder="you@example.com" />
      <FieldDescription>This field is required.</FieldDescription>
    </Field>
  ),
}

export const Invalid = {
  parameters: {
    docs: {
      description: {
        story: 'Jonathan: Validate on blur, not every keystroke. Error = red border + message; valid = green confirmation. Do not say "invalid input" — say exactly what is wrong.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Field data-invalid>
        <FieldLabel>Part number *</FieldLabel>
        <Input defaultValue="ABC-123!" aria-invalid />
        <FieldError>Special characters not allowed. Use only letters and numbers (e.g. ABC123).</FieldError>
      </Field>
      <Field>
        <FieldLabel>Base price *</FieldLabel>
        <Input defaultValue="$1,200.00" />
        <FieldDescription className="text-emerald-600">✓ Valid price format</FieldDescription>
      </Field>
    </div>
  ),
}

export const Disabled = {
  render: () => (
    <Field data-disabled>
      <FieldLabel>Email</FieldLabel>
      <Input disabled placeholder="you@example.com" />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  ),
}

export const Group = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Jordan Lee" />
      </Field>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="name@example.com" />
        <FieldDescription>We'll send updates to this address.</FieldDescription>
      </Field>
      <Button>Submit</Button>
    </FieldGroup>
  ),
}

export const Inline = {
  render: () => (
    <Field orientation="horizontal">
      <Input placeholder="Search..." />
      <Button>Search</Button>
    </Field>
  ),
}
