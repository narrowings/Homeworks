import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'   // ✅ AHORA sí usamos App
import { store } from './store'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />   {/* ✅ Cambiado, antes estaba <Registro /> */}
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
