import React, { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import OTAUploader from './components/OTAUploader'
import AdminLogin from './components/AdminLogin'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import './App.css'

function AppContent() {
  const { user, isAuthenticated, signOut, loading } = useAuth()
  const [activeView, setActiveView] = useState('home')
  const [authView, setAuthView] = useState('signin') // 'signin' or 'signup'

  const handleLogout = async () => {
    await signOut()
    setActiveView('home')
  }

  // Show auth pages if not authenticated
  if (!isAuthenticated && (activeView !== 'home' && activeView !== 'upload' && activeView !== 'admin')) {
    return (
      <>
        {authView === 'signin' && (
          <SignIn onSwitchToSignUp={() => setAuthView('signup')} />
        )}
        {authView === 'signup' && (
          <SignUp onSwitchToSignIn={() => setAuthView('signin')} />
        )}
      </>
    )
  }

  return (
    <div className="app-container">
      {/* Transparent Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-logo" onClick={() => setActiveView('home')}>
            <h1 style={{ cursor: 'pointer' }}>🚀 Compademic OTA</h1>
          </div>
          <div className="navbar-links">
            <button
              onClick={() => setActiveView('upload')}
              className={`nav-button ${activeView === 'upload' ? 'active' : ''}`}
            >
              📤 Upload Firmware
            </button>
            <button
              onClick={() => setActiveView('admin')}
              className={`nav-button ${activeView === 'admin' ? 'active' : ''}`}
            >
              🔒 Admin Panel
            </button>
          </div>
          <div className="navbar-auth">
            {isAuthenticated ? (
              <>
                <span className="user-email">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="auth-button logout-btn"
                  disabled={loading}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAuthView('signin')}
                  className="auth-button sign-in"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthView('signup')}
                  className="auth-button sign-up"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        {activeView === 'upload' && <OTAUploader />}
        {activeView === 'admin' && <AdminLogin />}
        {activeView === 'home' && (
          <div className="home-section">
            <div className="home-content">
              <h2>Welcome to Compademic OTA</h2>
              <p>Enterprise Firmware Update Management System</p>
              {!isAuthenticated ? (
                <div className="home-buttons">
                  <button
                    onClick={() => {
                      setAuthView('signin')
                    }}
                    className="home-button upload-btn"
                  >
                    🔑 Sign In
                  </button>
                  <button
                    onClick={() => {
                      setAuthView('signup')
                    }}
                    className="home-button admin-btn"
                  >
                    🎉 Sign Up
                  </button>
                </div>
              ) : (
                <div className="home-buttons">
                  <button
                    onClick={() => setActiveView('upload')}
                    className="home-button upload-btn"
                  >
                    📤 Upload Firmware
                  </button>
                  <button
                    onClick={() => setActiveView('admin')}
                    className="home-button admin-btn"
                  >
                    🔒 Admin Panel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 Compademic. All rights reserved.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
