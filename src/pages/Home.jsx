import { Navigate } from 'react-router'

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
    <div>
      <h1 className="m-2">Home</h1>
    </div>
  )
}

export default home
