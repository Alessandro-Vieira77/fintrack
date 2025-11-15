import { formatCurrency } from '@/helpers/currency'

import { Card } from './ui/card'

export default function BalanceItem({ title, amount, icon }) {
  return (
    <Card className="flex flex-col gap-2.5 p-6 text-white">
      <div className="flex items-center gap-2">
        <div className="bg-secondary flex h-8 w-8 items-center justify-center rounded-lg">
          {icon}
        </div>
        <h2 className="text-sm">{title}</h2>
      </div>
      <p className="text-2xl font-bold">{formatCurrency(amount)}</p>
    </Card>
  )
}
