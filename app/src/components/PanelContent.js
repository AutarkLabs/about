import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Button, DropDown, Field, SidePanelSeparator, TabBar } from '@aragon/ui'
import Octicon, {Bold, Italic, TextSize, Quote, Code, Link, ListUnordered} from '@githubprimer/octicons-react'
import Editor from './Editor'
import Preview from './Preview'

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
var codemirrorInstance = null;

const PanelContent = ({ onChange, onUpdate, value }) => {
  const [unsavedText, setUnsavedText] = useState(mockedText)
  const [screenIndex, setScreenIndex] = useState(0)
  
  const [codemirrorInstance, setCodemirrorInstance] = useState(codemirrorInstance)

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
    codemirrorInstance.doc.replaceSelection("**"+codemirrorInstance.doc.getSelection()+"**");
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
      }}
    >
      <Field label="Type">
        <DropDown
          items={[
            'Custom markdown',
            'External URL (.md file)',
            'IPFS hash (.md file)',
          ]}
          active={0}
          onChange={() => {}}
        />
      </Field>
      <SidePanelSeparator style={{ margin: '15px -30px 6px -30px' }} />
      <TabBarWrapper>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '20px',
          }}
        >
          <TabBar
            items={['Write', 'Preview']}
            selected={screenIndex}
            onChange={handleChange}
          />
          <EditToolBar>
            <EditToolBarButton onClick={setSelectionBold} compact><Octicon icon={TextSize}/></EditToolBarButton>
            <EditToolBarButton onClick={setSelectionBold} compact><Octicon icon={Bold}/></EditToolBarButton>
            <EditToolBarButton onClick={setSelectionBold} compact><Octicon icon={Italic}/></EditToolBarButton>
            <EditToolBarSeparator />
            <EditToolBarButton onClick={setSelectionBold} compact><Octicon icon={Quote}/></EditToolBarButton>
            <EditToolBarButton onClick={setSelectionBold} compact><Octicon icon={Code}/></EditToolBarButton>
            <EditToolBarButton onClick={setSelectionBold} compact><Octicon icon={Link}/></EditToolBarButton>
            <EditToolBarButton onClick={setSelectionBold} compact><Octicon icon={ListUnordered}/></EditToolBarButton>
            <EditToolBarSeparator />
          </EditToolBar>
        </div>
      </TabBarWrapper>
      <SidePanelSeparator
        style={{
          margin: '-31px -30px 15px',
        }}
      />

      <div style={{ flex: '1' }}>
        {screenIndex === 0 && (
          <Editor value={unsavedText} onChange={handleEditorChange} onCodeMirrorInit={onCodeMirrorInit  } />
        )}
        {screenIndex === 1 && <Preview value={unsavedText} />}
      </div>
      <SidePanelSeparator style={{ margin: '15px -30px' }} />
      <Button mode="strong" wide>
        Update
      </Button>
    </div>
  )
}

// PanelContent.propTypes = {
//   onChange: PropTypes.func.isRequired,
//   onUpdate: PropTypes.func.isRequired,
//   value: PropTypes.text.isRequired,
// }

// componentWillReceiveProps({ opened }) {
//   if (opened && !this.props.opened) {
//     // Reset the state on the panel re-opening, to avoid flickering when it's still closing
//     this.setState({ ...initialState })
//   }
// }

const TabBarWrapper = styled.div`
  margin: 0 -30px 30px;
`

const EditToolBar = styled.div`
  margin-top:-4px;
`

const EditToolBarButton = styled(Button)`
  width:22px;
  height:22px;
  text-align:center;
  padding:0;
  margin:0;
`
const EditToolBarSeparator = styled.div`
  display:inline-block;
  width:10px;
  height:1px;
`

export default PanelContent
