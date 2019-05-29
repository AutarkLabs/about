import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button, SidePanelSeparator, Text } from '@aragon/ui'

import TypeInput from '../TypeInput'
import PanelTabBar from './PanelTabBar'
import PanelTabView from './PanelTabView'
import { SideBarScrollbarContainer } from '../../styles'
import Input from './Input'

import ipfsAdd from '../Utils/Ipfs/ipfsAdd'

let codemirrorInitialInstance = null
let editorTypeInitial = 0
let externalUrlInitial = ''
let ipfsHashInitial = ''

const PanelContent = ({ content, saveWidget, closePanel }) => {
  const [unsavedText, setUnsavedText] = useState(content)
  const [screenIndex, setScreenIndex] = useState(0)
  const [savePending, setSavePending] = useState(false)
  const [editorType, setEditorType] = useState(editorTypeInitial)
  const [externalUrl, setExternalUrl] = useState(externalUrlInitial)
  const [ipfsHash, setIpfsHash] = useState(ipfsHashInitial)
  /* , isError */
  const [{ ipfsAddr, isLoading }, saveIpfs] = ipfsAdd(null)

  const [codemirrorInstance, setCodemirrorInstance] = useState(
    codemirrorInitialInstance
  )
  useEffect(() => {
    if (ipfsAddr && savePending) {
      saveWidget(ipfsAddr, 0).subscribe(
        _res => {
          setSavePending(false)
          closePanel()
        },
        err => {
          console.log(err)
          setSavePending(false)
        }
      )
    }
    setUnsavedText(content)
  }, [content, ipfsAddr, savePending])

  const handleChange = _screenIndex => {
    setScreenIndex(_screenIndex)
  }

  const handleEditorChange = _unsavedText => {
    setUnsavedText(_unsavedText)
  }

  const handleEditorTypeChange = _editorType => {
    setEditorType(_editorType)
  }

  const handleExternalUrlChange = _externalUrl => {
    setExternalUrl(_externalUrl)
  }

  const handleIpfsHashChange = _ipfsHash => {
    setIpfsHash(_ipfsHash)
  }

  const onCodeMirrorInit = _codemirrorInstance => {
    setCodemirrorInstance(_codemirrorInstance)
  }

  const setSelectionBold = () => {
    codemirrorInstance.doc.replaceSelection(
      '**' + codemirrorInstance.doc.getSelection() + '**'
    )
  }

  const saveBlock = async () => {
    let widgetData = {}

    switch (editorType) {
      case 0:
        widgetData = {
          body: unsavedText,
        }
        await saveIpfs(widgetData)
        setSavePending(true)

        break
      case 1:
        widgetData = {
          url: externalUrl,
        }
        await saveIpfs(widgetData)
        setSavePending(true)

        break
      case 2:
        break
      default:
        break
    }
  }

  return (
    <PanelContainer>
      <TopPanel>
        <TypeInput value={editorType} onChange={handleEditorTypeChange} />
        <SidePanelSeparator style={{ margin: '15px -30px 6px -30px' }} />
        {editorType === 0 && (
          <div>
            <PanelTabBar
              handleChange={handleChange}
              screenIndex={screenIndex}
              setSelectionBold={setSelectionBold}
            />
            <SidePanelSeparator
              style={{
                margin: '-31px -30px 0',
              }}
            />
          </div>
        )}
      </TopPanel>
      <CenterPanel>
        {editorType === 0 && (
          <PanelTabView
            handleEditorChange={handleEditorChange}
            onCodeMirrorInit={onCodeMirrorInit}
            screenIndex={screenIndex}
            unsavedText={unsavedText}
            instance={codemirrorInstance}
          />
        )}
        {editorType === 1 && (
          <SideBarScrollbarContainer>
            <Input
              label="Url"
              value={externalUrl}
              onChange={handleExternalUrlChange}
            />
          </SideBarScrollbarContainer>
        )}
        {editorType === 2 && (
          <SideBarScrollbarContainer>
            <Input
              label="Hash"
              value={ipfsHash}
              onChange={handleIpfsHashChange}
            />
          </SideBarScrollbarContainer>
        )}
      </CenterPanel>
      <BottomPanel>
        <SidePanelSeparator style={{ margin: '0 -30px 15px' }} />
        <Button mode="strong" wide onClick={saveBlock}>
          Update
        </Button>
      </BottomPanel>

      {(isLoading || savePending) && (
        <LoadingOverlay>
          <LoadingOverlayContainer>
            <Text>{isLoading ? 'Saving to ipfs' : 'Sign contract'}</Text>
          </LoadingOverlayContainer>
        </LoadingOverlay>
      )}
    </PanelContainer>
  )
}

PanelContent.propTypes = {
  // onChange: PropTypes.func.isRequired,
  // onUpdate: PropTypes.func.isRequired,
  // value: PropTypes.string.isRequired,
}

// componentWillReceiveProps({ opened }) {
//   if (opened && !this.props.opened) {
//     // Reset the state on the panel re-opening, to avoid flickering when it's still closing
//     this.setState({ ...initialState })
//   }
// }

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const BottomPanel = styled.div`
  flex: 0 0 auto;
  padding-bottom: 15px;
`

const TopPanel = styled.div`
  flex: 0 0 auto;
`

const CenterPanel = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  margin-right: -30px;
  margin-left: -30px;
  z-index: 1;
`

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 10;
`

const LoadingOverlayContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
`

export default PanelContent
