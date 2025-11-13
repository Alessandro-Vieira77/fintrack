import { Loader2Icon } from 'lucide-react'
import { Link } from 'react-router'
import { Navigate } from 'react-router'

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
import { useSignInForm } from '@/form/hooks/signIn'

import { UseAuthContext } from '../context/auth'

function Login() {
  const { user, login, pendingLogin, initialization } = UseAuthContext()

  const { form } = useSignInForm()
  function onSubmit(data) {
    login(data)
  }

  if (initialization) {
    return null
  }

  if (user) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="flex min-h-screen max-w-screen flex-col items-center justify-center gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[500px] px-4">
          <Card className="w-full max-w-[500px]">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Entre na sua conta</CardTitle>
              <CardDescription>Insira seus dados abaixo.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <FormField
                control={form.control}
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
                control={form.control}
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
              <Button className="w-full cursor-pointer" disabled={pendingLogin} type="submit">
                {pendingLogin && <Loader2Icon className="animate-spin" />}
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
