import { protecdedApi, publicApi } from '@/lib/axios'

export const userService = {
  /**
   * Cria um novo usuário
   * @param {Object} input - Dados do usuário
   * @param {string} input.firstName - Nome do usuário
   * @param {string} input.lastName - Sobrenome do usuário
   * @param {string} input.email - Email do usuário
   * @param {string} input.password - Senha do usuário
   * @returns {Object} - Dados do usuário criado
   */
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
  /**
   * Login de usuário
   * @param {Object} input - Dados do usuário
   * @param {string} input.firstName - Nome do usuário
   * @param {string} input.lastName - Sobrenome do usuário
   * @param {string} input.email - Email do usuário
   * @param {string} input.password - Senha do usuário
   * @returns {Object} - Dados do usuário criado
   * @returns {string} - Token de acesso
   */
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

  /**
   * retorna usuário autenticado
   * @returns {Object} - Dados do usuário autenticado
   */
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
  /**
   * retorna o balanço do usuário autenticado
   * @param {Object} input - Dados do usuário
   * @param {string} input.from - Data inicial (YYYY-MM-DD)
   * @param {string} input.to - Data final (YYYY-MM-DD)
   */
  getBalance: async input => {
    const queryParams = new URLSearchParams()
    queryParams.set('from', input?.from)
    queryParams.set('to', input?.to)

    const { data: response } = await protecdedApi.get(`/users/me/balance?${queryParams.toString()}`)
    return response
  },
}
