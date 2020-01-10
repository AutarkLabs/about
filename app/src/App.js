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
        <PanelContent
          ipfsAddr={entries[selectedWidget] && entries[selectedWidget].addr}
          content={entries[selectedWidget] && entries[selectedWidget].content}
          updateWidget={() => {}}
          closePanel={() => setPanelVisible(false)}
          position={selectedWidget}
        />
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
