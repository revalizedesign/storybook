import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default {
  title: 'Design patterns/Forms & Input/Inline validation',
  parameters: {
    docs: { description: { component: '**Defined** · Critical priority. Real-time field-level validation with specific messages. Validate on blur, not every keystroke. Error = red border + message; valid = green confirmation. Never "invalid input" — say exactly what is wrong.' } },
  },
}

export const Default = {
  render: () => (
    <div className="w-80 flex flex-col gap-4">
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
