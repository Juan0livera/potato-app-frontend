import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/dashboard.css';
import Rutas from './components/Rutas.jsx';
import ConfirmacionEliminar from './components/ConfirmacionEliminar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Rutas></Rutas>
      <ConfirmacionEliminar />
    </Provider>
  </StrictMode>,
)
