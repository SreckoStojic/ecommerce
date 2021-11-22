import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import allReducers from './reducers/index';
import { Provider } from 'react-redux';
import  i18n  from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './localization/resources';

i18n
  .use(initReactI18next)
  .init({
    resources : resources,
    lng: localStorage.getItem('lang'),
    fallbackLng: ['en', 'srb'],
    interpolation: {
      escapeValue: false
    }
  });

const store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));