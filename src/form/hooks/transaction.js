import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useCreateTransactionMutation, useEditTransactionMutation } from '@/API/hooks/transactions'

import { createTransactionSchema, EditTransactionSchema } from '../schemas/transaction'

export const UseCreateTrasactionForm = ({ onSucess, onError }) => {
  const { mutateAsync: createTrasaction } = useCreateTransactionMutation()
  const form = useForm({
    resolver: zodResolver(createTransactionSchema),
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
      onSucess()
    } catch (error) {
      console.log(error)
      onError()
    }
  }

  return { form, onSubmit }
}

const getEditTransactionFormDefaultValues = transaction => ({
  name: transaction?.name,
  amount: parseFloat(transaction?.amount),
  date: new Date(transaction?.date),
  type: transaction?.type,
})

export const useEditTrasactionForm = ({ transaction, onSucess, onError }) => {
  const { mutateAsync: updateTransaction } = useEditTransactionMutation()
  const form = useForm({
    resolver: zodResolver(EditTransactionSchema),
    defaultValues: getEditTransactionFormDefaultValues(transaction),
    shouldUnregister: true,
  })

  useEffect(() => {
    form.reset(getEditTransactionFormDefaultValues(transaction))
    form.setValue('id', transaction?.id)
  }, [form, transaction])

  const onSubmit = async data => {
    console.log(form.formState.errors)
    await updateTransaction(data)
    try {
      console.log(data)
      onSucess()
    } catch (error) {
      console.log(error)
      onError()
    }
  }

  return { form, onSubmit }
}
