import { zodResolver } from '@hookform/resolvers/zod'
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

export const useEditTrasactionForm = ({ transaction, onSucess, onError }) => {
  const { mutateAsync: updateTransaction } = useEditTransactionMutation()
  const form = useForm({
    resolver: zodResolver(EditTransactionSchema),
    defaultValues: {
      id: transaction?.id || '',
      name: transaction?.name || '',
      amount: parseFloat(transaction?.amount) || 50,
      date: transaction?.date || new Date(),
      type: transaction?.type || '',
    },
    shouldUnregister: true,
  })

  const onSubmit = async data => {
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
