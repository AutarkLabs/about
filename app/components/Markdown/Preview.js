import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Link as AragonLink, Checkbox, theme } from '@aragon/ui'

import MDReactComponent from 'react-markdown'

const Link = ({ children, ...props }) => (
  <AragonLink {...props} target="_blank">
    {children}
  </AragonLink>
)

Link.propTypes = {
  children: PropTypes.node
}

const ListItem = ({ checked, children, ...props }) => {
  let checkbox = null
  if (checked !== null) {
    checkbox = <Checkbox checked={checked} {...props} />
  }

  return React.createElement(
    'li',
    { className: checkbox ? 'task-list-item' : '' },
    checkbox,
    children
  )
}

ListItem.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node
}

const Preview = ({ content }) => {
  return (
    <MarkdownWrapper>
      <MDReactComponent
        source={content}
        renderers={{ link: Link, listItem: ListItem }}
      />
    </MarkdownWrapper>
  )
}

Preview.defaultProps = {
  content: '',
}

Preview.propTypes = {
  content: PropTypes.string,
}

const MarkdownWrapper = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  height: 1px;
  width: 100%;
  h1,
  h2 {
    padding-bottom: 0.3em;
    border-bottom: 1px solid ${theme.contentBorder};
  }
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.25em;
  }
  h4 {
    font-size: 1em;
  }
  h5 {
    font-size: 0.875em;
  }
  h6 {
    color: ${theme.textSecondary};
    font-size: 0.87em;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    line-height: 1.25;
    margin-bottom: 16px;
    margin-top: 24px;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  blockquote {
    padding: 0 1em;
    border-left: 4px solid ${theme.textTertiary};
    color: ${theme.textTertiary};
  }
  table {
    border-collapse: collapse;
  }
  pre {
    background-color: ${theme.mainBackground};
    border-radius: 3px;
    overflow: auto;
    padding: 1em;
  }
  p,
  blockquote,
  table,
  pre {
    margin: 1em 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
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
  tr {
    border-top: 1px solid ${theme.contentBorder};
  }
  tr:nth-child(2n) {
    background-color: #f8f8f8;
  }
  th,
  td {
    border: 1px solid ${theme.contentBorder};
    padding: 0.5em 1em;
  }
  img {
    max-width: 100%;
  }
  ul,
  ol {
    padding-left: 2em;
  }
  ol ol,
  ul ol {
    list-style-type: lower-roman;
  }
  ol ol ol,
  ol ul ol,
  ul ol ol,
  ul ul ol {
    list-style-type: lower-alpha;
  }
  li.task-list-item {
    list-style-type: none;
    position: relative;
    & > button:first-child {
      position: absolute;
      margin-left: 0;
      margin-top: 5px;
      right: 100%;
    }
  }
`

export default Preview
