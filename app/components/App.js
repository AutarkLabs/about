import React, { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { GU, Header, Main, SidePanel, SyncIndicator } from '@aragon/ui'

import ColumnView from './Content/ColumnView'
import EmptyState from './Content/EmptyState'
import Panel from './Panel/Panel'
import ActionsButton from './ActionsButton'
import * as types from '../utils/prop-types'
import { useAragonApi } from '../api-react'

const App = ({ entries, isSyncing }) => {
  const [ panelVisible, setPanelVisible ] = useState(false)
  const [ actionsMenuVisible, setActionsMenuVisible ] = useState(false)
  const [ selectedWidget, setSelectedWidget ] = useState(-1)
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
            height: calc(100vh - ${12 * GU}px);
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
        title={'New widget'}
      >
        <Panel />
      </SidePanel>
    </>
  )
}

App.propTypes = {
  entries: PropTypes.arrayOf(types.entry),
  isSyncing: PropTypes.bool,
}

App.defaultProps = {
  appStateReady: false,
  isSyncing: true,
  entries: [],
}

// Passing api-react by props allows to type-check with propTypes
const AboutApp = () => {
  const { api, appState, guiStyle = {} } = useAragonApi()
  const { appearance } = guiStyle

  return (
    <Main assetsUrl="./aragon-ui" theme={appearance}>
      <App api={api} {...appState} />
    </Main>
  )
}

export default AboutApp