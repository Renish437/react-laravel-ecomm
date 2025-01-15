import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AdminAuthProvider } from './components/context/AdminAuth.jsx'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
 
<AdminAuthProvider>
<App />
</AdminAuthProvider>
  
    
  </StrictMode>,
)
