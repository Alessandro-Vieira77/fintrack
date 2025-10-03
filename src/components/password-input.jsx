import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function PasswordInput({ placeholder = 'Digite sua senha' }) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  return (
    <div className="relative">
      <Input type={passwordIsVisible ? 'text' : 'password'} placeholder={placeholder} />
      <Button
        onClick={() => setPasswordIsVisible(value => !value)}
        variant={'ghost'}
        className="absolute top-0 right-0 bottom-0 my-auto mr-2 h-8 w-8 leading-0"
      >
        {passwordIsVisible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  )
}

export default PasswordInput
