import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { ScrollTop } from '/src/components/ScrollTop.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/MovieExplorer">
    <ScrollTop />
    <App />
  </BrowserRouter>

)
