import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useAragonApi } from '@aragon/api-react'
import {
  Main,
  Button,
  BREAKPOINTS,
  breakpoint,
  ContextMenuItem,
  EmptyStateCard,
  GU,
  Header,
  IconDown,
  IconGrid,
  Popover,
  SidePanel,
  Text,
  useLayout,
  useTheme,
} from '@aragon/ui'

import PanelContent from './components/panel/PanelContent'
import ColumnView from './components/content/ColumnView'
import { toHex } from 'web3-utils'
import illustration from './assets/empty.svg'

const Illustration = () => <img src={illustration} height={20 * GU} />

const Actions = ({ onClick, openerRef, visible, setVisible, handleClickUpdateWidget, entriesLength }) => {
  const theme = useTheme()
  const { layoutName } = useLayout()
  console.log(theme)
  return (
    <React.Fragment>
      {layoutName === 'small' ? (
        <Button
          onClick={onClick}
          ref={openerRef}
          icon={<IconGrid />}
          display="icon"
          label="Actions Menu"
        />
      ) : (
        <Button onClick={onClick} ref={openerRef} >
          <IconGrid css={`color: ${theme.surfaceIcon};`}/>
          <Text css='margin: 0 8px;'>Actions</Text>
          <IconDown css={`color: ${theme.surfaceIcon}; width: 16px;`}/>
        </Button>
      )}
      <Popover
        visible={visible}
        opener={openerRef.current}
        onClose={() => setVisible(false)}
        placement="bottom-end"
        css={`
          display: flex;
          flex-direction: column;
          padding: 10px;
        `}
      >
        <ContextMenuItem onClick={() => handleClickUpdateWidget(0)}>
          Edit main column
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleClickUpdateWidget(1)}>
          {entriesLength === 2 ? 'Edit side column' : 'Add side column'}
        </ContextMenuItem>
      </Popover>
    </React.Fragment>
  )
}
Actions.propTypes = {
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  openerRef: PropTypes.object.isRequired,
  entriesLength: PropTypes.number.isRequired,
}

function App() {
  const [panelVisible, setPanelVisible] = useState(false)
  const [actionsMenuVisible, setActionsMenuVisible] = useState(false)
  const [selectedWidget, setSelectedWidget] = useState(0)
  const actionsOpener = useRef(null)

  const { api, appState } = useAragonApi()
  const { entries = [] } = appState

  const handleClickUpdateWidget = index => {
    setSelectedWidget(index)
    setPanelVisible(true)
  }

  const updateWidget = (_index, _ipfsAddr) => {
    return api.updateWidget(toHex(_index), _ipfsAddr)
  }

  const closePanel = () => {
    setPanelVisible(false)
  }

  const SideContent = () => (
    <SidePanel
      opened={panelVisible}
      onClose={closePanel}
      title={entries[selectedWidget] ? "Update details" : "New details"}
    >
      <SidePanelContainer>
        <PanelContent
          ipfsAddr={
            entries[selectedWidget] &&
            entries[selectedWidget].addr
          }
          content={
            entries[selectedWidget] &&
            entries[selectedWidget].content
          }
          updateWidget={updateWidget}
          closePanel={closePanel}
          position={selectedWidget}
        />
      </SidePanelContainer>
    </SidePanel>
  )

  if (entries.length === 0) {
    return (
      <Main>
        <EmptyLayout>
          <EmptyStateCard
            action={
              <Button
                label="Customize about page"
                onClick={() => handleClickUpdateWidget(0)}
              />
            }
            text="No information here"
            illustration={<Illustration />}
          />
        </EmptyLayout>
        <SideContent />
      </Main>
    )
  }

  return (
    <Main>
      <Header
        primary="About"
        secondary={
          <Actions
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
      <SideContent />
    </Main>
  )
}

const EmptyLayout = styled.div`
  display: flex;
  height: 95vh;
  justify-content: center;
  align-items: center;
`

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

// const Syncing = styled.div.attrs({children: 'Syncing…' })`
//   position: absolute;
//   top: 15px;
//   right: 20px;
// `

export default App
