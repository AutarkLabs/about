import React, { useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Header, Main, SidePanel, SyncIndicator } from '@aragon/ui'

import ColumnView from './components/content/ColumnView'
import PanelContent from './components/panel/PanelContent'
import ActionsButton from './components/ActionsButton'
import EmptyState from './screens/EmptyState'
import * as types from './utils/prop-types'
import { useAragonApi } from './api-react'

const App = ({ api, entries, isSyncing }) => {
  const [panelVisible, setPanelVisible] = useState(true)
  const [actionsMenuVisible, setActionsMenuVisible] = useState(false)
  const [selectedWidget, setSelectedWidget] = useState(-1)
  const actionsOpener = useRef(null)

  const handleClickUpdateWidget = index => {
    setSelectedWidget(index)
    setPanelVisible(true)
  }

  const handleAddColumn = useCallback(() => {
    setPanelVisible(true)
  }, [setPanelVisible])

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
          <EmptyState isSyncing={isSyncing} onActionClick={handleAddColumn} />
        </div>
      )}
      {entries.length > 0 && (
        <>
          <SyncIndicator visible={isSyncing} />
          <Header
            primary="About"
            secondary={
              <ActionsButton
                onClick={() => setActionsMenuVisible(true)}
                visible={actionsMenuVisible}
                setVisible={setActionsMenuVisible}
                openerRef={actionsOpener}
                handleClickUpdateWidget={handleClickUpdateWidget}
                entriesLength={entries.length}
              />
            }
          />
          <ColumnView />
        </>
      )}
      <SidePanel
        opened={panelVisible}
        onClose={() => setPanelVisible(false)}
        title={entries[selectedWidget] ? 'Update details' : 'New details'}
      >
        <SidePanelContainer>
          <PanelContent
            ipfsAddr={entries[selectedWidget] && entries[selectedWidget].addr}
            content={entries[selectedWidget] && entries[selectedWidget].content}
            updateWidget={() => {}}
            closePanel={() => setPanelVisible(false)}
            position={selectedWidget}
          />
        </SidePanelContainer>
      </SidePanel>
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

  return (
    <Main assetsUrl="./aragon-ui" theme={appearance}>
      <App api={api} {...appState} />
    </Main>
  )
}

// With this style the scrollbar on SidePanel is disabled, so we can handle it ourselves
const SidePanelContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 30px;
  left: 30px;
  top: 80px;

  @media only screen and (max-height: 380px) {
    position: relative;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }
`

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

// import ColumnView from './components/content/ColumnView'
// import { toHex } from 'web3-utils'
// import illustration from './assets/empty.svg'

// const Illustration = () => <img src={illustration} height={20 * GU} />

// function App() {
//   const [panelVisible, setPanelVisible] = useState(false)
//   const [actionsMenuVisible, setActionsMenuVisible] = useState(false)
//   const [selectedWidget, setSelectedWidget] = useState(0)

//   const { api, appState } = useAragonApi()
//   // const { entries = [] } = appState
//   const entries = []

//   const updateWidget = (_index, _ipfsAddr) => {
//     return api.updateWidget(toHex(_index), _ipfsAddr)
//   }

//   const closePanel = () => {
//     setPanelVisible(false)
//   }

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

//     </Main>
//   )
// }

// const EmptyLayout = styled.div`
//   display: flex;
//   height: 95vh;
//   justify-content: center;
//   align-items: center;
// `

// // const Syncing = styled.div.attrs({children: 'Syncing…' })`
// //   position: absolute;
// //   top: 15px;
// //   right: 20px;
// // `

// export default App
