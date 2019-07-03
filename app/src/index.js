import React from 'react'
import ReactDOM from 'react-dom'
import { AragonApi } from '@aragon/api-react'
import App from './App'

const reducer = state => {
  if (state === null) {
    return {
      count: 0,
      syncing: true,
      entries: [
        {
          addr: '',
          content: '',
          loading: false,
          disabled: false,
        },
        {
          addr: '',
          content: '',
          loading: false,
          disabled: false,
        },
      ],
    }
  }
  return state
}

ReactDOM.render(
  <AragonApi reducer={reducer}>
    <App />
  </AragonApi>,
  document.getElementById('root')
)
