import React from 'react'
import ReactDOM from 'react-dom'
import { AragonApi } from './api-react'
import App from './App'

ReactDOM.render(
  <AragonApi reducer={state => state}>
    <App />
  </AragonApi>,
  document.getElementById('root')
)
