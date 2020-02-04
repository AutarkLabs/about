import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { Button, GU } from '@aragon/ui'

import ColumnSelect from '../Form/ColumnSelect'
import WidgetSelect from '../Form/WidgetSelect'
import MarkdownConfig from '../Widget/Markdown/Markdown'
// import ActivityFeedConfig from '../Widget/ActivityFeed/PanelConfig/ActivityFeedConfig'
import { uuid } from '../../utils/helpers'

// TODO: encode this in types constant along with widgetSelect
const widgetType = {
  MARKDOWN: 0,
  NONE: -1,
  VOTES: 1,
  // ACTIVITY: 1,
  // VOTES: 2,
  // DOT_VOTES: 3
}
// TODO: Encode as part of constant object with needsConfig key


const getWidgetType = widgetNumber => Object.keys(widgetType).find(key => widgetType[key] === widgetNumber)

const WidgetConfig = ({ data, type, setData }) => {
  switch (type) {
  case widgetType.MARKDOWN:
    return <MarkdownConfig data={data} setData={setData} />
    // case widgetType.ACTIVITY:
    // return <ActivityFeedConfig />

  case widgetType.VOTES:
  case widgetType.DOT_VOTES:
  default:
    return null
  }
}

WidgetConfig.propTypes ={
  data: PropTypes.string,
  setData: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.values(widgetType)),
}

WidgetConfig.defaultProps ={
  data: '',
  type: widgetType.NONE,
}

const Panel = ({ onSubmit, editWidget }) => {
  const [ column, setColumn ] = useState(
    editWidget ? editWidget.layout.primary ? 0 : 1 : 0
  )
  const [ configData, setConfigData ] = useState(
    editWidget ? editWidget.data : ''
  )
  const [ widget, setWidget ] = useState(editWidget ? 0 : -1)

  const handleClick = useCallback(async () => {
    const widgetObject = {
      id: editWidget ? editWidget.id : uuid(),
      layout: {
        primary: !column, // Will be true when the ColumnSelect value is Primary
      },
      type: getWidgetType(widget),
    }
    if (configData) widgetObject.data = configData

    // TODO: wrap in try catch and handle errors
    // TODO: graceful loading indicator

    onSubmit(widgetObject)
  }, [ editWidget, column, configData, onSubmit, widget ])

  // TODO: Refactor into an array filter / find
  const needsConfig = getWidgetType(widget) !== 'VOTES' && getWidgetType(widget) !== 'DOT_VOTES' && getWidgetType(widget) !== 'NONE'
  const submitDisabled = widget === undefined || (needsConfig && configData === undefined)

  //  TODO: handle when selecting another widget once configData is set (we should reset on widget change)

  return (
    <div css={`
      padding-top: ${3 * GU}px;
    `}>
      { !editWidget && (
        <>
          <ColumnSelect value={column} onChange={setColumn} />
          <WidgetSelect value={widget} onChange={setWidget} />
        </>
      )}
      <WidgetConfig type={widget} data={configData} setData={setConfigData} />
      <Button disabled={submitDisabled} label="Submit" mode="strong" onClick={handleClick} wide />
    </div>
  )
}

Panel.propTypes = {
  editWidget: PropTypes.shape({
    data: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    layout: PropTypes.shape({
      primary: PropTypes.bool.isRequired,
    }),
    type: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
}

Panel.defaultProps = {
  editWidget: null,
}

export default Panel
