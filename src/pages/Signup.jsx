import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import * as zod from 'zod'

import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'

const signupSchema = zod.object({
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

function Signup() {
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

  const method = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  function onSubmit(data) {
    console.log(data)
    signupMutation(data, {
      onSuccess: createdUser => {
        toast.success('Conta criada com sucesso!')
        const accessToken = createdUser.tokens.accessToken
        const refreshToken = createdUser.tokens.refreshToken
        setUser(createdUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
      },
      onError: () => {
        toast.error('Erro ao criar conta. Tente novamente.')
      },
    })
  }

  if (user) {
    return <h1>olá {user.first_name}</h1>
  }

  return (
    <div className="flex min-h-screen max-w-screen flex-col items-center justify-center gap-4">
      <Form {...method}>
        <form onSubmit={method.handleSubmit(onSubmit)} className="px-4">
          <Card className="mt-10 w-full max-w-[500px]">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Crie sua conta</CardTitle>
              <CardDescription>Insira seus dados abaixo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={method.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primeiro nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu primeiro nome" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={method.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={method.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={method.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={method.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Confirme sua senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={method.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <label className="flex gap-2" htmlFor="terms">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="terms"
                          name="terms"
                          className="border-primary-green border-2"
                        />
                        <div className="text-xs">
                          <span
                            className={`text-muted-foreground opacity-50 ${method.formState.errors.terms && 'font-bold text-red-500'}`}
                          >
                            Ao clicar em “Criar conta”, você aceita{' '}
                          </span>
                          <a
                            href="#"
                            className={`underline ${method.formState.errors.terms ? 'font-bold text-red-500' : 'font-bold text-white'} `}
                          >
                            nosso termo de uso e política de privacidade
                          </a>
                        </div>
                      </label>
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Criar conta
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="mb-6 flex w-[500px] items-center justify-center gap-1">
        <p className="text-muted-foreground opacity-50">Ainda não possui uma conta? </p>
        <Button variant="link" className="p-0" asChild>
          <Link to={'/login'} className="text-primary">
            Faça login
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Signup
