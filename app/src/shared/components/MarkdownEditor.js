import React, { useEffect } from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
// ambiance ambiance-mobile elegant idea neat neo ttcn xq-light 3024-day
import { BaseStyles, GU, RADIUS, textStyle, useTheme } from '@aragon/ui'

// import dompurify from 'dompurify';

const Editor = ({ content, instance, onCodeMirrorInit, onChange }) => {
  const theme = useTheme()

  useEffect(() => {
    instance && instance.setSize('100%', '100%')
  }, [instance])

  useEffect(() => {
    instance && instance.focus()
  }, [onChange])

  return (
    <CodeMirror
      value={content}
      options={{
        mode: 'gfm',
        lineWrapping: true,
      }}
      editorDidMount={editor => {
        onCodeMirrorInit(editor)
      }}
      onBeforeChange={(_editor, _data, value) => {
        onChange(value)
      }}

      css={`
          max-height: calc(100% - 65px) !important;
          overflow-y: auto;
          padding: ${GU}px !important;
          border: 1px solid ${theme.border};
          border-radius: ${RADIUS}px;
          && .CodeMirror-code {
            font-family: aragon-ui; sans-serif;
            color: ${theme.surfaceContent};
            ${textStyle('body3')};
          }
          && .CodeMirror-scroll {
            min-height: ${30 * GU}px !important;
          }
        `}
    />
  )
}

Editor.propTypes = {}

export default Editor
