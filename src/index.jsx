import { App } from './App'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import { store } from './_helpers'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
