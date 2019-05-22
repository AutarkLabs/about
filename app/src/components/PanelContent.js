import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button, SidePanelSeparator } from '@aragon/ui'

import TypeInput from './TypeInput'
import EditorTabBar from './EditorTabBar'
import EditorTabView from './EditorTabView'

const mockedText = `
GitHub Flavored Markdown
========================

# Title

## Subtitle
  
### H3
  
- List
- Item
- Other
  
- [ ] Task
- [x] Completed
  
[Link](#)
  
*italic!* 🦄 🦅 🚀
:+1:
  
**bold**
  
~~something~~

\`\`\`javascript
for (var i = 0; i < items.length; i++) {
    console.log(items[i], i); // log them
}
\`\`\`

### And now:

![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)

\`\`\`html
<head>
  <script>
    const myFunc = 5;
    function hello(param1) {
      doSomething()
    }
  </script>
</head>
<body>
  <h1>Hello</h1>
  <div class='hello' style="width=5px;">
    Content
  </div>
</body>
\`\`\`
  
[I'm an inline-style link](https://www.google.com)

Here's our logo (hover to see the title text):
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"
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

export default PanelContent
