import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button, SidePanelSeparator } from '@aragon/ui'

import TypeInput from './TypeInput'
import EditorTabBar from './EditorTabBar'
import EditorTabView from './EditorTabView'
import {SideBarScrollbarContainer} from '../styles'
import EditorTextInput from './Utils/EditorTextInput'

const mockedText = `# Title

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

[I'm an inline-style link](https://www.google.com)

Here's our logo (hover to see the title text):
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"
`

let codemirrorInitialInstance = null
let editorTypeInitial = 1
let externalUrlInitial = ""
let ipfsHashInitial = ""

const PanelContent = () => {
  const [unsavedText, setUnsavedText] = useState(mockedText)
  const [screenIndex, setScreenIndex] = useState(0)
  const [editorType, setEditorType] = useState(editorTypeInitial)
  const [externalUrl, setExternalUrl] = useState(externalUrlInitial)
  const [ipfsHash, setIpfsHash] = useState(ipfsHashInitial)

  const [codemirrorInstance, setCodemirrorInstance] = useState(
    codemirrorInitialInstance
  )

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

  return (
    <PanelContainer>
      <TopPanel>
        <TypeInput 
          value={editorType}
          onChange={handleEditorTypeChange}
        />
        <SidePanelSeparator style={{ margin: '15px -30px 6px -30px' }} />
        {editorType=== 0 && 
          <div>
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
          </div>
        }
      </TopPanel>
      <CenterPanel>
      {editorType=== 0 && 
        <EditorTabView
          handleEditorChange={handleEditorChange}
          onCodeMirrorInit={onCodeMirrorInit}
          screenIndex={screenIndex}
          unsavedText={unsavedText}
          instance={codemirrorInstance}
        />
      }
      {editorType=== 1 && 
        <SideBarScrollbarContainer>
          <EditorTextInput
            label="Url"
            value={externalUrl}
            onChange={handleExternalUrlChange}
          />
        </SideBarScrollbarContainer>
      }
      {editorType=== 2 && 
        <SideBarScrollbarContainer>
          <EditorTextInput
            hash="Hash"
            value={ipfsHash}
            onChange={handleIpfsHashChange}
          />
        </SideBarScrollbarContainer>
      }
        
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
  margin-left: -30px;
  z-index: 1;
`

export default PanelContent
