import querySring from 'query-string'

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
    const { data: response } = await protecdedApi.post('/transactions/me', {
      name: input.name,
      amount: input.amount,
      date: input.date,
      type: input.type,
    })
    return response
  },
  /**
   * Retorna as trasações do usuárioa autenticado
   * @param {Object} input - Dados da transação
   * @param {string} input.from - data inicial (formato: YYYY-MM-DD)
   * @param {string} input.to - data final (formato: YYYY-MM-DD)
   */
  getAll: async input => {
    const query = querySring.stringify({ from: input.from, to: input.to })
    const { data: response } = await protecdedApi.get(`/transactions/me?${query}`)
    return response
  },
  /**
   * Atualiza uma transação
   * @param {Object} input - Dados da transação
   * @param {string} input.id - ID da transação
   * @param {string} input.name - Nome da transação
   * @param {number} input.amount - Valor da transação
   * @param {string} input.date - Data da transação (formato: YYYY-MM-DD)
   * @param {string} input.type - Tipo da transação (EARNING, EXPANSE, INVESTMENT)
   */
  update: async input => {
    const { data: response } = await protecdedApi.patch(`/transactions/me/${input.id}`, {
      name: input.name,
      amount: input.amount,
      date: input.date,
      type: input.type,
    })
    return response
  },
}
