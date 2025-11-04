import { useQuery } from '@tanstack/react-query'
import { Landmark, Proportions, TrendingDown, TrendingUp } from 'lucide-react'
import { useSearchParams } from 'react-router'

import { UseAuthContext } from '@/context/auth'
import { userService } from '@/service/user'

import BalanceItem from './balance-item'

export default function Balance() {
  const { user } = UseAuthContext()
  const [searchParams] = useSearchParams()
  const { data } = useQuery({
    queryKey: ['balance', user.id],
    queryFn: () => {
      const from = searchParams.get('from')
      const to = searchParams.get('to')

      return userService.getBalance({ from, to })
    },
  })

  console.log(data)

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        title="Saldo"
        amount={data?.balance}
        icon={<Proportions size={16} color="#FFF" />}
      />
      <BalanceItem
        title="Ganho"
        amount={data?.earnings}
        icon={<TrendingUp size={16} className="text-primary" />}
      />
      <BalanceItem
        title="Gastos"
        amount={data?.expenses}
        icon={<TrendingDown size={16} className="text-destructive" />}
      />
      <BalanceItem
        title="Investimentos"
        amount={data?.investments}
        icon={<Landmark size={16} className="text-blue-600" />}
      />
    </div>
  )
}
