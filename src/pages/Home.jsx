import { Navigate } from 'react-router'

import AddTransactionButton from '@/components/add-transaction-button'
import Balance from '@/components/balance'
import DateSelection from '@/components/date-selection'
import Header from '@/components/header.jsx'
import Loader from '@/components/loader'
import TransactionsTable from '@/components/transactions-table'

import { UseAuthContext } from '../context/auth'

function home() {
  const { user, initialization } = UseAuthContext()

  if (initialization) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex gap-2">
          aguarde por favor... <Loader size={30} />
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Header />
      <div className="space-y-4 p-8">
        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <h2 className="w-full text-left text-2xl font-bold">Dashboard</h2>
          <div className="flex flex-col gap-2 sm:flex-row">
            <DateSelection />
            <AddTransactionButton />
          </div>
        </div>
        {/* transactions */}
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <Balance />
        </div>
        <TransactionsTable />
      </div>
    </>
  )
}

export default home
