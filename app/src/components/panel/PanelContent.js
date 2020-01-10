import PropTypes from 'prop-types'
import React, { useState } from 'react'

import {
  Button,
  GU,
  RADIUS,
  SidePanelSeparator,
  Tabs,
  useTheme,
} from '@aragon/ui'

import {
  wrapTextWith,
  insertLink,
  insertHeader,
  insertOnStartOfLines,
} from '../../shared/codemirror-utils'

import { MarkdownEditor, MarkdownPreview } from '../../shared'
import TypeInput from '../TypeInput'
import PanelToolBar from './PanelToolBar'

const CONTENT = {
  EDITOR: 0,
  PREVIEW: 1,
  INPUT: 2,
}

const PanelContent = () => {
  const [editor, setEditor] = useState()
  const [unsavedText, setUnsavedText] = useState()
  const [type, setType] = useState(0)
  const [contentArea, setContentArea] = useState(CONTENT.EDITOR)
  const theme = useTheme()

  const setSelectionSize = () => {
    insertHeader(editor)
  }

  const setSelectionUnorderedList = () => {
    insertOnStartOfLines(editor, '* ')
  }

  const setSelectionBold = async () => {
    wrapTextWith(editor, '**')
  }

  const setSelectionItalic = () => {
    wrapTextWith(editor, '*')
  }

  const setSelectionLink = () => {
    insertLink(editor, false)
  }

  const setSelectionCode = () => {
    wrapTextWith(editor, '`')
  }

  const setSelectionQuote = () => {
    insertOnStartOfLines(editor, '> ')
  }

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        overflow: hidden;
        flex: 1;
        max-height: 100%;
      `}
    >
      {/* <> */}
      <TypeInput value={type} onChange={setType} />
      <div
        css={`
          > :first-child {
            border: 1px solid ${theme.border};
            border-radius: ${RADIUS}px;
          }
        `}
      >
        <Tabs
          items={['Write', 'Preview']}
          selected={contentArea}
          onChange={setContentArea}
        />
      </div>
      {contentArea === CONTENT.EDITOR && (
        <>
          <PanelToolBar
            setSelectionBold={setSelectionBold}
            setSelectionCode={setSelectionCode}
            setSelectionItalic={setSelectionItalic}
            setSelectionLink={setSelectionLink}
            setSelectionQuote={setSelectionQuote}
            setSelectionSize={setSelectionSize}
            setSelectionUnorderedList={setSelectionUnorderedList}
          />
          <MarkdownEditor
            editor={editor}
            value={unsavedText}
            onChange={setUnsavedText}
            setEditor={setEditor}
          />
        </>
      )}

      {contentArea === CONTENT.PREVIEW && (
        <MarkdownPreview content={unsavedText} />
      )}

      <div
        css={`
          flex: 0 0 ${8 * GU}px;
        `}
      >
        <SidePanelSeparator
          css={`
            margin-bottom: ${3 * GU}px;
          `}
        />
        <Button mode="strong" wide>
          Submit
        </Button>
      </div>
    </div>
  )
}

PanelContent.propTypes = {}

export default PanelContent
