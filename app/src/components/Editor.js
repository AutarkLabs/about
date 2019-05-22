import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/theme/elegant.css'
// ambiance ambiance-mobile elegant idea neat neo ttcn xq-light 3024-day

// import dompurify from 'dompurify';

const Editor = ({ content, instance, onCodeMirrorInit, onChange }) => {
  useEffect(() => {
    instance && instance.setSize('100%', '100%')
  }, [instance])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        bottom: '0',
        overflowY: 'auto',
        padding: '30px',
      }}
    >
      <CodeMirror
        value={content}
        options={{
          mode: 'gfm',
          theme: 'elegant',
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
    </div>
  )
}

Editor.propTypes = {}

export default Editor
