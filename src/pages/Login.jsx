import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { UseAuthContext } from '../context/auth'

const loginSchema = zod.object({
  email: zod.string().trim().email({
    message: 'o campo e-mail é inválido',
  }),
  password: zod.string().trim().min(6, {
    message: 'a senha deve ter no mínimo 6 caracteres',
  }),
})

function Login() {
  const { login, user, initialization } = UseAuthContext()

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data) {
    login(data)
  }

  if (initialization) {
    return null
  }

  if (user) {
    return (
      <h1>
        Olá {user?.firstName} {user?.lastName}
      </h1>
    )
  }

  return (
    <div className="flex min-h-screen max-w-screen flex-col items-center justify-center gap-4">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full max-w-[500px] px-4">
          <Card className="w-full max-w-[500px]">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Entre na sua conta</CardTitle>
              <CardDescription>Insira seus dados abaixo.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Digite sua senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full cursor-pointer" type="submit">
                Entrar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="mb-6 flex max-w-[500px] items-center justify-center gap-1">
        <p className="text-muted-foreground opacity-50">Ainda não possui uma conta? </p>
        <Button variant="link" className="p-0" asChild>
          <Link to={'/signup'} className="text-primary">
            Crie agora
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Login
