import '@babel/polyfill'
import Aragon from '@aragon/api'
import { first } from 'rxjs/operators'
import { toUtf8 } from 'web3-utils'
import { ipfsGet } from './utils/ipfs/ipfs-helpers'

const app = new Aragon()
let appState

app.events().subscribe(handleEvents)

app.state().subscribe(state => {
  appState = state || { widgets: [] }
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
    appState.widgets == null ||
    appState.widgets.length < 1
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
    console.log('[Widgets script] unknown event', event, returnValues) // eslint-disable-line no-console
  }
}

const initializeWidgets = () => {
  // Clear all widgets
  let widgets = []

  for (let i = 0; i < 2; i++) {
    widgets.push(initialWidgetState)
  }
  const state = { widgets } // return the widgets array
  return state
}

const refreshWidget = async _priority => {
  // Clear all widgets
  const i = toUtf8(_priority) === 'PRIMARY_WIDGET' ? 0 : 1

  let widget = {
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
      if (widget.addr !== '') {
        // Set loading state
        let nextState2 = { ...appState }
        nextState2.widgets[i] = { ...widget }
        appState = nextState2
        await app.cache('state', { ...nextState2 })
        // NOTES: Without this delay, it fails randomly when refreshing whole page
        // setTimeout(async () => {
        try {
          const ipfsContent = await loadWidgetIpfs(i, widget.addr)
          widget.isLoading = false
          widget.content = ipfsContent
        } catch (err) {
          widget.isLoading = false
          widget.errorMessage = 'Error: ' + err
        }
        // Save final widget state
        let nextState = { ...appState }
        nextState.widgets[i] = { ...widget }
        appState = nextState
        await app.cache('state', { ...nextState })
        // }, 1000)
      }
    }
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
  }
}

/***********************
 *                     *
 *       Helpers       *
 *                     *
 ***********************/

const loadWidgetIpfs = async (i, ipfsAddr) => {
  return new Promise((resolve, reject) => {
    ipfsGet(ipfsAddr)
      .then(_result => {
        resolve(_result.toString('utf8'))
      })
      .catch(err => {
        reject(err)
      })
  })
}
