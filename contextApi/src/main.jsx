import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { NotesProvider } from './context/NotesContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <NotesProvider>
    <App />
  </NotesProvider>,
)
