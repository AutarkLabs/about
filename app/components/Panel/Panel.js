import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { Button } from '@aragon/ui'

import ColumnSelect from '../Form/ColumnSelect'
import WidgetSelect from '../Form/WidgetSelect'
import MarkdownConfig from '../Widget/Markdown/Markdown'
import ActivityFeedConfig from '../Widget/ActivityFeed/PanelConfig/ActivityFeedConfig'

// TODO: encode this in types constant along with widgetSelect
const widgetType = {
  MARKDOWN: 0,
  ACTIVITY: 1,
  VOTES: 2,
  DOT_VOTES: 3
}

const WidgetConfig = ({ data, type, setData }) => {
  switch (type) {
  case widgetType.MARKDOWN:
    return <MarkdownConfig data={data} setData={setData}/>
  case widgetType.ACTIVITY:
    return <ActivityFeedConfig />

  case widgetType.VOTES:
  case widgetType.DOT_VOTES:
  default:
    return null
  }
}

WidgetConfig.propTypes ={
  data: PropTypes.string,
  type: PropTypes.oneOf(Object.values(widgetType)),
  setData: PropTypes.func
}

const Panel = ({ onSubmit }) => {
  const [ column, setColumn ] = useState(0)
  const [ configData, setConfigData  ] = useState()
  const [ widget, setWidget ] = useState()

  const handleClick = useCallback(() => {
    const widgetObject = {
      data: configData,
      layout: {
        primary: !column // Will be true when the ColumnSelect value is Primary
      },
      type: Object.keys(widgetType)[widget]
    }
    onSubmit(widgetObject)
  }, [ column, configData, widget ])

  // TODO: also track WidgetConfig content to set submitDisabled
  const submitDisabled = widget === undefined || configData === undefined

  return (
    <>
        <ColumnSelect value={column} onChange={setColumn} />
        <WidgetSelect value={widget} onChange={setWidget} />
        <WidgetConfig type={widget} data={configData} setData={setConfigData}/>
        <Button disabled={submitDisabled} label="Submit" mode="strong" onClick={handleClick} wide />
    </>
  )
}

Panel.propTypes ={
  onSubmit: PropTypes.func.isRequired
}

export default Panel
