import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import './OTAUploader.css'

export default function OTAUploader() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [version, setVersion] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [lastVersion, setLastVersion] = useState(null)
  const [fileInputKey, setFileInputKey] = useState(0)

  // Load last uploaded version on component mount
  useEffect(() => {
    loadLastVersion()
  }, [])

  // Auto-clear messages after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const loadLastVersion = async () => {
    try {
      const { data, error } = await supabase
        .from(import.meta.env.VITE_SUPABASE_TABLE)
        .select('version, created_at')
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) {
        console.error('Error loading last version:', error)
        return
      }

      if (data && data.length > 0) {
        setLastVersion(data[0])
      }
    } catch (err) {
      console.error('Failed to load last version:', err)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    
    if (!file) {
      setSelectedFile(null)
      return
    }

    // Validate file type
    if (!file.name.endsWith('.bin')) {
      setMessage({
        type: 'error',
        text: '❌ Only .bin files are allowed'
      })
      setSelectedFile(null)
      setFileInputKey(prev => prev + 1) // Reset file input
      return
    }

    setSelectedFile(file)
    setMessage({ type: '', text: '' })
  }

  const handleUpload = async () => {
    // Validation
    if (!selectedFile) {
      setMessage({ type: 'error', text: '❌ Please select a .bin file' })
      return
    }

    if (!version.trim()) {
      setMessage({ type: 'error', text: '❌ Please enter a version number' })
      return
    }

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      // Generate unique filename with timestamp
      const timestamp = Date.now()
      const filename = `${timestamp}-${selectedFile.name}`

      // Step 1: Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from(import.meta.env.VITE_SUPABASE_BUCKET)
        .upload(filename, selectedFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message}`)
      }

      // Step 2: Get public URL
      const { data: publicURLData } = supabase
        .storage
        .from(import.meta.env.VITE_SUPABASE_BUCKET)
        .getPublicUrl(filename)

      const fileUrl = publicURLData?.publicUrl

      if (!fileUrl) {
        throw new Error('Failed to generate public URL')
      }

      // Step 3: Insert record into database
      const { data: dbData, error: dbError } = await supabase
        .from(import.meta.env.VITE_SUPABASE_TABLE)
        .insert([
          {
            version: version.trim(),
            up_file: fileUrl
          }
        ])
        .select()

      if (dbError) {
        // Try to delete uploaded file if database insert fails
        await supabase
          .storage
          .from(import.meta.env.VITE_SUPABASE_BUCKET)
          .remove([filename])
        
        throw new Error(`Database insert failed: ${dbError.message}`)
      }

      // Success!
      setMessage({
        type: 'success',
        text: `✅ Firmware v${version.trim()} uploaded successfully!`
      })

      // Clear inputs and refresh last version
      setSelectedFile(null)
      setVersion('')
      setFileInputKey(prev => prev + 1)
      await loadLastVersion()

    } catch (err) {
      console.error('Upload error:', err)
      setMessage({
        type: 'error',
        text: `❌ ${err.message || 'Upload failed. Please try again.'}`
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClearInputs = () => {
    setSelectedFile(null)
    setVersion('')
    setFileInputKey(prev => prev + 1)
    setMessage({ type: '', text: '' })
  }

  return (
    <div className="ota-uploader">
      <div className="upload-card">
        <h2 className="card-title">📤 Upload Firmware</h2>

        {/* File Input */}
        <div className="form-group">
          <label htmlFor="file-input" className="label">
            Firmware File (.bin)
          </label>
          <div className="file-input-wrapper">
            <input
              key={fileInputKey}
              id="file-input"
              type="file"
              accept=".bin"
              onChange={handleFileSelect}
              disabled={loading}
              className="file-input"
            />
            <span className="file-name">
              {selectedFile ? selectedFile.name : 'No file selected'}
            </span>
          </div>
        </div>

        {/* Version Input */}
        <div className="form-group">
          <label htmlFor="version-input" className="label">
            Version Number (e.g., 1.4, 2.0.1)
          </label>
          <input
            id="version-input"
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="Enter version"
            disabled={loading}
            className="version-input"
          />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button
            onClick={handleUpload}
            disabled={loading || !selectedFile || !version.trim()}
            className="btn btn-primary"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Uploading...
              </>
            ) : (
              '🚀 Upload Firmware'
            )}
          </button>
          <button
            onClick={handleClearInputs}
            disabled={loading}
            className="btn btn-secondary"
          >
            Clear
          </button>
        </div>

        {/* Status Message */}
        {message.text && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Last Version Info */}
        {lastVersion && (
          <div className="last-version">
            <p className="last-version-label">📌 Last Upload</p>
            <p className="last-version-number">Version {lastVersion.version}</p>
            <p className="last-version-date">
              {new Date(lastVersion.created_at).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
