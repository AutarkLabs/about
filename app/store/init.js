import {
  getVoting,
  storeHandler,
} from './utils'
import aboutEventHandler from './events'

const initState = async cachedState => ({
  isSyncing: true,
  widgets: [],
  ...cachedState,
})

const initialize = async () => {
  const settings = {
    voting: await getVoting(),
  }

  const storeOptions = {
    externals: [settings.voting],
    init: initState,
  }

  return storeHandler(settings, aboutEventHandler, storeOptions)
}

export default initialize