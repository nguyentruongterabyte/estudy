import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';

import GlobalStyles from '~/components/GlobalStyles';
import { AuthProvider } from '~/context/AuthProvider';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import './i18n';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './redux/store';

if (process.env.REACT_APP_NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
