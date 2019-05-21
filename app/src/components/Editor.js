import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Controlled as CodeMirror } from 'react-codemirror2'

require('codemirror/lib/codemirror.css')
require('codemirror/mode/markdown/markdown')

// import dompurify from 'dompurify';

const Editor = props => {
  return (
    <div>
      <CodeMirror
        style={{ width: '100%' }}
        value={props.content}
        options={{
          mode: 'markdown',
          theme: 'material',
        }}
        editorDidMount={editor => {
          props.onCodeMirrorInit(editor)
        }}
        onBeforeChange={(editor, data, value) => {
          props.onChange(value)
        }}
        onChange={(editor, data, value) => {
          props.onChange(value)
        }}
      />
    </div>
  )
}

Editor.propTypes = {}

export default Editor
