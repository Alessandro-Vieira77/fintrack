import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Landmark, Loader2Icon, PlusIcon, TrendingDown, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'
import z from 'zod'

import { getUserBalanceQueryKey } from '@/API/hooks/user'
import { trasactionService } from '@/API/service/transaction'
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
import { UseAuthContext } from '@/context/auth'

import { DatePicker } from './ui/date-peker'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'

export default function AddTransactionButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const queryClient = useQueryClient()
  const { user } = UseAuthContext()
  const { mutateAsync: createTrasaction } = useMutation({
    mutationKey: ['createTransaction'],
    mutationFn: data => trasactionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user?.id }),
        exact: false,
      })
    },
  })

  const formSchema = z.object({
    name: z
      .string({
        message: 'Nome é obrigatório',
      })
      .trim()
      .min(3, 'Nome deve ter pelo menos 3 caracteres'),
    amount: z.number({
      message: 'Valor é obrigatório',
    }),
    date: z.date({
      message: 'Data é obrigatória',
    }),
    type: z.enum(['EARNING', 'EXPANSE', 'INVESTMENT'], {
      message: 'Tipo é obrigatório',
    }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: 50,
      date: new Date(),
      type: '',
    },
    shouldUnregister: true,
  })

  const onSubmit = async data => {
    try {
      await createTrasaction(data)
      toast.success('Transação adicionada com sucesso')
      setDialogIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

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
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
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
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <NumericFormat
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
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <div className="grid w-full grid-cols-3 gap-4">
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
                        onClick={() => field.onChange('EXPANSE')}
                        className={field.value === 'EXPANSE' && 'bg-secondary'}
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
