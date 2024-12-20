import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route } from 'react-router'
import AppRoutes from './config/routes.jsx'
import { Toaster } from 'react-hot-toast'
import { ChatProvider } from './context/context.jsx'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter >
    <Toaster/>
     <ChatProvider>
     <AppRoutes/>
     </ChatProvider>
    </BrowserRouter>
  
)
