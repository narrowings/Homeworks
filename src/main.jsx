import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Pagina from './pagina.jsx'
import './pagina.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pagina />
  </StrictMode>,
)
