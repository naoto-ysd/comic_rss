import { useState, useEffect, FormEvent } from 'react'

export default function ResetPassword() {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    // URLパラメータからaccess_tokenとrefresh_tokenを取得
    const urlParams = new URLSearchParams(window.location.search)
    const accessToken = urlParams.get('access_token')
    const refreshToken = urlParams.get('refresh_token')

    if (accessToken && refreshToken) {
      // Supabaseのセッションを設定
      const { supabase } = require('../lib/supabase')
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      })
    }
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      setError('すべてのフィールドを入力してください')
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

    try {
      const { supabase } = require('../lib/supabase')
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        setError('パスワードの更新に失敗しました: ' + error.message)
      } else {
        setMessage('パスワードが正常に更新されました。')
        setPassword('')
        setConfirmPassword('')
        // 数秒後にログイン画面にリダイレクト
        setTimeout(() => {
          window.location.href = '/'
        }, 3000)
      }
    } catch (error) {
      setError('予期しないエラーが発生しました')
    }

    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>新しいパスワードを設定</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">新しいパスワード</label>
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
            <label htmlFor="confirmPassword">パスワード確認</label>
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
            {loading ? '更新中...' : 'パスワードを更新'}
          </button>
        </form>
      </div>
    </div>
  )
}
