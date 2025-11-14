import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateTransactionMutation } from '@/API/hooks/transactions'

import { createTransactionSchema } from '../schemas/transaction'

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
