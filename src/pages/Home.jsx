import { Navigate } from 'react-router'

import { Button } from '@/components/ui/button'

import { UseAuthContext } from '../context/auth'

function home() {
  const { user, initialization, signOut } = UseAuthContext()

  if (initialization) {
    return null
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <h1 className="m-2">
        Welcome {user?.first_name} {user?.last_name}
      </h1>
      <Button onClick={signOut}> Sair </Button>
    </div>
  )
}

export default home
