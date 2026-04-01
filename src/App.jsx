import React, { useState, useEffect } from 'react'
import OTAUploader from './components/OTAUploader'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>🚀 ESP32 OTA Firmware Dashboard</h1>
        <p>Upload firmware updates to your ESP32 devices</p>
      </header>
      <main className="main-content">
        <OTAUploader />
      </main>
    </div>
  )
}

export default App
