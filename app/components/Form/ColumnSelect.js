import PropTypes from 'prop-types'
import React from 'react'
import { DropDown, Field } from '@aragon/ui'

const ColumnSelect = ({ onChange, value }) => (
  <Field
    label="Column"
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
  value: PropTypes.number.isRequired,
}

export default ColumnSelect
