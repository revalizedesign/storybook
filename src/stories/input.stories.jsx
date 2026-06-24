import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'
import { createDocsPage } from './DocsPage'

export default {
  title: 'shadcn/Input',
  parameters: {
    docs: {
      description: { component: '<a href="https://ui.shadcn.com/docs/components/base/input">Input - shadcn/ui</a>' },
      page: createDocsPage({
        comments: {
          Jonathan: `**Usage:** Text input for forms. Use Label component to wrap inputs with labels and descriptions.

**Visual Rules:**
- Always pair with Label component for accessibility
- Border color: neutral gray
- Focus: Ring outline with primary color
- Invalid state: Red border + error icon
- Placeholder text: muted-foreground color, never bold
- Avoid mixing Input + Addon in same field; use InputGroup component instead

**Sizes** (height):
- **xs** (28px): Compact tables, inline search
- **sm** (32px): Secondary forms, dense layouts
- **md** (40px): Default, recommended for most forms
- **lg** (48px): Primary forms, high-visibility

**Input Types Supported:**
- text (default)
- email
- password
- number
- tel
- url
- date
- time
- datetime-local
- search

**States:**
1. **Default**: Ready for input, focus border invisible
2. **Focus**: Ring outline with primary color
3. **Filled**: With value, still focusable
4. **Disabled**: Gray background, no pointer
5. **Error**: Red border, error message below
6. **Success**: Green border, success message below
7. **Loading**: Spinner icon on right (async validation)

**Validation Rules:**
- Show inline error message immediately on blur
- Error color: red (#EF4444)
- Success color: green (#10B981)
- Info/hint color: gray (muted-foreground)
- Icon placement: Right side of input
- Helper text below: Keep to 1 line max

**Composition with Label:**
- Use \`<Label>\` for label + Input + Error/Helper
- Label htmlFor must match Input id
- Helper text in small gray text below

**Accessibility:**
- Keyboard: Tab (focus), Enter (submit if in form)
- Label: htmlFor linking to input id
- Error: aria-invalid="true" + aria-describedby for error message
- Type-specific: email/tel/number get native mobile keyboards
- Password: Consider unmask toggle button

**Product Examples:**
- ConfigureOne: Email for quotes, number for quantity inputs
- PROCAD: Search inputs for part lookup, date for batch dates
- SpecPage: Search inputs for formulation lookup

**Common Patterns:**
- Email input: type="email", autocomplete="email"
- Search: placeholder="Search...", icon-left, clear button on right
- Phone: type="tel", autocomplete="tel"
- Credit card: Formatted, spaces every 4 digits`,
        },
      }),
    },
  },
}

export const Default = {
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <Input placeholder="Default input" />
      <Input disabled placeholder="Disabled input" />
      <Input type="password" placeholder="Password input" />
    </div>
  ),
}

export const Sizes = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <div>
        <label className="text-xs font-semibold text-muted-foreground mb-1 block">Extra Small (28px)</label>
        <Input size="xs" placeholder="xs size - compact tables" />
      </div>
      <div>
        <label className="text-xs font-semibold text-muted-foreground mb-1 block">Small (32px)</label>
        <Input size="sm" placeholder="sm size - dense layouts" />
      </div>
      <div>
        <label className="text-xs font-semibold text-muted-foreground mb-1 block">Medium (40px) - Default</label>
        <Input size="md" placeholder="md size - recommended for most forms" />
      </div>
      <div>
        <label className="text-xs font-semibold text-muted-foreground mb-1 block">Large (48px)</label>
        <Input size="lg" placeholder="lg size - primary forms" />
      </div>
    </div>
  ),
}

export const InputTypes = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <div>
        <label className="text-sm font-medium mb-2 block">Text Input</label>
        <Input type="text" placeholder="Text input" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Email Input</label>
        <Input type="email" placeholder="name@example.com" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Password Input</label>
        <Input type="password" placeholder="••••••••" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Number Input</label>
        <Input type="number" placeholder="Enter quantity" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Tel Input</label>
        <Input type="tel" placeholder="+1 (555) 000-0000" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">URL Input</label>
        <Input type="url" placeholder="https://example.com" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Date Input</label>
        <Input type="date" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Search Input</label>
        <Input type="search" placeholder="Search products..." />
      </div>
    </div>
  ),
}

export const ValidationStates = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <Input placeholder="No validation..." />
        <p className="text-xs text-muted-foreground mt-1">Helper text appears here</p>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Error State</label>
        <div className="relative">
          <Input
            placeholder="Invalid input..."
            className="border-red-500 focus-visible:ring-red-200"
            aria-invalid="true"
            aria-describedby="email-error"
          />
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
        </div>
        <p id="email-error" className="text-xs text-red-500 mt-1">
          Please enter a valid email address
        </p>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Success State</label>
        <div className="relative">
          <Input
            placeholder="Valid input..."
            defaultValue="john@company.com"
            className="border-green-500 focus-visible:ring-green-200"
            aria-describedby="email-success"
          />
          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
        </div>
        <p id="email-success" className="text-xs text-green-600 mt-1">
          Email verified successfully
        </p>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Info State</label>
        <div className="relative">
          <Input placeholder="With additional info..." />
          <Info className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500" />
        </div>
        <p className="text-xs text-blue-600 mt-1">
          Character limit: 100 (0/100)
        </p>
      </div>
    </div>
  ),
}

export const WithLabel = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          type="email"
          placeholder="your@company.com"
          aria-required="true"
        />
        <p className="text-xs text-muted-foreground">We'll never share your email address</p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          aria-required="true"
        />
        <p className="text-xs text-muted-foreground">Minimum 8 characters, 1 uppercase, 1 number</p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="company">Company Name</Label>
        <Input
          id="company"
          type="text"
          placeholder="Acme Corporation"
        />
      </div>
    </div>
  ),
}

export const FormComposition = {
  render: () => (
    <form className="flex flex-col gap-6 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="firstname">First Name</Label>
        <Input id="firstname" placeholder="John" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastname">Last Name</Label>
        <Input id="lastname" placeholder="Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john.doe@company.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone (Optional)</Label>
        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>
      <div className="flex gap-2 justify-end pt-4">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Submit Form</Button>
      </div>
    </form>
  ),
}
