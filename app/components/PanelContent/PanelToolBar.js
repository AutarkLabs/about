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
} from '../../assets/toolbar'

const PanelToolBar = ({
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
    <EditToolBar>
      <EditToolBarButton theme={theme} onClick={setSelectionSize} compact>
        <TextSize />
      </EditToolBarButton>
      <EditToolBarButton theme={theme} onClick={setSelectionBold} compact>
        <Bold />
      </EditToolBarButton>
      <EditToolBarButton theme={theme} onClick={setSelectionItalic} compact>
        <Italic />
      </EditToolBarButton>
      <EditToolBarSeparator />
      <EditToolBarButton theme={theme} onClick={setSelectionQuote} compact>
        <Quote />
      </EditToolBarButton>
      <EditToolBarButton theme={theme} vonClick={setSelectionCode} compact>
        <Code />
      </EditToolBarButton>
      <EditToolBarButton theme={theme} onClick={setSelectionLink} compact>
        <Link />
      </EditToolBarButton>
      <EditToolBarButton
        theme={theme}
        onClick={setSelectionUnorderedList}
        compact
      >
        <List />
      </EditToolBarButton>
      <EditToolBarSeparator />
    </EditToolBar>
  )
}

const EditToolBar = styled.div`
  margin-bottom: 12px;
`

const EditToolBarButton = styled(Button)`
  width: 24px;
  height: 24px;
  text-align: center;
  padding: 0;
  margin: 1px;
`

const EditToolBarSeparator = styled.div`
  display: inline-block;
  width: 12px;
  height: 1px;
`

PanelToolBar.propTypes = {
  setSelectionBold: PropTypes.func.isRequired,
  setSelectionCode: PropTypes.func.isRequired,
  setSelectionItalic: PropTypes.func.isRequired,
  setSelectionLink: PropTypes.func.isRequired,
  setSelectionQuote: PropTypes.func.isRequired,
  setSelectionSize: PropTypes.func.isRequired,
  setSelectionUnorderedList: PropTypes.func.isRequired,
}

export default PanelToolBar
