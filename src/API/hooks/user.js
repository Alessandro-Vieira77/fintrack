import { useQuery } from '@tanstack/react-query'

import { userService } from '@/API/service/user'
import { UseAuthContext } from '@/context/auth'

export const getUserBalanceQueryKey = (userId, from, to) => {
  return ['balance', userId, from, to]
}

export const useGetUserBalance = ({ from, to }) => {
  const { user } = UseAuthContext()
  return useQuery({
    queryKey: getUserBalanceQueryKey({ UserId: user.id, from, to }),
    queryFn: () => {
      return userService.getBalance({ from, to })
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })
}
