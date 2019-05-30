import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Card, Text } from '@aragon/ui'

import { EditButton, IconPencil, MarkdownPreview } from '../../shared'

const Widget = ({ id, content, isLoading, handleClick, active, ipfsAddr }) => {
  return (
    <StyledCard height="fit-content">
      <CardContent>
        <EditButton mode="text" onClick={handleClick(id)} active={active}>
          <IconPencil />
        </EditButton>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <MarkdownPreview content={content} />
        )}
      </CardContent>
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

const CardContent = styled.div`
  padding: 24px;
  :hover > ${EditButton} {
    opacity: 1;
  }
`

const StyledCard = styled(Card)`
  width: 100%;
  margin-bottom: 30px;
  position: relative;
`

export default Widget
