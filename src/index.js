import './index.css';
import '@fontsource/inter';
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './components/App/App';
import { addAuthorizationInterceptor } from './components/User/User';
import reportWebVitals from './reportWebVitals';
import { BASE_URL } from './services/config';

axios.defaults.baseURL = BASE_URL;
axios.interceptors.request.use(addAuthorizationInterceptor);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
