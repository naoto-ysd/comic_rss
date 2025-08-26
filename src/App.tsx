import { AuthProvider, useAuth } from './contexts/AuthContext'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import ResetPassword from './components/ResetPassword'
import './App.css'

function AppContent() {
  const { user, loading } = useAuth()
  
  // URLパスをチェックしてパスワードリセットページかどうか判定
  const isResetPasswordPage = window.location.pathname === '/reset-password' || 
                              window.location.search.includes('access_token')

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">読み込み中...</div>
      </div>
    )
  }

  // パスワードリセットページの場合
  if (isResetPasswordPage) {
    return <ResetPassword />
  }

  return user ? <Dashboard /> : <Auth />
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  )
}

export default App
