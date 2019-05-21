import React from 'react'
import styled from 'styled-components'
import { Button, DropDown, Field, SidePanelSeparator, TabBar } from '@aragon/ui'

import Editor from './Editor'
import Preview from './Preview'

const initialState = {
  screenIndex: 0,
  unsavedText: `
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
`,
}

class PanelContent extends React.Component {
  static defaultProps = {
    onWithdraw: () => {},
    onDeposit: () => {},
    proxyAddress: null,
  }

  state = {
    ...initialState,
  }

  componentWillReceiveProps({ opened }) {
    if (opened && !this.props.opened) {
      // Reset the state on the panel re-opening, to avoid flickering when it's still closing
      this.setState({ ...initialState })
    }
  }

  handleChange = screenIndex => {
    this.setState({ screenIndex })
  }

  handleEditorChange = unsavedText => {
    this.setState({ unsavedText })
  }

  render() {
    const { screenIndex, unsavedText } = this.state
    // const { opened, tokens, onWithdraw, onDeposit, proxyAddress } = this.props
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
              onChange={this.handleChange}
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
         {screenIndex === 0 && <Editor value={unsavedText} onChange={this.handleEditorChange} />} 
          {screenIndex === 1 && <Preview value={unsavedText} />}
        </div>
        <SidePanelSeparator style={{ margin: '15px -30px' }} />
        <Button mode="strong" wide>
          Update
        </Button>
      </div>
    )
  }
}

const TabBarWrapper = styled.div`
  margin: 0 -30px 30px;
`

export default PanelContent
