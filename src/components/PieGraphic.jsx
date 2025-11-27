'use client'

// import { PieSectorDataItem } from 'recharts/types/polar/Pie'
import { Landmark, TrendingDown, TrendingUp } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { Pie, PieChart, Sector } from 'recharts'

import { useGetUserBalance } from '@/API/hooks/user'
import { Card, CardContent } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

import { PercentageGrafh } from './PersetageGraphic'

export const description = 'A donut chart with an active sector'

export function PieGraphic() {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const { data } = useGetUserBalance({ from, to })

  const calcPersEarnings = ((Number(data?.balance) / Number(data?.earnings)) * 100).toFixed(0)
  const persEarnings = `${calcPersEarnings}%`
  const calcPersExpenses = ((Number(data?.expenses) / Number(data?.earnings)) * 100).toFixed(0)
  const persExpenses = `${calcPersExpenses}%`
  const calcPersInvestments = ((Number(data?.investments) / Number(data?.earnings)) * 100).toFixed(
    0,
  )
  const persInvestments = `${calcPersInvestments}%`

  const chartData = [
    { type: 'Ganhos', value: Number(data?.earnings), fill: 'var(--primary-green)' },
    { type: 'Gastos', value: Number(data?.expenses), fill: 'var(--primary-red)' },
    { type: 'Investidos', value: Number(data?.investments), fill: 'var(--primary-blue)' },
  ]

  const chartConfig = {
    values: {
      label: 'Values',
    },
    earning: {
      label: 'Ganhos',
      color: 'var(--chart-1)',
    },
    expense: {
      label: 'Gastos',
      color: 'var(--chart-2)',
    },
    investment: {
      label: 'Investimentos',
      color: 'var(--chart-3)',
    },
  }

  return (
    <Card className="mx-auto flex w-full max-w-[500px] justify-center py-4 sm:py-0">
      <CardContent className="flex flex-col items-center sm:flex-row">
        {Number(data?.earnings) > 0 ? (
          <>
            <div className="relative w-full">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[200px] sm:min-h-[190px]"
              >
                <PieChart>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="type"
                    innerRadius={60}
                    strokeWidth={5}
                    activeIndex={0}
                    activeShape={({ outerRadius = 0, ...props }) => (
                      <Sector {...props} outerRadius={outerRadius + 10} />
                    )}
                  />
                </PieChart>
              </ChartContainer>
              <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
                <p className="text-sm">Ganhos</p>
                <p className="text-2xl font-bold">{persEarnings}</p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <PercentageGrafh
                icon={<TrendingUp size={16} color="var(--primary-green)" />}
                value={persEarnings}
                title="Ganhos"
              />

              <PercentageGrafh
                icon={<TrendingDown size={16} color="var(--primary-red)" />}
                value={persExpenses}
                title="Gastos"
              />

              <PercentageGrafh
                icon={<Landmark size={16} color="var(--primary-blue)" />}
                value={persInvestments}
                title="Investidos"
              />
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-center">
            <p className="text-lg font-medium">Faça uma transação para ver os dados</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
