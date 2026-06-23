import { useState } from 'react'
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList, ComboboxSeparator, ComboboxTrigger, ComboboxValue } from '@/components/ui/combobox'
import { Button } from '@/components/ui/button'
import { CyclePlaceholderProvider, useCyclePlaceholder } from '@/components/CyclePlaceholder'
import data from './search.json'

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro']

const timezones = [
  { value: 'Americas', items: ['(GMT-5) New York', '(GMT-8) Los Angeles', '(GMT-6) Chicago', '(GMT-5) Toronto'] },
  { value: 'Europe', items: ['(GMT+0) London', '(GMT+1) Paris', '(GMT+1) Berlin', '(GMT+1) Rome'] },
  { value: 'Asia/Pacific', items: ['(GMT+9) Tokyo', '(GMT+8) Shanghai', '(GMT+8) Singapore', '(GMT+11) Sydney'] },
]

export default {
  title: 'shadcn/Combobox',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/combobox">Combobox - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const Multiple = {
  render: () => {
    const [value, setValue] = useState([])
    return (
      <Combobox items={frameworks} multiple value={value} onValueChange={setValue}>
        <ComboboxChips>
          <ComboboxValue>
            {value.map(item => <ComboboxChip key={item}>{item}</ComboboxChip>)}
          </ComboboxValue>
          <ComboboxChipsInput placeholder="Add framework" />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}

export const Clear = {
  render: () => (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const Groups = {
  render: () => (
    <Combobox items={timezones}>
      <ComboboxInput placeholder="Select a timezone" />
      <ComboboxContent>
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          {(group, index) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
              </ComboboxCollection>
              {index < timezones.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const AutoHighlight = {
  name: 'Auto highlight',
  render: () => (
    <Combobox items={frameworks} autoHighlight>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

const searchHints = [
  'Search by product name…',
  'Search by SKU…',
  'Search by category…',
  'Try “centrifugal” or “VFD”…',
]

function CyclingCombobox() {
  const placeholder = useCyclePlaceholder()
  return (
    <Combobox items={data} itemToStringValue={item => item.name}>
      <ComboboxInput placeholder={placeholder} showClear showTrigger={false} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => <ComboboxItem key={item.sku} value={item}>{item.name}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export const CyclingPlaceholder = {
  name: 'Cycle placeholder',
  render: () => (
    <CyclePlaceholderProvider placeholders={searchHints}>
      <CyclingCombobox />
    </CyclePlaceholderProvider>
  ),
}

export const Grid = {
  render: () => (
    <Combobox items={data} itemToStringValue={item => item.name}>
      <ComboboxInput placeholder="Search Acme Industrial…" showClear showTrigger={false} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList variant="grid">
          {(item) => (
            <ComboboxItem key={item.sku} value={item}>
              <span className="truncate">{item.name}</span>
              <span className="truncate text-muted-foreground">{item.sku}</span>
              <span className="text-right text-muted-foreground tabular-nums">${item.price.toLocaleString()}</span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}
