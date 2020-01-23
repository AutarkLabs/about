import buildStubbedApiReact from './utils/api-react'
import {
  TYPE_MARKDOWN,
  TYPE_VOTING,
  VOTING_STATUS_ONGOING,
  VOTING_STATUS_PENDING_ENACTMENT,
} from './utils/constants'
import { ipfs } from './utils/ipfs'

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
      type: TYPE_VOTING,
      data: {
        votes: [
          {
            id: '0',
            description: 'Mint 1 ETH for 0xE7F5Fd82F861343Fbe794E4796dC3Ff8999B0Ee4',
            yea: '1000000000000000000',
            nay: '0',
            status: VOTING_STATUS_PENDING_ENACTMENT,
            app: '0xbaB65A7D8a8F67D38cD26af113b95279fA3E7616',
          },
          {
            id: '1',
            description: 'Mint 19 ETH for 0xE7F5Fd82F861343Fbe794E4796dC3Ff8999B0Ee4',
            yea: '3000000000000000000',
            nay: '1000000000000000000',
            status: VOTING_STATUS_ONGOING,
            app: '0x978f4De6B4833e956a366A441B277deB7A7C0d4c',
          },
        ]
      },
      position: {},
    }
  ],
  // widgets: [{
  //   cId: 'wqefwefwqe',
  //   data: { content: 'PropTypes.object' },
  //   layout: { primary: true, wide: false },
  //   type: 'PropTypes.string'
  // }, {
  //   cId: 'sdasdfsdf',
  //   data: { content: 'PropTypes.object' },
  //   layout: { primary: false, wide: false },
  //   type: 'PropTypes.string'
  // }],
  isSyncing: false,
}

const functions =
  process.env.NODE_ENV !== 'production' &&
  ((appState, setAppState) => ({
    addWidget: (_id ,cId) => ({
      toPromise: async () =>{
        const widgetObj = (await ipfs.dag.get(cId)).value
        setAppState({
          ...appState,
          widgets: [ ...appState.widgets, { ...widgetObj }],
        })}
    })
    ,
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
