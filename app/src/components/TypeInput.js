import React from 'react'
import { DropDown, Field } from '@aragon/ui'

const TypeInput = () => (
  <Field label="Type">
    <DropDown
      items={[
        'Custom markdown',
        'External URL (.md file)',
        'IPFS hash (.md file)',
      ]}
      active={0}
      onChange={() => {}}
    />
  </Field>
)

export default TypeInput
