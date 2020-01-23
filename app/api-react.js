import buildStubbedApiReact from './utils/api-react'
import { TYPE_MARKDOWN, TYPE_VOTING } from './utils/constants'

// TODO: insert favicon to avoid 404

const initialState = process.env.NODE_ENV !== 'production' && {
  // widgets: [
  //   {
  //     type: TYPE_VOTING,
  //     data: {
  //       votes: [
  //         {
  //           status: 'Passed',
  //           id: 1,
  //           description: 'Mint 1 ETH for 0xbaB65A7D8a8F67D38cD26af113b95279fA3E7616',
  //           percentageYes: 0.6134,
  //         },
  //         {
  //           status: 'Rejected',
  //           id: 2,
  //           description: 'Mint 19 ETH for 0x978f4De6B4833e956a366A441B277deB7A7C0d4c',
  //           percentageYes: 0.3196,
  //         },
  //       ],
  //     },
  //     position: {},
  //   },
  //   {
  //     type: TYPE_MARKDOWN,
  //     data: {
  //       content: '# hola, `mundo`!',
  //     },
  //     position: {},
  //   },
  // ],
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
  widgets: [],
  isSyncing: false,
}

const functions =
  process.env.NODE_ENV !== 'production' &&
  ((appState, setAppState) => ({
    newWidget: widget =>
      setAppState({
        ...appState,
        widgets: [ ...appState.widgets, widget ],
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
