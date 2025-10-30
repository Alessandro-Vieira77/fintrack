import { addMonths } from 'date-fns'
import { useState } from 'react'

import { DatePickerWithRange } from './ui/date-picker-with-range'

export default function DateSelection() {
  const [date, setDate] = useState({
    from: new Date(),
    to: addMonths(new Date(), 1),
  })
  return (
    <div>
      <DatePickerWithRange value={date} onChange={setDate} />
    </div>
  )
}
