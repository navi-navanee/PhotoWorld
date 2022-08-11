import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import {ThemeProvider } from '@mui/material'
import App from './App';
import './index.css';
import theme from './theme';
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  <React.StrictMode>
     <ErrorBoundary>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
       <App />
      </ThemeProvider>
    </Provider>
     </ErrorBoundary>
  </React.StrictMode>
);
