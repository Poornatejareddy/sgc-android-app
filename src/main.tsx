import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { SplashScreen } from '@capacitor/splash-screen';

// Hide splash screen once app is ready
SplashScreen.hide();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
