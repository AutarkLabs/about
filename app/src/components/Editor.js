import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { UnControlled as CodeMirror } from 'react-codemirror2'
// import styled from 'styled-components'
// import { WidgetCardWrapper, WidgetCard, WidgetCardTitle, WidgetCardBody, BackgroundOverlay, EditableDiv } from '../../style'
// import { ipfsGet } from '../../utils/ipfs-helper'
// import { stringToContentEditable, contentEditableToString } from '../../utils/content-editable'
// import EditButton from './EditButton'
// import  {ipfsAdd}  from '../../utils/ipfs-helper'
// Load markdown css
// import '../../assets/markdown.css'
var markdown = require('markdown-it')({
  breaks: true,
  linkify: true,
  typographer: true,
})
require('codemirror/lib/codemirror.css')
require('codemirror/mode/markdown/markdown')

// import dompurify from 'dompurify';

const mock = `
# Hello

## This is markdown

- Ok
- *Bold*
- **Italics**
`

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
        onChange={(editor, data, value) => {
          props.onChange(value)
        }}
      />
    </div>
  )
}

Editor.propTypes = {}

export default Editor
