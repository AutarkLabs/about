import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Editor from './Editor'
import Preview from './Preview'

const EditorTabView = ({
  handleEditorChange,
  onCodeMirrorInit,
  screenIndex,
  unsavedText,
}) => (
  <div style={{ flex: '1', padding: '0', margin: '0', width: '100%' }}>
    {screenIndex === 0 && (
      <Editor
        content={unsavedText}
        onChange={handleEditorChange}
        onCodeMirrorInit={onCodeMirrorInit}
      />
    )}
    {screenIndex === 1 && <Preview content={unsavedText} />}
  </div>
)

export default EditorTabView
