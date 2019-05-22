import React from 'react'
import { DropDown, Field } from '@aragon/ui'

const TypeInput = ({ value, onChange }) => (
  <Field label="Type">
    <DropDown
      items={[
        'Custom markdown',
        'External URL (.md file)',
        'IPFS hash (.md file)',
      ]}
      active={value}
      onChange={(index) => {onChange(index)}}
    />
  </Field>
)

export default TypeInput
