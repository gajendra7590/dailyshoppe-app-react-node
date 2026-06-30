import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { store } from "./redux/store";
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CartProvider>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>
      </CartProvider>
    </Provider>
  </StrictMode>,
)
