import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { Field, TextInput } from '@aragon/ui'

const EditorTextInput = ({
  label,
  value, 
  onChange
}) => {
  const inputRef = useRef();
  useEffect(() => {
      inputRef.current.focus();
  });
  return(
    <Field label={label} autoFocus>
      <TextInput wide value={value} onChange={(e)=>{onChange(e.target.value);}} ref={inputRef} />
    </Field>
  )
}

export default EditorTextInput
