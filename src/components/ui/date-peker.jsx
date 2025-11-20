'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Label } from './label'

export const DatePicker = React.forwardRef(
  ({ value, onChange, placeholder = 'Selecione um data' }, ref) => {
    const [open, setOpen] = React.useState(false)
    // const [date, setDate] = (React.useState < Date) | (undefined > undefined)

    return (
      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <Label htmlFor="date">Data</Label>
          <PopoverTrigger asChild>
            <Button variant="outline" id="date" className="w-full justify-between font-normal">
              {value
                ? format(value, 'MMM dd, yyyy', {
                    locale: ptBR,
                  })
                : placeholder}
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              id="date"
              mode="single"
              selected={value}
              captionLayout="dropdown"
              onSelect={onChange}
              locale={'ptBR'}
              ref={ref}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  },
)

DatePicker.displayName = 'DatePicker'
