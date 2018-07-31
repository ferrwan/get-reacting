import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'

import userReducer from './user-reducer.js'
import App from './App.jsx'

const reducers = combineReducers({
  userReducer
})

const store = createStore(
  reducers,
  process.env.NODE_ENV !== 'production' && window.devToolsExtension && window.devToolsExtension()
)

const ReduxApp = () => (
  <Provider store={ store }>
    <App />
  </Provider>
);

export default ReduxApp;
