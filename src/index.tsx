import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './AuthContext';

ReactDOM.render(
  <AuthContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContext>,
  document.getElementById('root')
);
