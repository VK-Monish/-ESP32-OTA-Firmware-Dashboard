import React, { useState } from 'react'
import AdminPanel from './AdminPanel'
import './AdminLogin.css'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const ADMIN_PASSWORD = 'moni'

  const handleLogin = (e) => {
    e.preventDefault()
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
      setPassword('')
    } else {
      setError('❌ Invalid password. Try again.')
      setPassword('')
      setShowPassword(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
    setError('')
  }

  if (isAuthenticated) {
    return (
      <div>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
        <AdminPanel />
      </div>
    )
  }

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>🔐 Admin Access</h2>
          <p>Enter password to access Compademic OTA Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="password-input" className="label">
              Admin Password
            </label>
            <div className="password-input-wrapper">
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="password-input"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-login">
            🔓 Unlock Admin Panel
          </button>
        </form>

        <div className="login-info">
          <p className="info-title">ℹ️ Compademic OTA Dashboard</p>
          <p className="info-text">This is the firmware management area for authorized administrators only.</p>
        </div>
      </div>

      <div className="security-notice">
        <p>🛡️ All admin actions are logged and monitored</p>
      </div>
    </div>
  )
}
