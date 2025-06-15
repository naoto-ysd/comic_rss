import { AuthProvider, useAuth } from './contexts/AuthContext'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import './App.css'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">読み込み中...</div>
      </div>
    )
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
