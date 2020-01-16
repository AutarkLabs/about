import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Button, useTheme } from '@aragon/ui'

import {
  Bold,
  Code,
  Italic,
  Link,
  List,
  Quote,
  TextSize,
} from '../../../assets/toolbar'

const ToolBar = ({
  setSelectionBold,
  setSelectionCode,
  setSelectionItalic,
  setSelectionLink,
  setSelectionQuote,
  setSelectionSize,
  setSelectionUnorderedList,
}) => {
  const theme = useTheme()
  return (
    <ToolBarBox>
      <ToolBarButton theme={theme} onClick={setSelectionSize} compact>
        <TextSize />
      </ToolBarButton>
      <ToolBarButton theme={theme} onClick={setSelectionBold} compact>
        <Bold />
      </ToolBarButton>
      <ToolBarButton theme={theme} onClick={setSelectionItalic} compact>
        <Italic />
      </ToolBarButton>
      <ToolBarSeparator />
      <ToolBarButton theme={theme} onClick={setSelectionQuote} compact>
        <Quote />
      </ToolBarButton>
      <ToolBarButton theme={theme} vonClick={setSelectionCode} compact>
        <Code />
      </ToolBarButton>
      <ToolBarButton theme={theme} onClick={setSelectionLink} compact>
        <Link />
      </ToolBarButton>
      <ToolBarButton
        theme={theme}
        onClick={setSelectionUnorderedList}
        compact
      >
        <List />
      </ToolBarButton>
      <ToolBarSeparator />
    </ToolBarBox>
  )
}

const ToolBarBox = styled.div`
  margin-bottom: 12px;
`

const ToolBarButton = styled(Button)`
  width: 24px;
  height: 24px;
  text-align: center;
  padding: 0;
  margin: 1px;
`

const ToolBarSeparator = styled.div`
  display: inline-block;
  width: 12px;
  height: 1px;
`

ToolBar.propTypes = {
  setSelectionBold: PropTypes.func.isRequired,
  setSelectionCode: PropTypes.func.isRequired,
  setSelectionItalic: PropTypes.func.isRequired,
  setSelectionLink: PropTypes.func.isRequired,
  setSelectionQuote: PropTypes.func.isRequired,
  setSelectionSize: PropTypes.func.isRequired,
  setSelectionUnorderedList: PropTypes.func.isRequired,
}

export default ToolBar
