import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { Field, TextInput } from '@aragon/ui'

const Input = ({ label, value, onChange }) => {
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  })
  return (
    <Field label={label} autoFocus>
      <TextInput
        wide
        value={value}
        onChange={e => {
          onChange(e.target.value)
        }}
        ref={inputRef}
      />
    </Field>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default Input
