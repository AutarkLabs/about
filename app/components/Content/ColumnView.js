import PropTypes from 'prop-types'
import React from 'react'
import { useAragonApi } from '../../api-react'
import { BREAKPOINTS, breakpoint } from '@aragon/ui'

import Widget from './Widget'

const SingleColumn = ({ main: { isLoading, errorMessage, content, addr } }) => (
  <div
    css={`
      margin: 0 auto;
      min-width: 350px;
      max-width: ${BREAKPOINTS.large}px;
      width: 100%;
    `}
  >
    <Widget
      key={0}
      id={0}
      isLoading={isLoading}
      errorMessage={errorMessage}
      content={content}
      ipfsAddr={addr}
    />
  </div>
)

SingleColumn.propTypes = {
  main: PropTypes.shape({
    addr: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
  })
}

const DoubleColumn = ({ main, side }) => (
  <div
    css={`
      margin: 0 auto;
      max-width: ${BREAKPOINTS.large}px;
      width: 100%;
      ${breakpoint(
    'small',
    `
        display: grid;
        grid-gap: 30px;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      `
  )};
      ${breakpoint('medium', 'grid-template-columns: 8fr minmax(275px, 2fr)')};
    `}
  >
    <Widget
      key={0}
      id={0}
      isLoading={main.isLoading}
      errorMessage={main.errorMessage}
      content={main.content}
      ipfsAddr={main.addr}
    />
    <Widget
      key={1}
      id={1}
      isLoading={side.isLoading}
      errorMessage={side.errorMessage}
      content={side.content}
      ipfsAddr={side.addr}
    />
  </div>
)

DoubleColumn.propTypes = {
  main: PropTypes.shape({
    addr: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
  }).isRequired,
  side: PropTypes.shape({
    addr: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
  }).isRequired
}

const ColumnView = () => {
  const {
    appState: { entries },
  } = useAragonApi()
  if (entries.length === 1) return <SingleColumn main={entries[0]} />
  return <DoubleColumn main={entries[0]} side={entries[1]} />
}

export default ColumnView
