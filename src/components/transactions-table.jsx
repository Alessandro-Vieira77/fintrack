import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/API/hooks/transactions'

import { DataTable } from './ui/data-table'

const columns = [
  {
    accessorKey: 'name',
    header: 'Titulo',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
  },
  {
    accessorKey: 'date',
    header: 'data',
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
  },
]

const TransactionsTable = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data: transactions } = useGetTransactions({ from, to })
  return <DataTable columns={columns} data={transactions || []} />
}

export default TransactionsTable
