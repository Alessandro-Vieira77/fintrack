import z from 'zod'

export const loginFormSchema = z.object({
  email: z.string().trim().email({
    message: 'o campo e-mail é inválido',
  }),
  password: z.string().trim().min(6, {
    message: 'a senha deve ter no mínimo 6 caracteres',
  }),
})
