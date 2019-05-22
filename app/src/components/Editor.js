import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/theme/idea.css'
// ambiance ambiance-mobile elegant idea neat neo ttcn xq-light 3024-day

// import dompurify from 'dompurify';

const Editor = ({ content, instance, onCodeMirrorInit, onChange }) => {
  useEffect(() => {
    instance && instance.setSize('100%', '100%')
  }, [instance])

  return (
      <CodeMirror
        value={content}
        options={{
          mode: 'gfm',
          theme: 'idea',
          lineWrapping: true,
          autofocus: true,
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
  )
}

Editor.propTypes = {}

export default Editor
