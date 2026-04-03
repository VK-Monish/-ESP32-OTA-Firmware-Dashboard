import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AuthCard from '../components/AuthCard'
import AuthInput from '../components/AuthInput'
import './Auth.css'

export default function SignIn({ onSwitchToSignUp }) {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const validateForm = () => {
    const newErrors = {}
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setMessage('')

    const result = await signIn(email, password)
    
    if (result.success) {
      setMessage({ type: 'success', text: '✅ Sign in successful! Redirecting...' })
      // Redirect will happen automatically through App component
      setTimeout(() => window.location.href = '/upload', 1500)
    } else {
      setMessage({ type: 'error', text: `❌ ${result.error}` })
    }

    setLoading(false)
  }

  return (
    <div className="auth-container">
      <AuthCard
        title="🔑 Sign In"
        subtitle="Access your Compademic OTA Dashboard"
      >
        {message && (
          <div className={`auth-message message-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors({ ...errors, email: '' })
            }}
            error={errors.email}
            required
            disabled={loading}
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setErrors({ ...errors, password: '' })
            }}
            error={errors.password}
            required
            disabled={loading}
          />

          <div className="auth-checkbox">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loading}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <a href="#" className="forgot-password">
            Forgot Password?
          </a>

          <button
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading ? '⏳ Signing in...' : '🔓 Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="switch-link"
            disabled={loading}
          >
            Sign Up
          </button>
        </div>
      </AuthCard>
    </div>
  )
}
