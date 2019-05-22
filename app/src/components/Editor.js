import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown'
// Dark mode css
//import 'codemirror/theme/material.css'

// import dompurify from 'dompurify';
import {SideBarScrollbarContainer} from '../styles'

const Editor = ({ content, instance, onCodeMirrorInit, onChange }) => {
  useEffect(() => {
    instance && instance.setSize('100%', '100%')
  }, [instance])

  return (
    <SideBarScrollbarContainer>
      <CodeMirror
        value={content}
        options={{
          mode: 'markdown',
          theme: 'material',
          lineWrapping: true,
        }}
        editorDidMount={editor => {
          onCodeMirrorInit(editor)
        }}
        onBeforeChange={(editor, data, value) => {
          onChange(value)
        }}
        onChange={(editor, data, value) => {
          onChange(value)
        }}
      />
    </SideBarScrollbarContainer>
  )
}

Editor.propTypes = {}

export default Editor
