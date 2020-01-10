import React from 'react'
import { DropDown, Field, GU } from '@aragon/ui'

const TypeInput = ({ value, onChange }) => (
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
      onChange={index => {
        onChange(index)
      }}
      wide
    />
  </Field>
)

export default TypeInput
