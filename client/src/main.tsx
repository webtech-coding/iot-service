import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route } from 'react-router'
import { Routes } from 'react-router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/new' element={<div>this is it</div>} />
      </Routes>
    </BrowserRouter>    
  </StrictMode>
)
