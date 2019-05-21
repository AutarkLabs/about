import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
      }}
    >
      <TypeInput />
      <SidePanelSeparator style={{ margin: '15px -30px 6px -30px' }} />
      <EditorTabBar
        handleChange={handleChange}
        screenIndex={screenIndex}
        setSelectionBold={setSelectionBold}
      />
      <SidePanelSeparator
        style={{
          margin: '-31px -30px 15px',
        }}
      />
      <EditorTabView
        handleEditorChange={handleEditorChange}
        onCodeMirrorInit={onCodeMirrorInit}
        screenIndex={screenIndex}
        unsavedText={unsavedText}
      />
      <SidePanelSeparator style={{ margin: '15px -30px' }} />
      <Button mode="strong" wide>
        Update
      </Button>
    </div>
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

export default PanelContent
