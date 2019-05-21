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
  <div style={{ flex: '1' }}>
    {screenIndex === 0 && (
      <Editor
        value={unsavedText}
        onChange={handleEditorChange}
        onCodeMirrorInit={onCodeMirrorInit}
      />
    )}
    {screenIndex === 1 && <Preview value={unsavedText} />}
  </div>
)

export default EditorTabView
