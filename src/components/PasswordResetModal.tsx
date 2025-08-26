import { useState, FormEvent } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface PasswordResetModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PasswordResetModal({ isOpen, onClose }: PasswordResetModalProps) {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')

  const { resetPassword } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) {
      setError('メールアドレスを入力してください')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    const { error } = await resetPassword(email)

    if (error) {
      setError('パスワードリセットに失敗しました: ' + error.message)
    } else {
      setMessage('パスワードリセット用のメールを送信しました。メールボックスをご確認ください。')
      setEmail('')
    }

    setLoading(false)
  }

  const handleClose = () => {
    setEmail('')
    setError('')
    setMessage('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>パスワードをリセット</h3>
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reset-email">メールアドレス</label>
            <input
              type="email"
              id="reset-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@example.com"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <div className="modal-actions">
            <button
              type="button"
              className="auth-button secondary"
              onClick={handleClose}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? '送信中...' : 'リセットメールを送信'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
