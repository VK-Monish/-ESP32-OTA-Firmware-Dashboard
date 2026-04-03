import React from 'react'

export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="auth-card">
      <div className="auth-card-content">
        <div className="auth-header">
          <h2 className="auth-title">{title}</h2>
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        </div>
        <div className="auth-body">
          {children}
        </div>
      </div>
    </div>
  )
}
