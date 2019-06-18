import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Card, SafeLink, theme } from '@aragon/ui'

import { EditButton, MarkdownPreview } from '../../shared'

const Widget = ({ active, content, handleClick, id, ipfsAddr }) => {
  return (
    <StyledCard>
      {ipfsAddr !== '' ? (
        <React.Fragment>
          <EditButton onClick={handleClick(id)} active={active} />
          <MarkdownPreview content={content} />
        </React.Fragment>
      ) : <SafeLink onClick={handleClick(id)}>Update</SafeLink>}
    </StyledCard>
  )
}

Widget.propTypes = {
  active: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  ipfsAddr: PropTypes.string.isRequired,
}

const StyledCard = styled(Card).attrs({
  height: 'fit-content',
})`
  width: 100%;
  margin-bottom: 30px;
  position: relative;
  padding: 24px;
  ${EditButton} {
    background: rgba(255, 255, 255, 0.9);
    position: absolute;
    top: 24px;
    right: 24px;
    opacity: 0;
    transition: opacity 0.25s;
    svg {
      transition: fill 0.3s ease;
    }
    :hover svg {
      fill: ${theme.accent};
    }
  }
  :hover ${EditButton} {
    opacity: 1;
  }
`

export default Widget
