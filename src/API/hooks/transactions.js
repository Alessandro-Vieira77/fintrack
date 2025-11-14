import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { UseAuthContext } from '@/context/auth'

import { trasactionService } from '../service/transaction'

export const createTransactionMutationKey = ['createTransaction']

export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['balance', userId]
  }
  return ['balance', userId, from, to]
}

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

      queryClient.invalidateQueries({
        queryKey: getUserTransationsQueryKey({ userId: user?.id }),
        exact: false,
      })
    },
  })
}

export const getUserTransationsQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['getTransactions', userId]
  }
  return ['getTransactions', userId, from, to]
}

export const useGetTransactions = ({ from, to }) => {
  const { user } = UseAuthContext()
  return useQuery({
    queryKey: getUserTransationsQueryKey({ userId: user.id, from, to }),
    queryFn: () => trasactionService.getAll({ from, to }),
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })
}
