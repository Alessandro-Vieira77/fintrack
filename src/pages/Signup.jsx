import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

function Signup() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <Card className="w-[500px]">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl">Entre na sua conta</CardTitle>
          <CardDescription>Insira seus dados abaixo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu e-mail" />
          <Input type="password" placeholder="Digite sua senha" />
        </CardContent>
        <CardFooter>
          <Button className="w-full">Fazer login</Button>
        </CardFooter>
      </Card>
      <div className="flex items-center gap-1">
        <p className="opacity-50">Ainda não possui uma conta? </p>
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
