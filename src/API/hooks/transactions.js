import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { UseAuthContext } from '@/context/auth'

import { trasactionService } from '../service/transaction'

export const createTransactionMutationKey = ['createTransaction']

export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient()
  const { user } = UseAuthContext()

  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: data => trasactionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user?.id }),
        exact: false,
      })
    },
  })
}

export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['getTransactions', userId]
  }
  return ['getTransactions', userId, from, to]
}

export const useGetTransactions = ({ from, to }) => {
  const { user } = UseAuthContext()
  return useQuery({
    queryKey: getUserBalanceQueryKey({ userId: user?.id, from, to }),
    queryFn: trasactionService.getAll({ from, to }),
  })
}
