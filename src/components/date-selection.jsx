import { useQueryClient } from '@tanstack/react-query'
import { addMonths, isValid } from 'date-fns'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { UseAuthContext } from '@/context/auth'

import { DatePickerWithRange } from './ui/date-picker-with-range'

export default function DateSelection() {
  const queryClient = useQueryClient()
  const { user } = UseAuthContext()
  const formtDateToQueryParams = date => format(date, 'yyyy-MM-dd')
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const getInitialDateState = searchParams => {
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    const defaultDate = {
      from: new Date(),
      to: addMonths(new Date(), 1),
    }

    if (!from || !to) {
      return defaultDate
    }

    const dataAreInvalid = !isValid(new Date(from)) || !isValid(new Date(to))

    if (dataAreInvalid) {
      return defaultDate
    }

    return {
      from: new Date(from + 'T00:00:00'),
      to: new Date(to + 'T00:00:00'),
    }
  }

  const [date, setDate] = useState(getInitialDateState(searchParams))

  useEffect(() => {
    if (!date?.from || !date?.to) return

    if (date.from && date.to) {
      const queryParams = new URLSearchParams()
      queryParams.set('from', formtDateToQueryParams(date.from))
      queryParams.set('to', formtDateToQueryParams(date.to))
      navigate(`/?${queryParams.toString()}`)
      queryClient.invalidateQueries({
        queryKey: [
          'balance',
          user.id,
          formtDateToQueryParams(date.from),
          formtDateToQueryParams(date.to),
        ],
      })
    }
  }, [navigate, date, queryClient, user.id])

  return (
    <div>
      <DatePickerWithRange value={date} onChange={setDate} />
    </div>
  )
}
