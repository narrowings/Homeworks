import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FirstApp from './firtsApp.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirstApp value={0}/>
  </StrictMode>,
)
