import { useState, FormEvent } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface SignupFormProps {
  onToggleMode: () => void
}

export default function SignupForm({ onToggleMode }: SignupFormProps) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const { signUp } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !password || !confirmPassword) {
      setError('すべての項目を入力してください')
      return
    }

    if (password !== confirmPassword) {
      setError('パスワードが一致しません')
      return
    }

    if (password.length < 6) {
      setError('パスワードは6文字以上で入力してください')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    const { error } = await signUp(email, password)

    if (error) {
      setError('新規登録に失敗しました: ' + error.message)
    } else {
      setMessage('確認メールを送信しました。メールをご確認ください。')
    }

    setLoading(false)
  }

  return (
    <div className="auth-form">
      <h2>新規登録</h2>
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

        <div className="form-group">
          <label htmlFor="confirmPassword">パスワード（確認）</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <button
          type="submit"
          className="auth-button"
          disabled={loading}
        >
          {loading ? '登録中...' : '新規登録'}
        </button>
      </form>

      <p className="auth-switch">
        すでにアカウントをお持ちの方は{' '}
        <button type="button" onClick={onToggleMode} className="link-button">
          ログイン
        </button>
      </p>
    </div>
  )
} 