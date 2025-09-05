import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'

const Root = () => (
  <div>
    <p>AHOJ</p> {/* Text, který se zobrazí nad aplikací */}
    <App />
  </div>
)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
)
