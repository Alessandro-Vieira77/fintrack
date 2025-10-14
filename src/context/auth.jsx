import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { STORAGE_KEY_ACCESS_TOKEN, STORAGE_KEY_REFRESH_TOKEN } from '@/constants/local-storage'

import { userService } from '../service/user'

const setTokens = tokens => {
  localStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, tokens?.accessToken)
  localStorage.setItem(STORAGE_KEY_REFRESH_TOKEN, tokens?.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(STORAGE_KEY_ACCESS_TOKEN)
  localStorage.removeItem(STORAGE_KEY_REFRESH_TOKEN)
}

export const authContext = createContext({
  user: null,
  login: () => {},
  signIn: () => {},
  signOut: () => {},
})

export const UseAuthContext = () => useContext(authContext)

export const AuthContextProvider = ({ children }) => {
  const [initialization, setInitialization] = useState(true)
  const [user, setUser] = useState(null)

  const { mutate: signupMutation } = useMutation({
    mutationKey: ['signup'],
    mutationFn: vairables => {
      const response = userService.signup(vairables)

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
    mutationFn: login => {
      const response = userService.signIn(login)
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
        const acessToken = localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN)
        const refreshToken = localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN)
        if (!acessToken && !refreshToken) {
          return
        }

        const response = await userService.getMe()
        setUser(response)
      } catch (error) {
        setUser(null)
        toast.error('Erro ao buscar usuário. Tente novamente.')
        console.log(error)
      } finally {
        setInitialization(false)
      }
    }
    getUser()
  }, [])

  function signOut() {
    setUser(null)
    removeTokens()
  }

  return (
    <authContext.Provider
      value={{
        user: user,
        login: signIn,
        signIn: signUp,
        initialization,
        signOut,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
