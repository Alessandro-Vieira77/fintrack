import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

const KEY_ACCESS_TOKEN = 'accessToken'
const KEY_REFRESH_TOKEN = 'refreshToken'

const setTokens = tokens => {
  localStorage.setItem(KEY_ACCESS_TOKEN, tokens?.accessToken)
  localStorage.setItem(KEY_REFRESH_TOKEN, tokens?.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(KEY_ACCESS_TOKEN)
  localStorage.removeItem(KEY_REFRESH_TOKEN)
}

export const authContext = createContext({
  user: null,
  login: () => {},
  signIn: () => {},
})

export const UseAuthContext = () => useContext(authContext)

export const AuthContextProvider = ({ children }) => {
  const [initialization, setInitialization] = useState(true)
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

        setTokens(createdUser.tokens)
        setUser(createdUser)
      },
      onError: () => {
        toast.error('Erro ao criar conta. Tente novamente.')
      },
    })
  }

  const { mutate: signMutation } = useMutation({
    mutationKey: ['login'],
    mutationFn: async login => {
      const { data: response } = await api.post('/users/login', {
        email: login?.email,
        password: login?.password,
      })
      return response
    },
  })

  function signIn(data) {
    signMutation(data, {
      onSuccess: login => {
        toast.success('Login realizado com sucesso!')
        setTokens(login.tokens)
        setUser(login)
      },
      onError: error => {
        toast.error('Erro ao fazer login. Tente novamente.', error)
      },
    })
  }

  useEffect(() => {
    setInitialization(true)
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
        setUser(null)
        removeTokens()
        toast.error('Erro ao buscar usuário. Tente novamente.', error)
      } finally {
        setInitialization(false)
      }
    }
    getUser()
  }, [])

  return (
    <authContext.Provider
      value={{
        user: user,
        login: signIn,
        signIn: signUp,
        initialization,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
