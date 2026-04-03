import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import './AdminPanel.css'

export default function AdminPanel() {
  const [firmwares, setFirmwares] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [deleting, setDeleting] = useState(null)
  const [pushing, setPushing] = useState(null)

  // Load all firmware on mount
  useEffect(() => {
    loadFirmwares()
  }, [])

  // Auto-clear messages
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const loadFirmwares = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from(import.meta.env.VITE_SUPABASE_TABLE)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      setFirmwares(data || [])
      setMessage({ type: 'success', text: `✅ Loaded ${data?.length || 0} firmware(s)` })
    } catch (err) {
      console.error('Error loading firmware:', err)
      setMessage({ type: 'error', text: `❌ Failed to load firmware: ${err.message}` })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, version) => {
    if (!window.confirm(`Delete firmware version ${version}? This cannot be undone.`)) {
      return
    }

    setDeleting(id)
    try {
      const { error } = await supabase
        .from(import.meta.env.VITE_SUPABASE_TABLE)
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }

      // Remove from UI
      setFirmwares(prevFirmwares => prevFirmwares.filter(fw => fw.id !== id))
      setMessage({ type: 'success', text: `✅ Version ${version} deleted successfully` })
    } catch (err) {
      console.error('Delete error:', err)
      setMessage({ type: 'error', text: `❌ Failed to delete: ${err.message}` })
    } finally {
      setDeleting(null)
    }
  }

  const handlePushUpdate = async (id, version, currentStatus) => {
    const newStatus = !currentStatus
    setPushing(id)

    try {
      const { error } = await supabase
        .from(import.meta.env.VITE_SUPABASE_TABLE)
        .update({ push_update: newStatus })
        .eq('id', id)

      if (error) {
        throw error
      }

      // Update in UI
      setFirmwares(prevFirmwares =>
        prevFirmwares.map(fw =>
          fw.id === id ? { ...fw, push_update: newStatus } : fw
        )
      )

      const statusText = newStatus ? 'enabled' : 'disabled'
      setMessage({ type: 'success', text: `✅ Push update ${statusText} for version ${version}` })
    } catch (err) {
      console.error('Push update error:', err)
      setMessage({ type: 'error', text: `❌ Failed to toggle push: ${err.message}` })
    } finally {
      setPushing(null)
    }
  }

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
    setMessage({ type: 'success', text: '✅ URL copied to clipboard!' })
  }

  // Filter firmware
  const filteredFirmwares = firmwares.filter(fw =>
    fw.version.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort firmware by newest first
  const sortedFirmwares = [...filteredFirmwares].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at)
  })

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>�️ Compademic OTA Management</h2>
        <p>Centralized firmware update control and monitoring</p>
      </div>

      {/* Controls */}
      <div className="admin-controls">
        <button
          onClick={loadFirmwares}
          disabled={loading}
          className="btn-refresh"
        >
          {loading ? '🔄 Loading...' : '🔄 Refresh'}
        </button>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by version..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Status Message */}
      {message.text && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-value">{firmwares.length}</div>
          <div className="stat-label">Total Uploaded</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {firmwares.length > 0 ? firmwares[0].version : 'N/A'}
          </div>
          <div className="stat-label">Latest Version</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {firmwares.length > 0
              ? new Date(firmwares[0].created_at).toLocaleDateString()
              : 'N/A'}
          </div>
          <div className="stat-label">Last Upload</div>
        </div>
      </div>

      {/* Firmware List */}
      {loading && <div className="loading">Loading firmware list...</div>}

      {!loading && firmwares.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📭</p>
          <p className="empty-text">No firmware uploaded yet</p>
          <p className="empty-subtext">Start uploading firmware from the Upload tab</p>
        </div>
      ) : !loading && sortedFirmwares.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">🔍</p>
          <p className="empty-text">No firmware found</p>
          <p className="empty-subtext">Try a different search term</p>
        </div>
      ) : (
        <div className="firmware-list">
          {sortedFirmwares.map((firmware) => (
            <div key={firmware.id} className="firmware-item">
              <div className="firmware-header">
                <h3 className="firmware-version">📦 Version {firmware.version}</h3>
                <span className="firmware-id">#{firmware.id}</span>
              </div>

              <div className="firmware-details">
                <div className="detail-row">
                  <span className="detail-label">📅 Uploaded:</span>
                  <span className="detail-value">
                    {new Date(firmware.created_at).toLocaleString()}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">📎 File URL:</span>
                  <div className="url-box">
                    <input
                      type="text"
                      value={firmware.up_file}
                      readOnly
                      className="url-input"
                    />
                    <button
                      onClick={() => copyToClipboard(firmware.up_file)}
                      className="btn-copy"
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>

                <div className="detail-row">
                  <span className="detail-label">💾 File Size:</span>
                  <span className="detail-value">
                    {firmware.up_file.length > 50
                      ? firmware.up_file.substring(0, 50) + '...'
                      : firmware.up_file}
                  </span>
                </div>
              </div>

              <div className="firmware-actions">
                <a
                  href={firmware.up_file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-action btn-download"
                >
                  ⬇️ Download
                </a>
                <button
                  onClick={() => copyToClipboard(firmware.up_file)}
                  className="btn-action btn-copy-url"
                >
                  🔗 Copy URL
                </button>
                <button
                  onClick={() => handlePushUpdate(firmware.id, firmware.version, firmware.push_update)}
                  disabled={pushing === firmware.id || firmware.push_update}
                  className={`btn-action ${firmware.push_update ? 'btn-push-enabled' : 'btn-push'}`}
                  title={firmware.push_update ? 'Push enabled - waiting for deployment' : 'Enable push update'}
                >
                  {pushing === firmware.id ? '⏳ Updating...' : firmware.push_update ? '📡 Push ON' : '📡 Push OFF'}
                </button>
                <button
                  onClick={() => handleDelete(firmware.id, firmware.version)}
                  disabled={deleting === firmware.id}
                  className="btn-action btn-delete"
                >
                  {deleting === firmware.id ? '⏳ Deleting...' : '🗑️ Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {!loading && firmwares.length > 0 && (
        <div className="admin-summary">
          <p>
            📊 Showing <strong>{sortedFirmwares.length}</strong> of{' '}
            <strong>{firmwares.length}</strong> firmware versions
          </p>
        </div>
      )}
    </div>
  )
}
