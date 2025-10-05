import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const PasswordInput = forwardRef(({ placeholder = 'Digite sua senha', ...props }, ref) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  return (
    <div className="relative">
      <Input
        type={passwordIsVisible ? 'text' : 'password'}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        onClick={() => setPasswordIsVisible(value => !value)}
        variant={'ghost'}
        className="absolute top-0 right-0 bottom-0 my-auto mr-2 h-8 w-8 leading-0"
      >
        {passwordIsVisible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
