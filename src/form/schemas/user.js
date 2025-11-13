import z from 'zod'

export const loginFormSchema = z.object({
  email: z.string().trim().email({
    message: 'o campo e-mail é inválido',
  }),
  password: z.string().trim().min(6, {
    message: 'a senha deve ter no mínimo 6 caracteres',
  }),
})

import zod from 'zod'

export const signupSchemaForm = zod
  .object({
    firstName: zod.string().trim().min(1, {
      message: 'o campo nome é obrigatório',
    }),
    lastName: zod.string().trim().min(1, {
      message: 'o campo sobrenome é obrigatório',
    }),
    email: zod
      .string()
      .trim()
      .min(1, {
        message: 'o campo e-mail é obrigatório',
      })
      .email({
        message: 'o campo e-mail é inválido',
      }),
    password: zod.string().trim().min(6, {
      message: 'a senha deve ter no mínimo 6 caracteres',
    }),
    confirmPassword: zod.string().trim().min(6, {
      message: 'a confirmação de senha deve ter no mínimo 6 caracteres',
    }),
    terms: zod.boolean().refine(value => value === true, {
      message: 'você deve aceitar nossos termos e condições',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'as senhas não coincidem',
    path: ['confirmPassword'],
  })
