import { Card, GU, textStyle, theme } from '@aragon/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

// TODO: Compress illustration
import emptySvg from '../../assets/empty.svg'
import * as types from '../../utils/prop-types'
import { useEditMode } from '../../context/Edit'
import WidgetMapper from './WidgetMapper'
import { ReactSortable } from 'react-sortablejs'

const EmptyMessage = ({ primary }) => (
  <Card
    css={`
      flex: ${primary ? '2 1 20': '1 1 10'}ch;
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
}

EmptyMessage.defaultProps = {
  primary: false,
}

const Layout = ({ widgets }) => {
  //  TODO: A layout preview should come from store (when parsed in vote radspec)
  const { editMode, setEditedWidgets } = useEditMode()
  const originalPrimaryWidgets = widgets.filter(w => w.layout.primary)
  const originalSecondaryWidgets = widgets.filter(w => !w.layout.primary)
  const [ primaryWidgets, setPrimaryWidgets ] = useState(originalPrimaryWidgets)
  const [ secondaryWidgets, setSecondaryWidgets ] = useState(originalSecondaryWidgets)

  const updateColumns = () => {
    setPrimaryWidgets(originalPrimaryWidgets)
    setSecondaryWidgets(originalSecondaryWidgets)
  }

  useEffect(updateColumns, [ editMode, widgets ])

  const setPrimary = p => {
    const nextWidgets = p.map((e, i) => ({ ...e, index: i, layout: { primary: true } }))
    setPrimaryWidgets(nextWidgets)
  }

  const setSecondary = p => {
    const nextWidgets = p.map((e, i) => ({ ...e, index: i, layout: { primary: false } }))
    setSecondaryWidgets(nextWidgets)
  }

  useEffect(()=> {
    setEditedWidgets([...new Set([ ...primaryWidgets, ...secondaryWidgets ])])
  }, [ primaryWidgets, secondaryWidgets, setEditedWidgets ])


  if (!editMode) {
    return (
      <div css={`
      display: flex;
      flew-wrap: wrap;
    `}>
        <div css={`
          flex: 2 1 20ch;
        `}>
          {originalPrimaryWidgets.map(WidgetMapper)}
        </div>
        {originalSecondaryWidgets.length > 0 &&
          <div css={`
            flex: 1 1 10ch;
            margin-left: ${2 * GU}px;
          `}>
            {originalSecondaryWidgets.map(WidgetMapper)}
          </div>
        }
      </div>
    )
  }

  return (
    <div css={`
      display: flex;
      flew-wrap: wrap;
    `}>
      <div css={`
          flex: 2 1 20ch;
          margin-right: ${2 * GU}px;
          display: grid;
          grid-template-rows: 1fr;
        `}>
        {primaryWidgets.length === 0 &&
          <div css={`
            display: flex;
            grid-column: 1/1;
            grid-row: 1/1;
          `}>
            <EmptyMessage primary />
          </div>}
        <ReactSortable
          css={`
            grid-row: 1/1;
            grid-column: 1/1;
          `}
          group="widgets"
          list={primaryWidgets}
          primary
          setList={setPrimary}
        >
          {primaryWidgets.map(WidgetMapper)}
        </ReactSortable>
      </div>
      <div css={`
          flex: 1 1 10ch;
          display: grid;
          grid-template-rows: 1fr;
        `}>
        {secondaryWidgets.length === 0 &&
          <div css={`
            display: flex;
            grid-column: 1/1;
            grid-row: 1/1;
          `}>
            <EmptyMessage />
          </div>}
        <ReactSortable
          css={`
            grid-row: 1/1;
            grid-column: 1/1;
        `}
          group="widgets"
          list={secondaryWidgets}
          setList={setSecondary}
        >
          {secondaryWidgets.map(WidgetMapper)}
        </ReactSortable>
      </div>
    </div>
  )
}

Layout.propTypes = {
  widgets: PropTypes.arrayOf(types.widget).isRequired,
}

export default Layout
