import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ExternalLinkIcon } from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/API/hooks/transactions'
import { formatCurrency } from '@/helpers/currency'

import { TransactionTypeBadge } from './transaction-type-badge'
import { Button } from './ui/button'
import { DataTable } from './ui/data-table'

const columns = [
  {
    accessorKey: 'name',
    header: 'Titulo',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type.toLowerCase()} />
    },
  },
  {
    accessorKey: 'date',
    header: 'data',
    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transection } }) => {
      return formatCurrency(transection.amount)
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: () => {
      return (
        <Button variant="ghost" size="icon">
          <ExternalLinkIcon className="text-muted-foreground" />
        </Button>
      )
    },
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
