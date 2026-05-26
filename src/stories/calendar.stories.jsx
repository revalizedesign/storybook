import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'

export default {
  title: 'shadcn/Calendar',
  parameters: {
    docs: { description: { component: '<a href="https://ui.shadcn.com/docs/components/base/calendar">Calendar - shadcn/ui</a>' } },
  },
}

export const Default = {
  render: () => {
    function Demo() {
      const [date, setDate] = useState(new Date())
      return <Calendar mode="single" selected={date} onSelect={setDate} />
    }
    return <Demo />
  },
}
