import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useAragonApi } from '@aragon/api-react'
import {
  Main,
  AppBar,
  AppView,
  Button,
  SidePanel,
  EmptyStateCard,
  IconHome,
  SafeLink,
} from '@aragon/ui'

import PanelContent from './components/panel/PanelContent'
import Widget from './components/content/Widget'

function App() {
  const [panelVisible, setPanelVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedWidget, setSelectedWidget] = useState(0)

  const { api, appState } = useAragonApi()
  const { entries } = appState

  const handleClickUpdateWidget = index => e => {
    setSelectedWidget(index)
    setPanelVisible(true)
  }

  const handleClickNewWidget = e => {
    setSelectedWidget(null)
    setPanelVisible(true)
  }

  const closePanel = () => {
    setPanelVisible(false)
  }

  const updateWidget = (_index, _ipfsAddr) => {
    return api.updateWidget(_index, _ipfsAddr)
  }

  const newWidget = _ipfsAddr => {
    return api.addWidget(_ipfsAddr)
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const widgetList =
    entries &&
    entries.map((widget, index) => (
      <Widget
        key={index}
        id={index}
        content={widget.content}
        ipfsAddr={widget.addr}
        handleClick={handleClickUpdateWidget}
        active={editMode}
      />
    ))
  return (
    <Main>
      <BaseLayout>
        <AppView
          appBar={
            <AppBar
              title="Home"
              endContent={
                <div>
                  {editMode && (
                    <div>
                      <Button
                        mode="outline"
                        onClick={toggleEditMode}
                        style={{ marginRight: 20 }}
                      >
                        Cancel and Exit
                      </Button>

                      <Button mode="strong" onClick={toggleEditMode}>
                        Submit changes
                      </Button>
                    </div>
                  )}

                  {!editMode && (
                    <Button mode="strong" onClick={toggleEditMode}>
                      Edit Page
                    </Button>
                  )}
                </div>
              }
            />
          }
        >
          <WidgetsLayout>
            {entries ? (
              widgetList
            ) : (
              <EmptyStateCard
                action={
                  <SafeLink href="#" onClick={handleClickNewWidget}>
                    Add new widget
                  </SafeLink>
                }
                text="You seem to not have any content on your wall."
                icon={<IconHome color="blue" />}
              />
            )}
            {entries && (
              <SafeLink href="#" onClick={handleClickNewWidget}>
                Add new widget
              </SafeLink>
            )}
          </WidgetsLayout>
        </AppView>
      </BaseLayout>
      <SidePanel
        opened={panelVisible}
        onClose={closePanel}
        title="Content Block Editor"
      >
        <SidePanelContainer>
          <PanelContent
            ipfsAddr={
              entries !== undefined &&
              selectedWidget !== null &&
              entries[selectedWidget].addr
            }
            content={
              entries !== undefined &&
              selectedWidget !== null &&
              entries[selectedWidget].content
            }
            newWidget={newWidget}
            updateWidget={updateWidget}
            closePanel={closePanel}
            position={selectedWidget}
          />
        </SidePanelContainer>
      </SidePanel>
    </Main>
  )
}

const BaseLayout = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`

const WidgetsLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-auto-flow: column;
  grid-gap: 30px;
  margin-right: 30px;

  @media only screen and (max-width: 768px) {
    display: block;
    margin-right: 0;
  }
`

// With this style the scrollbar on SidePanel is disabled, so we can handle it ourselves
const SidePanelContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 30px;
  left: 30px;
  top: 60px;

  @media only screen and (max-height: 380px) {
    position: relative;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }
`

// const Syncing = styled.div.attrs({children: 'Syncing…' })`
//   position: absolute;
//   top: 15px;
//   right: 20px;
// `

export default App
