import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/theme/elegant.css'
// ambiance ambiance-mobile elegant idea neat neo ttcn xq-light 3024-day

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
    </SideBarScrollbarContainer>
  )
}

Editor.propTypes = {}

export default Editor
