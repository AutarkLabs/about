import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { GU, Header, Main, SidePanel, SyncIndicator } from '@aragon/ui'

import { EditProvider, useEditMode } from '../context/Edit'
import Layout from './Content/Layout'
import EmptyState from './Content/EmptyState'
import Panel from './Panel/Panel'
import ActionsButton from './ActionsButton'
import EditModeButtons from './EditModeButtons'
import * as types from '../utils/prop-types'
import { useAragonApi } from '../api-react'
import { ipfs } from '../utils/ipfs'
import { IdentityProvider } from '../utils/identity-manager'

const App = ({ api, widgets, isSyncing }) => {
  const { editMode, setEditMode, editedWidgets } = useEditMode()
  const [ panelVisible, setPanelVisible ] = useState(false)
  const [ editWidget, setEditWidget ] = useState(null)

  const handleEditLayout = () => {
    setEditMode(true)
  }

  const handleNewWidget = () => {
    setPanelVisible(true)
  }

  const onEditMarkdown = widget => {
    setEditWidget(widget)
    setPanelVisible(true)
  }

  const handlePanelSubmit = useCallback(async widgetObject => {
    setPanelVisible(false)
    let nextWidgets
    const index = widgets.findIndex(widget => widget.id === widgetObject.id)
    if (index === -1) {
      nextWidgets = [ ...widgets, widgetObject ]
    }
    else {
      nextWidgets = widgets
      nextWidgets[index] = widgetObject
    }
    const cId = (await ipfs.object.put({ Data: Buffer.from(JSON.stringify(nextWidgets)), Links: [] }, { enc: 'json', pin: true })).string
    api.updateContent(cId).toPromise()
    setEditWidget(null)
  }, [ api, widgets ])

  const handleEditModeCancel = () => {
    setEditMode(false)
  }

  const handleEditModeSubmit = useCallback(async () => {
    const cId = (await ipfs.object.put({ Data: Buffer.from(JSON.stringify(editedWidgets)), Links: [] }, { enc: 'json', pin: true })).string
    api.updateContent(cId).toPromise()
    setEditMode(false)
  }, [ api, editedWidgets, setEditMode ])

  return (
    <>
      {widgets.length === 0 && (
        <div
          css={`
            height: calc(100vh - ${12 * GU}px);
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <EmptyState isSyncing={isSyncing} onActionClick={handleNewWidget} />
        </div>
      )}
      {widgets.length > 0 && (
        <>
          <SyncIndicator visible={isSyncing} />
          <Header
            primary="About"
            secondary={editMode
              ? <EditModeButtons onCancel={handleEditModeCancel} onSubmit={handleEditModeSubmit} />
              : <ActionsButton
                onClickEditLayout={handleEditLayout}
                onClickNewWidget={handleNewWidget}
              />
            }
          />
          <Layout onEditMarkdown={onEditMarkdown} widgets={widgets} />
        </>
      )}
      <SidePanel
        opened={panelVisible}
        onClose={() => {
          setPanelVisible(false)
          setEditWidget(null)
        }}
        title={editWidget ? 'Edit widget' : 'New widget'}
      >
        <Panel onSubmit={handlePanelSubmit} editWidget={editWidget} />
      </SidePanel>
    </>
  )
}

App.propTypes = {
  api: PropTypes.shape({
    updateContent: PropTypes.func,
  }),
  // appStateReady: PropTypes.bool,
  isSyncing: PropTypes.bool,
  widgets: PropTypes.arrayOf(types.widget),
}

App.defaultProps = {
  // TODO: implement appStateReady
  // appStateReady: false,
  api: {},
  isSyncing: true,
  widgets: [],
}

// Passing api-react by props allows to type-check with propTypes
const AboutApp = () => {
  const { api, appState, guiStyle = {} } = useAragonApi()
  const { appearance } = guiStyle

  return (
    <Main assetsUrl="./aragon-ui" theme={appearance}>
      <EditProvider>
        <IdentityProvider>
          <App api={api} {...appState} />
        </IdentityProvider>
      </EditProvider>
    </Main>
  )
}

export default AboutApp
