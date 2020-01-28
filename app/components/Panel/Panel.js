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
// TODO: Encode as part of constant object with needsConfig key


const getWidgetType = widget => Object.keys(widgetType)[widget]

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

  const handleClick = useCallback(async () => {
    const widgetObject = {
      layout: {
        primary: !column // Will be true when the ColumnSelect value is Primary
      },
      type: getWidgetType(widget)
    }
    if (configData) widgetObject.data = configData

    // TODO: wrap in try catch and handle errors
    // TODO: graceful loading indicator

    onSubmit(widgetObject)
  }, [ column, configData, widget ])

  const needsConfig = getWidgetType(widget) !== 'VOTES' && getWidgetType(widget) !== 'DOT_VOTES'
  const submitDisabled = widget === undefined || (needsConfig && configData === undefined)
  
  //  TODO: handle when selecting another widget once configData is set (we should reset on widget change)

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
