import { Avatar } from '@radix-ui/react-avatar'
import { ChevronDownIcon, LogOutIcon } from 'lucide-react'

import { UseAuthContext } from '@/context/auth'
import logo from '@/images/logo.svg'

import { AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default function Header() {
  const { user, signOut } = UseAuthContext()
  return (
    <Card className="rounded-none">
      <CardContent className="flex items-center justify-between px-8 py-4">
        <div>
          <img src={logo} alt="fintrack" />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="space-x-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage className="rounded-full" src={'https://github.com/shadcn.png'} />
                  <AvatarFallback>
                    {user?.firstName[0]} {user?.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">
                  {user?.firstName} {user?.lastName}
                </p>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  onClick={signOut}
                  variant="ghost"
                  size="small"
                  className="w-full justify-start"
                >
                  <LogOutIcon />
                  Sair
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
