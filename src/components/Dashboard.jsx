import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Comic RSS</h1>
        <div className="user-info">
          <span>こんにちは、{user?.email}さん</span>
          <button onClick={handleSignOut} className="signout-button">
            ログアウト
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="welcome-section">
          <h2>ダッシュボード</h2>
          <p>Comic RSSにログインしました！</p>
          <p>ここに今後、コミックのRSS機能を追加していきます。</p>
        </div>
      </main>
    </div>
  )
} 