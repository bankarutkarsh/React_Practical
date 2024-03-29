import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Route from './Components/Route';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Route/>
  </React.StrictMode>
);

reportWebVitals();
