import '@babel/polyfill'
import Aragon from '@aragon/api'
import { first } from 'rxjs/operators'
import ipfsClient from 'ipfs-http-client'
import ipfsConfig from '../ipfs'
const keccak256 = require('js-sha3').keccak_256

const ipfs = ipfsClient(ipfsConfig)
const app = new Aragon()
let appState
app.events().subscribe(handleEvents)

app.state().subscribe(state => {
  appState = state || { entries: [] }
})

/***********************
 *                     *
 *   Event Handlers    *
 *                     *
 ***********************/

const initialWidgetState = {
  addr: '',
  content: '',
  loading: false,
  disabled: false,
}

async function handleEvents({ event, returnValues }) {
  let nextState = { ...appState }

  if (nextState.entries.length < 1) {
    nextState = initializeWidgets(nextState)
    app.cache('state', nextState)
  }
  switch (event) {
    case 'WidgetUpdated':
      if (Object.keys(returnValues).length === 0) {
        return
      }
      nextState = await refreshWidget(nextState, returnValues._priority)
      break
    default:
      console.log('[Widgets script] unknown event', event, returnValues)
  }
  app.cache('state', nextState)
}

const initializeWidgets = ({ entries = [] }) => {
  // Clear all entries
  entries = []

  for (let i = 0; i < 2; i++) {
    entries.push(initialWidgetState)
  }
  const state = { entries } // return the entries array
  return state
}

const refreshWidget = async ({ entries = [] }, _priority) => {
  return new Promise(async resolve => {
    // Clear all entries
    const i = _priority === '0x' + keccak256('MAIN_WIDGET') ? 0 : 1

    try {
      var widget = await app
        .call('getWidget', _priority)
        .pipe(first())
        .toPromise()
      if (widget && widget.addr) {
        widget.isLoading = true
        entries[i] = widget
      } else {
        entries[i] = initialWidgetState
      }
    } catch (err) {
      console.log(err)
      entries[i] = initialWidgetState
    }

    const state = { entries } // return the entries array

    if (entries[i].addr !== '') {
      // Wait so state is propagated into cache
      setTimeout(() => {
        loadWidgetIpfs(i, entries[i].addr)
          .then(_result => {
            let nextState = { ...appState }
            nextState.entries[i].isLoading = false
            nextState.entries[i].content = _result
            app.cache('state', nextState)
          })
          .catch(err => {
            let nextState = { ...appState }
            nextState.entries[i].isLoading = false
            nextState.entries[i].errorMessage = 'Error: ' + err
            app.cache('state', nextState)
          })
      }, 10)
    }
    resolve(state)
  })
}

/***********************
 *                     *
 *       Helpers       *
 *                     *
 ***********************/

const loadWidgetIpfs = async (i, ipfsAddr) => {
  return new Promise((resolve, reject) => {
    ipfs
      .cat(ipfsAddr)
      .then(_result => {
        resolve(_result.toString('utf8'))
      })
      .catch(err => {
        reject(err)
      })
  })
}
