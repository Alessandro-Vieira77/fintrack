import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/API/hooks/transactions'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatCurrency } from '@/helpers/currency'

import { EditTransactionButton } from './edit-transaction-button'
import { TransactionTypeBadge } from './transaction-type-badge'
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
    cell: ({ row: { original: transaction } }) => {
      return <EditTransactionButton transaction={transaction} />
    },
  },
]

const TransactionsTable = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data: transactions } = useGetTransactions({ from, to })
  return (
    <>
      <h2 className="text-2xl font-bold">Transações</h2>
      <ScrollArea className="h-[250px] max-h-[250px] rounded-md border">
        <DataTable columns={columns} data={transactions || []} />
      </ScrollArea>
    </>
  )
}

export default TransactionsTable
