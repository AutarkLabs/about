import '@babel/polyfill'
import Aragon from '@aragon/client'
import 'rxjs/add/observable/of'
import { first } from 'rxjs/operators'

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
  const filteredState = { entries: filterEntries(nextState.entries) }
  app.cache('state', filteredState)
}

const refreshAllWidgets = async ({ entries = [] }) => {
  return new Promise(async resolve => {
    // Clear all entries
    entries = []
    var widgetNumber = await app
      .call('getWCount')
      .pipe(first())
      .toPromise()
    for (var i = 0; i <= widgetNumber; i++) {
      try {
        var widgetData = await loadWidgetData(i)
        entries.push(widgetData) // add to the state object received as param
      } catch (err) {
        console.log(err)
      }
    }
    const state = { entries } // return the entries array
    console.log(entries)
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
            disabled: widget[1],
          })
        }
      },
      err => {
        reject(err)
      }
    )
  })
}

const filterEntries = entries => {
  const filteredEntries = entries.filter(entry => entry && !!entry.addr)
  return filteredEntries
}
