import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AuthCard from '../components/AuthCard'
import AuthInput from '../components/AuthInput'
import './Auth.css'

export default function SignUp({ onSwitchToSignIn }) {
  const { signUp } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const validateForm = () => {
    const newErrors = {}
    
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    
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

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setMessage('')

    const result = await signUp(email, password, fullName)
    
    if (result.success) {
      setMessage({ 
        type: 'success', 
        text: '✅ Account created! Please check your email to verify your account.' 
      })
      // Reset form
      setFullName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      
      // Allow user to sign in after verification
      setTimeout(() => onSwitchToSignIn(), 2000)
    } else {
      setMessage({ type: 'error', text: `❌ ${result.error}` })
    }

    setLoading(false)
  }

  return (
    <div className="auth-container">
      <AuthCard
        title="🚀 Sign Up"
        subtitle="Join Compademic OTA Dashboard"
      >
        {message && (
          <div className={`auth-message message-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <AuthInput
            label="Full Name"
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value)
              setErrors({ ...errors, fullName: '' })
            }}
            error={errors.fullName}
            required
            disabled={loading}
          />

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
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setErrors({ ...errors, password: '' })
            }}
            error={errors.password}
            required
            disabled={loading}
          />

          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setErrors({ ...errors, confirmPassword: '' })
            }}
            error={errors.confirmPassword}
            required
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading ? '⏳ Creating account...' : '🎉 Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="switch-link"
            disabled={loading}
          >
            Sign In
          </button>
        </div>
      </AuthCard>
    </div>
  )
}
