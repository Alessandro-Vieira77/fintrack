import { Navigate } from 'react-router'

import AddTransactionButton from '@/components/add-transaction-button'
import Balance from '@/components/balance'
import DateSelection from '@/components/date-selection'
import Header from '@/components/header'
import TransactionsTable from '@/components/transactions-table'

import { UseAuthContext } from '../context/auth'

function home() {
  const { user, initialization } = UseAuthContext()

  if (initialization) {
    return null
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Header />
      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex gap-2">
            <DateSelection />
            <AddTransactionButton />
          </div>
        </div>
        {/* transactions */}
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          <Balance />
        </div>
        <TransactionsTable />
      </div>
    </>
  )
}

export default home
