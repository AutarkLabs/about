import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Card, theme } from '@aragon/ui'

import { EditButton, MarkdownPreview } from '../../shared'

const mainInitialText = `This is your custom about app. Edit these blocks by hovering over it. Set it to become your default home app by selecting it in "Settings". Find out more [here](link). In the future this app will provide much more flexibility with what you can add to it!
You may want to use this section to provide an overview of your DAO and how people can get involved.`

const sideInitialText = `This section may be good to include social links.`

const DemoContent = ({ id }) => {
  return (
    <div style={{ padding: '0', width: '100%'}}>
      <MarkdownPreview
        content={
          id === 0 ? '# Welcome to my DAO' : '# Get involved into my DAO'
        }
      />
      <br />
      <br />
      <MarkdownPreview content={id === 0 ? mainInitialText : sideInitialText} />
    </div>
  )
}

const Widget = ({
  id,
  content,
  isLoading,
  active,
  ipfsAddr,
  errorMessage,
}) => {
  return (
    <StyledCard>
      {content !== '' ? (
        <MarkdownPreview content={content} />
      ) : (
        <DemoContent id={id} />
      )}
    </StyledCard>
  )
}

Widget.propTypes = {
  content: PropTypes.string,
  id: PropTypes.number.isRequired,
  ipfsAddr: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  errorMessage: PropTypes.node,
}

const StyledCard = styled(Card).attrs({
  height: 'fit-content',
})`
  width: 100%;
  margin-bottom: 30px;
  position: relative;
  padding: 24px;
`

export default Widget
