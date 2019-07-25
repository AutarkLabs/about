import '@babel/polyfill'
import Aragon from '@aragon/api'
import { first } from 'rxjs/operators'
import ipfsClient from 'ipfs-http-client'
import ipfsConfig from '../ipfs'
import { soliditySha3 } from 'web3-utils'

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
  if (
    appState == null ||
    appState.entries == null ||
    appState.entries.length < 1
  ) {
    const nextState = initializeWidgets()
    appState = nextState
    await app.cache('state', { ...nextState })
  }
  switch (event) {
    case 'WidgetUpdated':
      refreshWidget(returnValues._priority)
      break
    default:
      console.log('[Widgets script] unknown event', event, returnValues)
  }
}

const initializeWidgets = () => {
  // Clear all entries
  let entries = []

  for (let i = 0; i < 2; i++) {
    entries.push(initialWidgetState)
  }
  const state = { entries } // return the entries array
  return state
}

const refreshWidget = async _priority => {
  // Clear all entries
  const i = _priority === soliditySha3('MAIN_WIDGET') ? 0 : 1

  let entry = {
    addr: '',
    content: '',
    isLoading: true,
    disabled: false,
  }
  try {
    let widget = await app
      .call('getWidget', _priority)
      .pipe(first())
      .toPromise()
    if (widget && widget.addr) {
      widget.isLoading = true
      entry = widget
      if (entry.addr !== '') {
        // Set loading state
        let nextState2 = { ...appState }
        nextState2.entries[i] = { ...entry }
        appState = nextState2
        await app.cache('state', { ...nextState2 })
        // NOTES: Without this delay, it fails randomly when refreshing whole page
        // setTimeout(async () => {
        try {
          const ipfsContent = await loadWidgetIpfs(i, entry.addr)
          entry.isLoading = false
          entry.content = ipfsContent
        } catch (err) {
          entry.isLoading = false
          entry.errorMessage = 'Error: ' + err
        }
        // Save final entry state
        let nextState = { ...appState }
        nextState.entries[i] = { ...entry }
        appState = nextState
        await app.cache('state', { ...nextState })
        // }, 1000)
      }
    }
  } catch (err) {
    console.log(err)
  }
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
