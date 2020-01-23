import PropTypes from 'prop-types'
import React from 'react'
import { useAragonApi } from '../../api-react'
import { BREAKPOINTS, breakpoint } from '@aragon/ui'

import Widget from './Widget'

const SingleColumn = ({ main: {
  isLoading,
  errorMessage,
  type,
  data,
  addr,
} }) => (
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
      type={type}
      data={data}
      ipfsAddr={addr}
    />
  </div>
)

SingleColumn.propTypes = {
  main: PropTypes.shape({
    addr: PropTypes.string,
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    errorMessage: PropTypes.string,
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
      type={main.type}
      data={main.data}
      ipfsAddr={main.addr}
    />
    <Widget
      key={1}
      id={1}
      isLoading={side.isLoading}
      errorMessage={side.errorMessage}
      type={side.type}
      data={side.data}
      ipfsAddr={side.addr}
    />
  </div>
)

DoubleColumn.propTypes = {
  main: PropTypes.shape({
    addr: PropTypes.string,
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,
  }).isRequired,
  side: PropTypes.shape({
    addr: PropTypes.string,
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,
  }).isRequired
}

const ColumnView = () => {
  const {
    appState: { widgets },
  } = useAragonApi()
  if (widgets.length === 1) return <SingleColumn main={widgets[0]} />
  return <DoubleColumn main={widgets[0]} side={widgets[1]} />
}

export default ColumnView
