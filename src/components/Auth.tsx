import { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true)

  const toggleMode = (): void => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {isLogin ? (
          <LoginForm onToggleMode={toggleMode} />
        ) : (
          <SignupForm onToggleMode={toggleMode} />
        )}
      </div>
    </div>
  )
} 