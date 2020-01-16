import PropTypes from 'prop-types'
import React from 'react'
import { DropDown, Field } from '@aragon/ui'

const SourceSelect = ({ onChange, value }) => (
  <Field label="Source">
    <DropDown
      items={[
        'Custom',
        'External URL (.md file)',
        'IPFS hash (.md file)',
      ]}
      selected={value}
      onChange={onChange}
      wide
    />
  </Field>
)

SourceSelect.propTypes ={
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
}

export default SourceSelect
