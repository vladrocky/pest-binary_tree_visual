import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.scss';
import App, { InitGraph, Inputs } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <InitGraph />
    <App />
  </React.StrictMode>
);
