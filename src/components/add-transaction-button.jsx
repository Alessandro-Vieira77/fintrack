import { Landmark, Loader2Icon, PlusIcon, TrendingDown, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { UseCreateTrasactionForm } from '@/form/hooks/transaction'

import { DatePicker } from './ui/date-peker'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'

export default function AddTransactionButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  // const { mutateAsync: createTrasaction } = useCreateTransactionMutation()

  const { form, onSubmit } = UseCreateTrasactionForm({
    onSucess: () => {
      toast.success('Transação adicionada com sucesso')
      setDialogIsOpen(false)
    },
    onError: () => {
      toast.error('Erro ao adicionar transação. Tente novamente.')
    },
  })

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold">
          Nova transação
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar transações</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Nome</FormLabel>
                  <FormControl>
                    <Input id="name" autoComplete="off" placeholder="Digite seu nome" {...field} />
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
                      autoComplete="off"
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
                    <div id="type" className="grid w-full grid-cols-3 gap-4">
                      <Button
                        type="button"
                        onClick={() => field.onChange('EARNING')}
                        className={field.value === 'EARNING' && 'bg-secondary'}
                        variant="outline"
                      >
                        <TrendingUp className="text-primary" />
                        Ganho
                      </Button>
                      <Button
                        type="button"
                        onClick={() => field.onChange('EXPENSE')}
                        className={field.value === 'EXPENSE' && 'bg-secondary'}
                        variant="outline"
                      >
                        <TrendingDown className="text-destructive" />
                        Gastos
                      </Button>
                      <Button
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
            <DialogFooter className="grid grid-cols-2 sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={form.formState.isSubmitting}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2Icon className="animate-spin" />}
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
