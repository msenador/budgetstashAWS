import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme';
import { UserProvider } from './context/UserContext';
import { SpinnerModalProvider } from './context/SpinnerModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SpinnerModalProvider>
          <ThemeProvider theme={theme}>
            {console.log(theme)}
            <App />
          </ThemeProvider>
        </SpinnerModalProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
