import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Button, DropDown, Field, SidePanelSeparator, TabBar } from '@aragon/ui'

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

const PanelContent = ({ onChange, onUpdate, value }) => {
  const [unsavedText, setUnsavedText] = useState(mockedText)
  const [screenIndex, setScreenIndex] = useState(0)

  const handleChange = _screenIndex => {
    setScreenIndex(_screenIndex)
  }

  const handleEditorChange = _unsavedText => {
    setUnsavedText(_unsavedText)
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
      <SidePanelSeparator style={{ margin: '15px -30px' }} />
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
          Edit ToolBar
        </div>
      </TabBarWrapper>
      <SidePanelSeparator
        style={{
          margin: '-31px -30px 15px',
        }}
      />

      <div style={{ flex: '1' }}>
        {screenIndex === 0 && (
          <Editor value={unsavedText} onChange={handleEditorChange} />
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

export default PanelContent
