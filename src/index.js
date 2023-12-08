import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import common_ar from "./Translation/ar/common.json";
import common_en from "./Translation/en/common.json";

const root = ReactDOM.createRoot(document.getElementById('root'));
i18next.init({
  interpolation: { escapeValue: false },  
  lng: 'en',                              // language to use
  resources: {
      ar: {
          common: common_ar               // 'common' is our custom namespace
      },
      en: {
          common: common_en
      }
    
  },
}); 
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
    
);
