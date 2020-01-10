import PropTypes from 'prop-types'
import React from 'react'
import {
  Button,
  ContextMenuItem,
  IconDown,
  IconGrid,
  Popover,
  Text,
  useLayout,
  useTheme,
} from '@aragon/ui'

const Actions = ({
  entriesLength,
  handleClickUpdateWidget,
  onClick,
  openerRef,
  setVisible,
  visible,
}) => {
  const theme = useTheme()
  const { layoutName } = useLayout()

  return (
    <React.Fragment>
      {layoutName === 'small' ? (
        <Button
          onClick={onClick}
          ref={openerRef}
          icon={<IconGrid />}
          display="icon"
          label="Actions Menu"
        />
      ) : (
        <Button onClick={onClick} ref={openerRef}>
          <IconGrid
            css={`
              color: ${theme.surfaceIcon};
            `}
          />
          <Text css="margin: 0 8px;">Actions</Text>
          <IconDown
            css={`
              color: ${theme.surfaceIcon};
              width: 16px;
            `}
          />
        </Button>
      )}
      <Popover
        visible={visible}
        opener={openerRef.current}
        onClose={() => setVisible(false)}
        placement="bottom-end"
        css={`
          display: flex;
          flex-direction: column;
          padding: 10px;
        `}
      >
        <ContextMenuItem onClick={() => handleClickUpdateWidget(0)}>
          Edit main column
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleClickUpdateWidget(1)}>
          {entriesLength === 2 ? 'Edit side column' : 'Add side column'}
        </ContextMenuItem>
      </Popover>
    </React.Fragment>
  )
}
Actions.propTypes = {
  entriesLength: PropTypes.number.isRequired,
  handleClickUpdateWidget: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  openerRef: PropTypes.object.isRequired,
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}

export default Actions
