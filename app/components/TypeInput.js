import PropTypes from 'prop-types'
import React from 'react'
import { DropDown, Field, GU } from '@aragon/ui'

const TypeInput = ({ onChange, value }) => (
  <Field
    label="Type"
    css={`
      margin-top: ${3 * GU}px;
    `}
  >
    <DropDown
      items={[
        'Custom markdown',
        'External URL (.md file)',
        'IPFS hash (.md file)',
      ]}
      selected={value}
      onChange={onChange}
      wide
    />
  </Field>
)

TypeInput.propTypes ={
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
}

export default TypeInput
