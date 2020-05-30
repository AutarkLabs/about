import buildStubbedApiReact from './utils/api-react'
import {
  TYPE_MARKDOWN,
  TYPE_VOTES,
  VOTING_STATUS_ONGOING,
  VOTING_STATUS_PENDING_ENACTMENT,
} from './utils/constants'
import { ipfs } from './utils/ipfs'

const initialState = process.env.NODE_ENV !== 'production' && {
  isSyncing: false,
  votes: [
    {
      appAddress: '0xbaB65A7D8a8F67D38cD26af113b95279fA3E7616',
      description: 'Mint 1 ETH for 0xE7F5Fd82F861343Fbe794E4796dC3Ff8999B0Ee4',
      id: '0',
      nay: '0',
      status: VOTING_STATUS_PENDING_ENACTMENT,
      yea: '1000000000000000000',
    },
    {
      appAddress: '0x978f4De6B4833e956a366A441B277deB7A7C0d4c',
      description: 'Mint 19 ETH for 0xE7F5Fd82F861343Fbe794E4796dC3Ff8999B0Ee4',
      id: '1',
      nay: '1000000000000000000',
      status: VOTING_STATUS_ONGOING,
      yea: '3000000000000000000',
    },
  ],
  widgets: [
    {
      data: '# Title for Markdown test 🐈',
      id: '0',
      layout: { primary: true },
      type: TYPE_MARKDOWN,
    },
    {
      data: {
      },
      id: '1',
      layout: { primary: false },
      type: TYPE_VOTES,
    },
    {
      data: '# hello, `WORLD`! 🌐👽',
      id: '2',
      layout: { primary: true },
      type: TYPE_MARKDOWN,
    },
    {
      data: {
      },
      id: '3',
      layout: { primary: true },
      type: TYPE_VOTES,
    },
    {
      data: 'Unicorns exist 🦄',
      id: '4',
      layout: { primary: true },
      type: TYPE_MARKDOWN,
    },
  ],
}

const functions =
  process.env.NODE_ENV !== 'production' &&
  ((appState, setAppState) => ({
    addWidget: (_id, cId) => ({
      toPromise: async () =>{
        const widgetObj = JSON.parse((await ipfs.object.data(cId)).toString())

        setAppState({
          ...appState,
          widgets: [ ...appState.widgets, { ...widgetObj } ],
        })},
    }),
    setSyncing: syncing =>
      setAppState({
        ...appState,
        isSyncing: syncing,
      }),
  }))


// TODO: Add and export usePath
const { AragonApi, useAppState, useAragonApi, useInstalledApps, useNetwork } = buildStubbedApiReact({
  functions,
  initialState,
})

export { AragonApi, useAppState, useAragonApi, useInstalledApps, useNetwork }
