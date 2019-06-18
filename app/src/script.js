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

async function handleEvents({ event, returnValues }) {
  let nextState
  /*
    IMPORTANT: I'm refreshing all widgets here on every event (EVEN ON STARTUP EMPTY ONES), this is really underperformant. 
    Should be improved adding a return value with priority index to the smart contract events so we can update just the widget affected. 
  */
  switch (event) {
    case 'WidgetAdded':
      nextState = await refreshAllWidgets(appState)
      break
    case 'WidgetRemoved':
      nextState = await refreshAllWidgets(appState)
      break
    case 'WidgetUpdated':
      nextState = await refreshAllWidgets(appState)
      break
    case 'WidgetsReordered':
      nextState = await refreshAllWidgets(appState)
      break
    default:
      nextState = await refreshAllWidgets(appState)
      console.log('[Widgets script] unknown event', event, returnValues)
  }

  // purify the resulting state to handle duplication edge cases
  //const filteredState = { entries: filterEntries(nextState.entries) }
  app.cache('state', nextState)
}

const refreshAllWidgets = async ({ entries = [] }) => {
  return new Promise(async resolve => {
    // Clear all entries
    entries = []
    var mainWidget = await app
      .call('getWidget', '0x' + keccak256('MAIN_WIDGET'))
      .pipe(first())
      .toPromise()
    if (mainWidget.addr) {
      mainWidget.content = await loadWidgetIpfs(mainWidget.addr)
      entries.push(mainWidget)
    } else {
      entries.push({
        addr: '',
        content: '',
        disabled: false,
      })
    }

    var sideWidget = await app
      .call('getWidget', '0x' + keccak256('SIDE_WIDGET'))
      .pipe(first())
      .toPromise()
    if (sideWidget.addr) {
      sideWidget.content = await loadWidgetIpfs(sideWidget.addr)
      entries.push(sideWidget)
    } else {
      entries.push({
        addr: '',
        content: '',
        disabled: false,
      })
    }

    const state = { entries } // return the entries array
    resolve(state)
  })
}

/***********************
 *                     *
 *       Helpers       *
 *                     *
 ***********************/

const loadWidgetData = async priority => {
  return new Promise((resolve, reject) => {
    app.call('getWidget', priority).subscribe(
      widget => {
        if (!widget) {
          reject(new Error('getWidget failed'))
        } else {
          resolve({
            addr: widget[0],
            content: 'Loading',
            disabled: widget[1],
            loading: true,
          })
        }
      },
      err => {
        reject(err)
      }
    )
  })
}

const loadWidgetIpfs = async ipfsAddr => {
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

const filterEntries = entries => {
  const filteredEntries = entries.filter(entry => entry && !!entry.addr)
  return filteredEntries
}
