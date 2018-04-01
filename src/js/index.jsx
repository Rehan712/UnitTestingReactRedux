import ReactDOM from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import debounce from 'redux-debounced';

import App from './components/App';
import rootReducer from './reducers';

// const store = createStore(rootReducer, applyMiddleware(reduxPromise, logger));
const store = createStore(
  rootReducer,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(debounce(), reduxThunk, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);

// In terms of Redux customization there are two approaches
// Approach 1 use raw middleware functionality without library
// have to do a lot more plumbing.

// Approach 2
// Use customizable middleware using a library like
// redux thunk
// redux observable
// redux saga
