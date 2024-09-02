import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GlobalStateProvider } from './Context/GlobalStateContext';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="147724875465-jiafk5d61aob55n33c5fih1sj03vue2m.apps.googleusercontent.com">
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </GoogleOAuthProvider>
    
  </React.StrictMode>
);

