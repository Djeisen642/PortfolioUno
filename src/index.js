require('./scss/main.scss');
import React from 'react';
import { render } from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import App from './components/App.js';
// import reducer from './reducers';

// const store = createStore(reducer);

render(
  <App />,
  document.getElementById('entry')
);
