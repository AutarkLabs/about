import React from 'react'
import ReactDOM from 'react-dom'
import { AragonApi } from './api-react'
import App from './components/App'
import appStateReducer from './app-state-reducer'

ReactDOM.render(
  <AragonApi reducer={appStateReducer}>
    <App />
  </AragonApi>,
  document.getElementById('root')
)
