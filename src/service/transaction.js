import { protecdedApi } from '@/lib/axios'

export const trasactionService = {
  /**
   * Cria uma nova transação
   * @param {Object} input - Dados da transação
   * @param {string} input.name - Nome da transação
   * @param {number} input.amount - Valor da transação
   * @param {string} input.date - Data da transação (formato: YYYY-MM-DD)
   * @param {string} input.type - Tipo da transação (EARNING, EXPANSE, INVESTMENT)
   * @returns {Object} - Dados da transação criada
   */
  create: async input => {
    const { data: response } = await protecdedApi.post('/transactions/me', input)
    return response
  },
}
