import PropTypes from 'prop-types'
import React from 'react'
import { DropDown, Field } from '@aragon/ui'

const WidgetSelect = ({ onChange, value }) => (
  <Field
    label="Widget"
  >
    <DropDown
      // TODO: encode this in types constant
      // items={[ 'Markdown', 'Activity feed', 'Latest votes', 'Latest dot votes' ]}
      items={[ 'Markdown', 'Latest votes' ]}
      selected={value}
      onChange={onChange}
      placeholder="Select widget"
      wide
    />
  </Field>
)

WidgetSelect.propTypes ={
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
}

export default WidgetSelect
