import z from 'zod'

export const createTransactionSchema = z.object({
  name: z
    .string({
      message: 'Nome é obrigatório',
    })
    .trim()
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  amount: z.number({
    message: 'Valor é obrigatório',
  }),
  date: z.date({
    message: 'Data é obrigatória',
  }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    message: 'Tipo é obrigatório',
  }),
})

export const EditTransactionSchema = createTransactionSchema.extend({
  id: z.string().uuid(),
})
