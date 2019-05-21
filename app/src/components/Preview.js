import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { theme } from '@aragon/ui'
// import { WidgetCardWrapper, WidgetCard, WidgetCardTitle, WidgetCardBody, BackgroundOverlay, EditableDiv } from '../../style'
// import { ipfsGet } from '../../utils/ipfs-helper'
// import { stringToContentEditable, contentEditableToString } from '../../utils/content-editable'
// import EditButton from './EditButton'
// import  {ipfsAdd}  from '../../utils/ipfs-helper'
// Load markdown css
// import '../../assets/markdown.css'

import MDReactComponent from 'markdown-react-js'

const markdownContent = `
# Title

## Subtitle

### H3

- List
- Item
- Other

- [ ] Task
- [x] Completed

[Link](#)

*Emojis!* 🦄 🦅 🚀

**italics**

__something__
`

// import dompurify from 'dompurify';

const Preview = (props) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        bottom: '0',
        // backgroundColor: '#222',
      }}
    >
      <MarkdownWrapper>
        <MDReactComponent text={props.value} />
      </MarkdownWrapper>
    </div>
  )
}

Preview.propTypes = {}

const MarkdownWrapper = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    line-height: 1;
    cursor: text;
    position: relative;
    margin: 1em 0 15px;
    padding: 0;
  }
  h1 {
    font-size: 2.5em;
    border-bottom: 1px solid ${theme.contentBorder};
  }
  h2 {
    font-size: 2em;
    border-bottom: 1px solid ${theme.contentBorder};
  }
  h3 {
    font-size: 1.55em;
  }
  h4 {
    font-size: 1.2em;
  }
  h5 {
    font-size: 1em;
  }
  h6 {
    color: ${theme.textSecondary};
    font-size: 1em;
  }
  p,
  blockquote,
  table,
  pre {
    margin: 3px 0;
  }
  blockquote {
    padding: 0 15px;
    border-left: 4px solid ${theme.textTertiary};
    color: ${theme.textTertiary};
  }
  blockquote > :first-child {
    margin-top: 0;
  }
  blockquote > :last-child {
    margin-bottom: 10px;
  }

  a {
    color: ${theme.gradientStart};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  a > code,
  p > code {
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    padding: 0.2em 0.4em;
  }
  table {
    border-collapse: collapse;
  }
  tr {
    border-top: 1px solid ${theme.contentBorder};
  }
  tr:nth-child(2n) {
    background-color: #f8f8f8;
  }
  th,
  td {
    border: 1px solid ${theme.contentBorder};
    padding: 6px 13px;
  }
  img {
    max-width: 95%;
  }
  pre {
    margin: 0;
    background-color: ${theme.mainBackground};
    border-radius: 3px;
    overflow: auto;
    padding: 16px;
  }
  ul {
    padding-left: 30px;
  }
  li:last-of-type {
    padding-bottom: 1rem;
  }
  ol {
    padding-left: 30px;
    padding-bottom: 1rem;
  }
  ol li ul:first-of-type {
    margin-top: 0;
  }
`

export default Preview
