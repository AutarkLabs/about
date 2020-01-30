import React from 'react'
import PropTypes from 'prop-types'

import { Button, GU } from '@aragon/ui'

const EditModeButtons = ({ onCancel, onSubmit }) => {
  return (
    <>
      <Button css={`margin-right: ${GU}px;`} label="Cancel" onClick={onCancel} />
      <Button label="Submit" mode="strong" onClick={onSubmit} />
    </>
  )
}

EditModeButtons.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default EditModeButtons