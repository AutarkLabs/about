import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Editor from './Editor'
import Preview from './Preview'
import {SideBarScrollbarContainer} from '../styles'

const EditorTabView = ({
  handleEditorChange,
  onCodeMirrorInit,
  screenIndex,
  unsavedText,
  instance,
}) => (
  <div
    style={{
      flex: '1 1 auto',
      margin: '0',
      padding: '0',
      height: '100%',
    }}
  >
    <div
      style={{
        flex: '1',
        padding: '0',
        margin: '0',
        width: '100%',
        height: '100%',
      }}
    >
      <SideBarScrollbarContainer>

        {screenIndex === 0 && (
          <Editor
            instance={instance}
            content={unsavedText}
            onChange={handleEditorChange}
            onCodeMirrorInit={onCodeMirrorInit}
          />
        )}

        {screenIndex === 1 && <Preview content={unsavedText} />}
      </SideBarScrollbarContainer>
    </div>
  </div>
)

export default EditorTabView
