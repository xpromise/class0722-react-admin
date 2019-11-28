import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import ConfigProvider from './containers/config-provider'
import store from './redux/store';
import './i18n';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </Provider>, document.getElementById('root'));
