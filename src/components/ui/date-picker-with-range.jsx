import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export const DatePickerWithRange = ({ value, onChange, placeholder = 'Selecione uma data' }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex flex-col gap-3">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="gap-2 font-normal">
            <CalendarIcon />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, 'LLL dd, y', {
                    locale: ptBR,
                  })}{' '}
                  -{' '}
                  {format(value.to, 'LLL dd, y', {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(value.from, 'LLL dd, y', {
                  locale: ptBR,
                })
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={value?.from}
            numberOfMonths={2}
            selected={value}
            onSelect={onChange}
            className="rounded-lg border shadow-sm"
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
