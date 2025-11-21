import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import * as Sentry from "@sentry/react"

// --- SENTRY INIT ---
Sentry.init({
  dsn: "https://5f9f1839e41d038b460dd823f8299b8c@o4510402935193600.ingest.de.sentry.io/4510402936635472",
  sendDefaultPii: true,
  // Environment så man kan se om fejl kommer fra local/dev/prod
  environment: import.meta.env.MODE,
})
// ------------------------

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
