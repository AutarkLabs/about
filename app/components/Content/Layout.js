import { Button, Card, GU, IconArrowDown, IconArrowLeft, IconArrowRight, IconArrowUp, SidePanelSeparator, textStyle, theme } from '@aragon/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

// TODO: Compress illustration
import emptySvg from '../../assets/empty.svg'
import * as types from '../../utils/prop-types'
import MarkdownPreview from '../Widget/Markdown/Preview'
import Voting from '../Widget/Voting/Voting'
import { useEditMode } from '../../context/Edit'


const STYLE_GAP = `${2 * GU}px;`

const setupWidgetStyle = ({ primary }) => {
  const primaryStyle = `
    align-items: stretch;
    display: flex;
    flex-direction: column;
    grid-column: 1 / span 1;
    height: auto;
    justify-content: center;
    overflow: hidden;
    padding: ${2.25 * GU}px ${3 * GU}px ${3 * GU}px;
    width: auto;
  `
  const secondaryStyle = `
    align-items: stretch;
    display: flex;
    flex-direction: column;
    grid-column: 2 / span 1;
    height: auto;
    justify-content: center;
    overflow: hidden;
    padding: ${2.25 * GU}px ${3 * GU}px ${3 * GU}px;
    width: auto;
  `
  return primary ? primaryStyle : secondaryStyle
}

// TODO: encode this in types constant along with widgetSelect
const LABELS = {
  ACTIVITY: 'Activity feed',
  DOT_VOTES: 'Latest dot votes',
  MARKDOWN: 'Markdown',
  VOTES: 'Latest votes',
}

const HeaderArrows = () => {
  return (
    <>
    <Button
      css={`
      margin-right: ${GU}px;
    `}
      disabled
      display="icon"
      icon={<IconArrowLeft />}
      label="Move to primary column"
      onClick={() => {}}
    />
  <Button
    css={`
      margin-right: ${GU}px;
    `}
    disabled
    display="icon"
    icon={<IconArrowUp />}
    label="Move up"
    onClick={() => {}}
  />
  <Button
    css={`
      margin-right: ${GU}px;
    `}
    display="icon"
    icon={<IconArrowDown />}
    label="Move down"
    onClick={() => {}}
  />
  <Button
    display="icon"
    icon={<IconArrowRight />}
    label="Move to secondary column"
    onClick={() => {}}
  />
  </>
  )
}

// TODO: Read from grid CSS or generated layout mapping to dynamically show/hide buttons
const WidgetHeader = ({ type }) => {
  const { editMode } = useEditMode()
  const label = LABELS[type]
  return (
    <>
      <div
        css={`
          display: flex;
          flex: 0 0 ${5 * GU}px;
          align-items: center;
          ${textStyle('body1')}
        `}
      >
        <span css={'flex: 1 0 auto'}>{label}</span>
        {editMode && <HeaderArrows />}
      </div>
      <SidePanelSeparator
        css={`
          margin: ${3 * GU}px -${3 * GU}px;
        `}
      />
    </>
  )
}

WidgetHeader.propTypes = {
  // TODO: adjust to exact types
  type: PropTypes.oneOf(Object.keys(LABELS)).isRequired,
}

const Widget = ({ children, layout, type, ...props }) => {
  const { editMode } = useEditMode()
  return (
    <Card css={setupWidgetStyle(layout)}>
      {(type !== 'MARKDOWN' || editMode) && <WidgetHeader type={type} />}
      {children && React.cloneElement(children, props)}
    </Card>
  )
}

Widget.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.exact({
    primary: PropTypes.bool,
    wide: PropTypes.bool,
  }),
  // TODO: adjust to exact types
  type: PropTypes.string,
}

const WidgetContent = ({ data, type }) => {
  switch (type) {
  case 'MARKDOWN':
    return <MarkdownPreview content={data} />
  case 'VOTES':
    return <Voting />
  }
}

WidgetContent.propTypes = {
  data: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  // TODO: adjust to exact types
  type: PropTypes.string,
}

const WidgetMapper = ({ cId, data, layout, type }, i) => {
  // TODO: better uuid for key
  return (
    <Widget key={i /*cId.slice(2,10)*/} layout={layout} type={type}>
      <div css={'flex: 1 0 auto;'}>
        <WidgetContent data={data} type={type} />
      </div>
    </Widget>
  )
}

WidgetMapper.propTypes = {
  cId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  layout: PropTypes.exact({
    primary: PropTypes.bool,
    wide: PropTypes.bool,
  }).isRequired,
  type: PropTypes.oneOf(Object.keys(LABELS)).isRequired
}

const EmptyMessage = ({ primary, span }) => (
  <Card
    css={`
      ${setupWidgetStyle({ primary })}
      grid-row: span ${span};
      height: 84vh;
      justify-content: center;
      align-items: center;
    `}
  >
    <div css={`width: ${35 * GU}px;
      align-items: center;
      display: flex;
      flex-direction:  column;
      `}>
      <img
        css={`
            /* height: 160px; */
            margin-bottom: ${3 * GU}px;
          `}
        src={emptySvg}
        alt="No information here"
      />
      <div
        css={`
      color: ${theme.content};
      ${textStyle('title4')}
      `}
      >
      No widgets here
      </div>
      {primary && <div
        css={`
         /* No aragon color defined for this */
        color: #637381;
        margin: ${1 * GU}px 0;
        text-align: center;
        ${textStyle('body2')}
      `}
      >
      Add a new widget or move an existing one to this primary column
      </div>}
    </div>
  </Card>
)

EmptyMessage.propTypes = {
  primary: PropTypes.bool,
  span: PropTypes.number.isRequired,
}

const Layout = ({ widgets }) => {
  const [ primaryEmpty, setPrimaryEmpty ] = useState(true)
  const [ secondaryEmpty, setSecondaryEmpty ] = useState(true)
  const { editMode } = useEditMode()

  useEffect(() => {
    if (widgets.filter(w => w.layout.primary === true).length > 0) {
      setPrimaryEmpty(false)
    }
    if (widgets.filter(w => w.layout.primary === false).length > 0) {
      setSecondaryEmpty(false)
    }
  }, [widgets])

  const mappedWidgets = widgets.map(WidgetMapper)
  const twoColumns = secondaryEmpty && editMode

  return (
    <div
      css={`
        margin-bottom: ${STYLE_GAP};
        display: grid;
        grid-template-columns: ${(twoColumns || !secondaryEmpty) ? '2fr ' : ''}1fr;
        grid-gap: 1rem;
        grid-auto-flow: dense;
        /* TODO:  layout small and span 2 + padding */
      `}
    >
      {primaryEmpty && <EmptyMessage primary span={widgets.length}/>}
      {mappedWidgets}
      {twoColumns && <EmptyMessage span={widgets.length}/>}
    </div>
  )
}

Layout.propTypes = {
  widgets: PropTypes.arrayOf(types.widget),
}

export default Layout
