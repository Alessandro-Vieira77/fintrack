import { protecdedApi, publicApi } from '@/lib/axios'

export const userService = {
  signup: async input => {
    const { data: response } = await publicApi.post('/users', {
      first_name: input?.firstName,
      last_name: input?.lastName,
      email: input?.email,
      password: input?.password,
    })
    return {
      id: response?.id,
      lastName: response?.last_name,
      firstName: response?.first_name,
      email: response?.email,
      password: response?.password,
    }
  },
  signIn: async input => {
    const { data: response } = await publicApi.post('/users/login', {
      email: input?.email,
      password: input?.password,
    })
    return {
      id: response?.id,
      lastName: response?.last_name,
      firstName: response?.first_name,
      email: response?.email,
      password: response?.password,
      tokens: response?.tokens,
    }
  },

  getMe: async () => {
    const { data: response } = await protecdedApi.get('/users/me')
    return {
      id: response?.id,
      lastName: response?.last_name,
      firstName: response?.first_name,
      email: response?.email,
      password: response?.password,
    }
  },
}
