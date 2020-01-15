import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card } from '@aragon/ui'
import MarkdownPreview from '../Markdown/Preview'

const Widget = ({ content }) => {
  return (
    <StyledCard>
      <MarkdownPreview content={content} />
    </StyledCard>
  )
}

Widget.propTypes = {
  content: PropTypes.string,
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
