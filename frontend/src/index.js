import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import GlobalStyles from '~/components/GlobalStyles';
import { AuthProvider } from '~/context/AuthProvider';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import './i18n';

if (process.env.REACT_APP_NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </AuthProvider>
  </React.StrictMode>,
);

reportWebVitals();
