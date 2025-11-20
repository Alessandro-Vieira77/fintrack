import { ExternalLinkIcon } from 'lucide-react'
import { Landmark, Loader2Icon, TrendingDown, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'

import { useEditTrasactionForm } from '@/form/hooks/transaction'

import { Button } from './ui/button'
import { DatePicker } from './ui/date-peker'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTitle, SheetTrigger } from './ui/sheet'

export const EditTransactionButton = ({ transaction }) => {
  const [SheetIsOpen, setSheetIsOpen] = useState(false)
  const { form, onSubmit } = useEditTrasactionForm({
    transaction,
    onSucess: () => {
      setSheetIsOpen(false)
      toast.success('Transação editada com sucesso!')
    },
    onError: () => toast.error('Erro ao editar transação!'),
  })
  return (
    <Sheet open={SheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ExternalLinkIcon className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[450px] p-4">
        <SheetTitle>Editar Transação</SheetTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Nome</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="amount">Valor</FormLabel>
                  <FormControl>
                    <NumericFormat
                      id="amount"
                      {...field}
                      placeholder="Digite o valor da transação"
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      allowNegative={false}
                      customInput={Input}
                      onChange={() => {}}
                      onValueChange={values => field.onChange(values.floatValue)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="type">Tipo</FormLabel>
                  <FormControl>
                    <div className="grid w-full grid-cols-3 gap-4">
                      <Button
                        id="type-earning"
                        type="button"
                        onClick={() => field.onChange('EARNING')}
                        className={field.value === 'EARNING' && 'bg-secondary'}
                        variant="outline"
                      >
                        <TrendingUp className="text-primary" />
                        Ganho
                      </Button>
                      <Button
                        id="type-expense"
                        type="button"
                        onClick={() => field.onChange('EXPENSE')}
                        className={field.value === 'EXPENSE' && 'bg-secondary'}
                        variant="outline"
                      >
                        <TrendingDown className="text-destructive" />
                        Gastos
                      </Button>
                      <Button
                        id="type-investment"
                        type="button"
                        onClick={() => field.onChange('INVESTMENT')}
                        className={field.value === 'INVESTMENT' && 'bg-secondary'}
                        variant="outline"
                      >
                        <Landmark className="text-blue-600" />
                        Investimentos
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="grid grid-cols-2 sm:justify-start">
              <SheetClose asChild>
                <Button type="button" variant="secondary" disabled={form.formState.isSubmitting}>
                  Cancelar
                </Button>
              </SheetClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2Icon className="animate-spin" />}
                Salvar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
