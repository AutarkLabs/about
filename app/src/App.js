import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Header, Main, SyncIndicator } from '@aragon/ui'

import ActionsButton from './components/ActionsButton'
import EmptyState from './screens/EmptyState'
import * as types from './utils/prop-types'
import { useAragonApi } from './api-react'

const App = ({ api, entries, isSyncing }) => {
  const [sidePanelOpened, setSidePanelOpened] = useState(false)

  return (
    <>
      {entries.length === 0 && (
        <div
          css={`
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <EmptyState isSyncing={isSyncing} onActionClick={() => {}} />
        </div>
      )}
      {entries.length > 0 && (
        <>
          <SyncIndicator visible={isSyncing} />
          <Header primary="About" secondary={<ActionsButton />} />
        </>
      )}
    </>
  )
}

App.propTypes = {
  api: PropTypes.object,
  entries: PropTypes.arrayOf(types.entry),
  isSyncing: PropTypes.bool,
}

App.defaultProps = {
  appStateReady: false,
  isSyncing: true,
  entries: [],
}

// Passing api-react by props allows to type-check with propTypes
export default () => {
  const { api, appState, guiStyle = {} } = useAragonApi()
  const { appearance } = guiStyle
  console.log('theme', appearance, guiStyle)

  return (
    <Main assetsUrl="./aragon-ui" theme={'dark'}>
      <App api={api} {...appState} />
    </Main>
  )
}

// import React, { useState, useRef } from 'react'
// import PropTypes from 'prop-types'
// import styled from 'styled-components'

// import { useAragonApi } from './api-react'

// import {
//   Main,
//   Button,
//   ContextMenuItem,
//   EmptyStateCard,
//   GU,
//   Header,
//   IconDown,
//   IconGrid,
//   Popover,
//   SidePanel,
//   Text,
//   useLayout,
//   useTheme,
// } from '@aragon/ui'

// import PanelContent from './components/panel/PanelContent'
// import ColumnView from './components/content/ColumnView'
// import { toHex } from 'web3-utils'
// import illustration from './assets/empty.svg'

// const Illustration = () => <img src={illustration} height={20 * GU} />

// function App() {
//   const [panelVisible, setPanelVisible] = useState(false)
//   const [actionsMenuVisible, setActionsMenuVisible] = useState(false)
//   const [selectedWidget, setSelectedWidget] = useState(0)
//   const actionsOpener = useRef(null)

//   const { api, appState } = useAragonApi()
//   // const { entries = [] } = appState
//   const entries = []

//   const handleClickUpdateWidget = index => {
//     setSelectedWidget(index)
//     setPanelVisible(true)
//   }

//   const updateWidget = (_index, _ipfsAddr) => {
//     return api.updateWidget(toHex(_index), _ipfsAddr)
//   }

//   const closePanel = () => {
//     setPanelVisible(false)
//   }

//   const SideContent = () => (
//     <SidePanel
//       opened={panelVisible}
//       onClose={closePanel}
//       title={entries[selectedWidget] ? 'Update details' : 'New details'}
//     >
//       <SidePanelContainer>
//         <PanelContent
//           ipfsAddr={entries[selectedWidget] && entries[selectedWidget].addr}
//           content={entries[selectedWidget] && entries[selectedWidget].content}
//           updateWidget={updateWidget}
//           closePanel={closePanel}
//           position={selectedWidget}
//         />
//       </SidePanelContainer>
//     </SidePanel>
//   )

//   if (entries.length === 0) {
//     return (
//       <Main>
//         <EmptyLayout>
//           <EmptyStateCard
//             action={
//               <Button
//                 label="Customize about page"
//                 onClick={() => handleClickUpdateWidget(0)}
//               />
//             }
//             text="No information here"
//             illustration={<Illustration />}
//           />
//         </EmptyLayout>
//         <SideContent />
//       </Main>
//     )
//   }

//   return (
//     <Main>
//       <Header
//         primary="About"
//         secondary={
//           <Actions
//             onClick={() => setActionsMenuVisible(true)}
//             visible={actionsMenuVisible}
//             setVisible={setActionsMenuVisible}
//             openerRef={actionsOpener}
//             handleClickUpdateWidget={handleClickUpdateWidget}
//             entriesLength={entries.length}
//           />
//         }
//       />
//       <ColumnView />
//       <SideContent />
//     </Main>
//   )
// }

// const EmptyLayout = styled.div`
//   display: flex;
//   height: 95vh;
//   justify-content: center;
//   align-items: center;
// `

// // With this style the scrollbar on SidePanel is disabled, so we can handle it ourselves
// const SidePanelContainer = styled.div`
//   position: absolute;
//   bottom: 0;
//   right: 30px;
//   left: 30px;
//   top: 80px;

//   @media only screen and (max-height: 380px) {
//     position: relative;
//     bottom: 0;
//     right: 0;
//     left: 0;
//     top: 0;
//   }
// `

// // const Syncing = styled.div.attrs({children: 'Syncing…' })`
// //   position: absolute;
// //   top: 15px;
// //   right: 20px;
// // `

// export default App
