import React from 'react'
// import PropTypes from 'prop-types'

import { MarkdownEditor, MarkdownPreview } from '../../shared'
import { MarkdownContainer, SideBarScrollbarContainer } from '../../styles'

const PanelTabView = ({
  handleEditorChange,
  onCodeMirrorInit,
  screenIndex,
  unsavedText,
  instance,
}) => (
  <div
    style={{
      flex: '1 1 auto',
      margin: '0',
      padding: '0',
      height: '100%',
    }}
  >
    <div
      style={{
        flex: '1',
        padding: '0',
        margin: '0',
        width: '100%',
        height: '100%',
      }}
    >
      <MarkdownContainer>
        {screenIndex === 0 && (
          <MarkdownEditor
            instance={instance}
            content={unsavedText}
            onChange={handleEditorChange}
            onCodeMirrorInit={onCodeMirrorInit}
          />
        )}

        {screenIndex === 1 && (
          <SideBarScrollbarContainer>
            <MarkdownPreview content={unsavedText} />
          </SideBarScrollbarContainer>
        )}
      </MarkdownContainer>
    </div>
  </div>
)

export default PanelTabView
