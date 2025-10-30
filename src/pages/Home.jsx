import { PlusIcon } from 'lucide-react'
import { Navigate } from 'react-router'

import DateSelection from '@/components/date-selection'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'

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
      <div className="p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex gap-2">
            <DateSelection />
            <Button className="font-semibold">
              Nova transação
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default home
