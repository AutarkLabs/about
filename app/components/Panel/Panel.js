import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button } from '@aragon/ui'

import ColumnSelect from '../Form/ColumnSelect'
import WidgetSelect from '../Form/WidgetSelect'
import MarkdownConfig from '../Widget/Markdown/Markdown'
import ActivityFeedConfig from '../Widget/ActivityFeed/PanelConfig/ActivityFeedConfig'

const widgetType = {
  MARKDOWN: 0,
  ACTIVITY: 1,
  VOTES: 2,
  DOT_VOTES: 3
}

const WidgetConfig = ({ type }) => {
  switch (type) {
  case widgetType.MARKDOWN:
    return <MarkdownConfig />
  case widgetType.ACTIVITY:
    return <ActivityFeedConfig />

  case widgetType.VOTES:
  case widgetType.DOT_VOTES:    
  default:
    return null
  }
}

WidgetConfig.propTypes ={
  type: PropTypes.oneOf(Object.values(widgetType))
}

const Panel = () => {
  const [ column, setColumn ] = useState(0)
  const [ widget, setWidget ] = useState()

  const submitDisabled = widget === undefined

  return (
    <>
        <ColumnSelect value={column} onChange={setColumn} />
        <WidgetSelect value={widget} onChange={setWidget} />
        <WidgetConfig type={widget} />
        <Button disabled={submitDisabled} label="Submit" mode="strong" wide />
    </>
  )
}

export default Panel
