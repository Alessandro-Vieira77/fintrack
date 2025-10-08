import { useMutation } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

export const authContext = createContext({
  user: null,
  login: () => {},
  signIn: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const { mutate: signupMutation } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async vairables => {
      const { data: response } = await api.post('/users', {
        first_name: vairables?.firstName,
        last_name: vairables?.lastName,
        email: vairables?.email,
        password: vairables?.password,
      })

      return response
    },
  })

  function signUp(data) {
    signupMutation(data, {
      onSuccess: createdUser => {
        toast.success('Conta criada com sucesso!')
        const accessToken = createdUser.tokens.accessToken
        const refreshToken = createdUser.tokens.refreshToken
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        setUser(createdUser)
      },
      onError: () => {
        toast.error('Erro ao criar conta. Tente novamente.')
      },
    })
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const acessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (!acessToken && !refreshToken) {
          return
        }

        const { data: response } = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${acessToken}`,
          },
        })
        setUser(response)
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        toast.error('Erro ao buscar usuário. Tente novamente.', error)
      }
    }
    getUser()
  }, [])

  return (
    <authContext.Provider
      value={{
        user: user,
        login: () => {},
        signIn: signUp,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
