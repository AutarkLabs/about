import React from 'react'
import PropTypes from 'prop-types'

import { Button, GU, Help } from '@aragon/ui'

const EditModeButtons = ({ onCancel, onSubmit }) => {
  return (
    <div css={`
      display: flex;
      align-items: center;
    `}>
      <Help hint="Drag and drop widgets to change the layout">
        Drag and drop widgets to change the layout.
      </Help>
      <Button css={`margin: 0 ${GU}px;`} label="Cancel" onClick={onCancel} />
      <Button label="Submit" mode="strong" onClick={onSubmit} />
    </div>
  )
}

EditModeButtons.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default EditModeButtons
