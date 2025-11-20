import { Landmark, Proportions, TrendingDown, TrendingUp } from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useGetUserBalance } from '@/API/hooks/user'

import BalanceItem from './balance-item'

export default function Balance() {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data } = useGetUserBalance({ from, to })

  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-3 sm:grid-cols-2 sm:gap-6">
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
