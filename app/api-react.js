import buildStubbedApiReact from './utils/api-react'
import { TYPE_MARKDOWN, TYPE_VOTES } from './utils/constants'

// TODO: insert favicon to avoid 404

const initialState = process.env.NODE_ENV !== 'production' && {
  widgets: [
    {
      type: TYPE_MARKDOWN,
      data: {
        content: '# hola, `mundo`!',
      },
      position: {},
    },
    {
      type: TYPE_VOTES,
      data: {
        votes: [
          {
            addr: '0xa5a3oestnr342euo3oeuEOsooeurtnsoeu',
            value: 44,
          }
        ]
      },
      position: {},
    }
  ],
  isSyncing: false,
}

const functions =
  process.env.NODE_ENV !== 'production' &&
  ((appState, setAppState) => ({
    newEntry: content =>
      setAppState({
        ...appState,
        widgets: [ ...appState.widgets, { content }],
      }),
    setSyncing: syncing =>
      setAppState({
        ...appState,
        isSyncing: syncing,
      })
  }))

const { AragonApi, useAragonApi, usePath } = buildStubbedApiReact({
  initialState,
  functions,
})

export { AragonApi, useAragonApi, usePath }
