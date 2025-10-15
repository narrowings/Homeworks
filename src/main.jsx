import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import { Registro } from './register'
import { store } from './store'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <Provider store={store}>
       <Registro />
      </Provider>
     </BrowserRouter>
  </StrictMode>,
)
