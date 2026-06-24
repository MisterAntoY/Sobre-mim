import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App'
import { registerServiceWorker } from '@/lib/registerSW'
import { initNative, isNative } from '@/lib/native'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (isNative()) {
  initNative()
} else {
  registerServiceWorker()
}
