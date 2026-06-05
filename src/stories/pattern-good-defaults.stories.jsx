import { Field, FieldLabel } from '@/components/ui/field'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

export default {
  title: 'Design patterns/Forms & Input/Good defaults',
  parameters: {
    docs: { description: { component: '**Missing** · High priority. Pre-fill the most common value to cut entry time. Label defaults clearly ("default", "typical"), user can always override, base on real usage data. Never default required compliance fields.' } },
  },
}

export const Default = {
  render: () => (
    <div className="w-80 flex flex-col gap-4">
      <Field>
        <FieldLabel className="flex items-center gap-2">Currency <Badge variant="outline">default</Badge></FieldLabel>
        <Select defaultValue="usd">
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD — US Dollar</SelectItem>
            <SelectItem value="eur">EUR — Euro</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel className="flex items-center gap-2">Lead time <Badge variant="outline">typical</Badge></FieldLabel>
        <Select defaultValue="14">
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 days</SelectItem>
            <SelectItem value="14">14 days</SelectItem>
            <SelectItem value="30">30 days</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  ),
}
