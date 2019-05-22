import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button, SidePanelSeparator } from '@aragon/ui'

import TypeInput from './TypeInput'
import EditorTabBar from './EditorTabBar'
import EditorTabView from './EditorTabView'

const mockedText = `
  # Title

  ## Subtitle
  
  ### H3
  
  - List
  - Item
  - Other
  
  - [ ] Task
  - [x] Completed
  
  [Link](#)
  
  *Emojis!* 🦄 🦅 🚀
  
  **italics**
  
  __something__
`

let codemirrorInitialInstance = null

const PanelContent = () => {
  const [unsavedText, setUnsavedText] = useState(mockedText)
  const [screenIndex, setScreenIndex] = useState(0)

  const [codemirrorInstance, setCodemirrorInstance] = useState(
    codemirrorInitialInstance
  )

  const handleChange = _screenIndex => {
    setScreenIndex(_screenIndex)
  }

  const handleEditorChange = _unsavedText => {
    setUnsavedText(_unsavedText)
  }

  const onCodeMirrorInit = _codemirrorInstance => {
    setCodemirrorInstance(_codemirrorInstance)
  }
  const setSelectionBold = () => {
    codemirrorInstance.doc.replaceSelection(
      '**' + codemirrorInstance.doc.getSelection() + '**'
    )
  }

  return (
    <PanelContainer>
      <TopPanel>
        <TypeInput />
        <SidePanelSeparator style={{ margin: '15px -30px 6px -30px' }} />
        <EditorTabBar
          handleChange={handleChange}
          screenIndex={screenIndex}
          setSelectionBold={setSelectionBold}
        />
        <SidePanelSeparator
          style={{
            margin: '-31px -30px 0',
          }}
        />
      </TopPanel>
      <CenterPanel>
        <EditorTabView
          handleEditorChange={handleEditorChange}
          onCodeMirrorInit={onCodeMirrorInit}
          screenIndex={screenIndex}
          unsavedText={unsavedText}
          instance={codemirrorInstance}
        />
      </CenterPanel>
      <BottomPanel>
        <SidePanelSeparator style={{ margin: '0 -30px 15px' }} />
        <Button mode="strong" wide>
          Update
        </Button>
      </BottomPanel>
    </PanelContainer>
  )
}

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: hidden;
`

const BottomPanel = styled.div`
  flex: 0 0 auto;
  background: red;
`
const TopPanel = styled.div`
  flex: 0 0 auto;
  background: red;
`

const CenterPanel = styled.div`
  flex: 1 1 auto;
  background: green;
`

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
  height:100%;
`


const BottomPanel = styled.div`
  flex: 0 0 auto;
  padding-bottom:15px;
`
const TopPanel = styled.div`
  flex: 0 0 auto;
`

const CenterPanel = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  margin-right: -30px;
`

export default PanelContent
