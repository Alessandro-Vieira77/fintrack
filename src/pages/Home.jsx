import { Navigate } from 'react-router'

import Header from '@/components/Header'

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
    </>
  )
}

export default home
