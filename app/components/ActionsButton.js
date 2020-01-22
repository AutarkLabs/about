import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import {
  Button,
  ContextMenuItem,
  IconDown,
  IconGrid,
  Popover,
  textStyle,
  useLayout,
  useTheme,
} from '@aragon/ui'

const Actions = ({
  onClickEditLayout,
  onClickNewWidget,
}) => {
  const [ actionsMenuVisible, setActionsMenuVisible ] = useState(false)
  const actionsOpener = useRef(null)
  const theme = useTheme()
  const { layoutName } = useLayout()

  const handleClickEditLayout = () => {
    setActionsMenuVisible(false)
    onClickEditLayout()
  }

  const handleClickNewWidget = () => {
    setActionsMenuVisible(false)
    onClickNewWidget()
  }

  return (
    <React.Fragment>
      {layoutName === 'small' ? (
        <Button
          onClick={() => setActionsMenuVisible(true)}
          ref={actionsOpener}
          icon={<IconGrid />}
          display="icon"
          label="Actions Menu"
        />
      ) : (
        <Button onClick={() => setActionsMenuVisible(true)} ref={actionsOpener}>
          <IconGrid
            css={`
              color: ${theme.surfaceIcon};
            `}
          />
          <div css={`
            margin: 0 8px;
            ${textStyle('body2')}
          `}>
            Actions
          </div>
          <IconDown
            css={`
              color: ${theme.surfaceIcon};
              width: 16px;
            `}
          />
        </Button>
      )}
      <Popover
        visible={actionsMenuVisible}
        opener={actionsOpener.current}
        onClose={() => setActionsMenuVisible(false)}
        placement="bottom-end"
        css={`
          display: flex;
          flex-direction: column;
          padding: 10px;
        `}
      >
        <ContextMenuItem onClick={handleClickNewWidget}>
          New widget
        </ContextMenuItem>
        <ContextMenuItem onClick={handleClickEditLayout}>
          Edit layout
        </ContextMenuItem>
      </Popover>
    </React.Fragment>
  )
}
Actions.propTypes = {
  onClickEditLayout: PropTypes.func.isRequired,
  onClickNewWidget: PropTypes.func.isRequired,
}

export default Actions
