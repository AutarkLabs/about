import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Field, TextInput } from '@aragon/ui'

const EditorTextInput = ({
  label,
  value, 
  onChange
}) => (
  <Field label={label}>
    <TextInput wide value={value} onChange={(e)=>{onChange(e.target.value);}}/>
  </Field>
)

export default EditorTextInput
