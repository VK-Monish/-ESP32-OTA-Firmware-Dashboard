import React, { useState } from 'react'

export default function AuthInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false)

  const isPasswordField = type === 'password'
  const inputType = isPasswordField && showPassword ? 'text' : type

  return (
    <div className="auth-form-group">
      {label && (
        <label className="auth-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="auth-input-wrapper">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`auth-input ${error ? 'error' : ''}`}
        />
        {isPasswordField && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex="-1"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}
