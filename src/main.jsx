import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Note: React.StrictMode is intentionally NOT used here. The page scripts
// (ported from the original vanilla-JS site) are imperative and not
// idempotent (e.g. they create Chart.js instances on mount) — StrictMode's
// double-invoke-effects-in-dev behavior would break them.
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
