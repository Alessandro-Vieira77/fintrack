import { Link } from 'react-router'

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
import { Input } from '@/components/ui/input'

function Signup() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <Card className="w-full max-w-[500px]">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl">Entre na sua conta</CardTitle>
          <CardDescription>Insira seus dados abaixo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu e-mail" />
          <PasswordInput />
          <PasswordInput placeholder="Confirme sua senha" />
          <label className="flex gap-2" htmlFor="terms">
            <Checkbox id="terms" className="border-primary-green border-2" />
            <div className="text-xs">
              <span className="text-muted-foreground opacity-50">
                Ao clicar em “Criar conta”, você aceita{' '}
              </span>
              <a href="#" className="text-white underline">
                nosso termo de uso e política de privacidade
              </a>
            </div>
          </label>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Fazer login</Button>
        </CardFooter>
      </Card>
      <div className="flex items-center gap-1">
        <p className="text-muted-foreground opacity-50">Ainda não possui uma conta? </p>
        <Button variant="link" asChild>
          <Link to={'/login'} className="text-primary">
            Crie uma aqui
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Signup
