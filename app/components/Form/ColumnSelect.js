import PropTypes from 'prop-types'
import React from 'react'
import { DropDown, Field, GU } from '@aragon/ui'

const ColumnSelect = ({ onChange, value }) => (
  <Field
    label="Column"
    css={`margin-top: ${3 * GU}px;`}
  >
    <DropDown
      items={[ 'Primary', 'Secondary' ]}
      selected={value}
      onChange={onChange}
      wide
    />
  </Field>
)

ColumnSelect.propTypes ={
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
}

export default ColumnSelect
