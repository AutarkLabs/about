import {
  AragonApi,
  useGuiStyle,
  usePath,
  useAragonApi as useProductionApi,
  useAppState as useProductionAppState,
  useInstalledApps as useProductionInstalledApps,
  useNetwork as useProductionNetwork,
} from '@aragon/api-react'

export default ({ initialState = {}, functions = (() => {}) }) => {
  let useAppState = useProductionAppState
  let useAragonApi = useProductionApi
  let useInstalledApps = useProductionInstalledApps
  let useNetwork = useProductionNetwork

  if (process.env.NODE_ENV !== 'production') {
    const inIframe = () => {
      try {
        return window.self !== window.top
      } catch (e) {
        return true
      }
    }

    if (!inIframe()) {
      useAragonApi = require('./useStubbedApi')({ functions, initialState })
      useAppState = () => {
        const { appState } = useAragonApi()
        return appState
      }
      useInstalledApps = require('./useStubbedInstalledApps')
      useNetwork = require('./useStubbedNetwork')
    }
  }

  return { AragonApi, useAppState, useAragonApi, useGuiStyle, useInstalledApps, useNetwork, usePath }
}
