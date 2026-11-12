import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/fixflow.css';

/**
 * Application entry point.
 * Mounts the root React `<App />` component inside `<div id="root">` in light mode.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
