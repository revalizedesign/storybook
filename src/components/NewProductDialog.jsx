import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const NEW_CATEGORY = 'New category'

export function NewProductDialog({ categories = [], onOpenChange, onSubmit, open }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState(null)
  const [newCategory, setNewCategory] = useState('')

  const isNewCategory = category === NEW_CATEGORY
  const canSubmit = category && (!isNewCategory || newCategory.trim())

  const reset = () => { setName(''); setCategory(null); setNewCategory('') }

  const handleOpenChange = (next) => {
    if (!next) reset()
    onOpenChange?.(next)
  }

  const handleSubmit = () => {
    onSubmit?.({ category: isNewCategory ? newCategory.trim() : category, name: name.trim() })
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="[&_[data-slot=dialog-title]]:text-base">
        <DialogHeader>
          <DialogTitle>New product</DialogTitle>
          <DialogDescription>Name your product and choose a category.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Field>
            <FieldLabel>Product name</FieldLabel>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Cyclo 6000" />
          </Field>
          <Field>
            <FieldLabel>Category <span className="text-destructive">*</span></FieldLabel>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Select a category" /></SelectTrigger>
              <SelectContent>
                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                <SelectItem value={NEW_CATEGORY}>{NEW_CATEGORY}</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          {isNewCategory && (
            <Field>
              <FieldLabel>New category name <span className="text-destructive">*</span></FieldLabel>
              <Input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Category name" />
            </Field>
          )}
        </div>
        <DialogFooter className="-mx-6 -mb-6 rounded-b-xl border-t bg-muted/50 p-6">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
          <Button disabled={!canSubmit} onClick={handleSubmit}>Create product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
