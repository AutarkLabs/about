import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Card } from '@aragon/ui'

import { EditButton, IconPencil, MarkdownPreview } from '../../shared'

const Widget = ({ id, content, handleClick, active }) => (
  <StyledCard height="fit-content">
    <CardContent>
      <EditButton mode="text" onClick={handleClick(id)} active={active}>
        <IconPencil />
      </EditButton>
      <MarkdownPreview content={content} />
    </CardContent>
  </StyledCard>
)

Widget.propTypes = {
  active: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
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
