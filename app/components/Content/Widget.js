import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card } from '@aragon/ui'
import MarkdownPreview from '../Widget/Markdown/Preview'
import Votes from './Votes'
import { TYPE_MARKDOWN, TYPE_VOTES } from '../../utils/constants'

const Widget = ({ type, data }) => {
  return (
    <StyledCard>
      <WidgetSelector type={type} data={data} />
    </StyledCard>
  )
}

Widget.propTypes = {
  type: PropTypes.symbol.isRequired,
  data: PropTypes.object.isRequired,
}

const StyledCard = styled(Card).attrs({
  height: 'fit-content',
})`
  width: 100%;
  margin-bottom: 30px;
  position: relative;
  padding: 24px;
`

const WidgetSelector = ({ type, data }) => {
  switch(type) {
  case TYPE_MARKDOWN:
    return <MarkdownPreview content={data.content} />
  case TYPE_VOTES:
    return <Votes data={data} />
  }
}

WidgetSelector.propTypes = {
  type: PropTypes.symbol.isRequired,
  data: PropTypes.object.isRequired,
}

export default Widget
