import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configuredStore from './redux/configuredStore';
import App from './components/app/App';

ReactDOM.render(
  <Provider store={configuredStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
