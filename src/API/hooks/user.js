import { useMutation, useQuery } from '@tanstack/react-query'

import { userService } from '@/API/service/user'
import { UseAuthContext } from '@/context/auth'

export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['balance', userId]
  }
  return ['balance', userId, from, to]
}

export const useGetUserBalance = ({ from, to }) => {
  const { user } = UseAuthContext()

  return useQuery({
    queryKey: getUserBalanceQueryKey({ userId: user?.id, from, to }),
    queryFn: () => {
      return userService.getBalance({ from, to })
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: Boolean(from) && Boolean(to) && Boolean(user?.id),
  })
}

export const signUpMutationKey = ['signup']
export const useSignUpMutation = () => {
  return useMutation({
    mutationKey: signUpMutationKey,
    mutationFn: vairables => {
      const response = userService.signup(vairables)

      return response
    },
  })
}

export const signInMutationKey = ['login']
export const useSignInMutation = () => {
  return useMutation({
    mutationKey: signInMutationKey,
    mutationFn: login => {
      const response = userService.signIn(login)
      return response
    },
  })
}
