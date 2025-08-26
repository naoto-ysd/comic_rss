import { useState, FormEvent } from 'react'
import { useAuth } from '../contexts/AuthContext'
import PasswordResetModal from './PasswordResetModal'

interface LoginFormProps {
  onToggleMode: () => void
}

export default function LoginForm({ onToggleMode }: LoginFormProps) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [showResetModal, setShowResetModal] = useState<boolean>(false)

  const { signIn } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await signIn(email, password)

    if (error) {
      setError('ログインに失敗しました: ' + error.message)
    }

    setLoading(false)
  }

  return (
    <div className="auth-form">
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className="auth-button"
          disabled={loading}
        >
          {loading ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>

      <div className="auth-links">
        <button 
          type="button" 
          onClick={() => setShowResetModal(true)} 
          className="link-button"
        >
          パスワードを忘れた方はこちら
        </button>
      </div>

      <p className="auth-switch">
        アカウントをお持ちでない方は{' '}
        <button type="button" onClick={onToggleMode} className="link-button">
          新規登録
        </button>
      </p>

      <PasswordResetModal 
        isOpen={showResetModal} 
        onClose={() => setShowResetModal(false)} 
      />
    </div>
  )
} 