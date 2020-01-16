import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Checkbox, Field } from '@aragon/ui'

const apps = [ 'Voting', 'Finance', 'Tokens', 'Address Book', 'Allocations', 'Dot Voting', 'Projects',  'Rewards' ]

const CheckboxLabel = ({ checked, label: text, onChange }) =>
  <div>
    <label>
      <Checkbox {...{ checked, onChange }}/>
      {text}
    </label>
  </div>

CheckboxLabel.propTypes = {
  checked: PropTypes.bool,
  label:  PropTypes.node,
  onChange: PropTypes.func.isRequired
}

const ActivityFeedConfig =  () => {
  const [ options, setOptions ] = useState([])

  const handleCheckOption = option => checked => {
    setOptions(checked
      ? Array.from(new Set([ ...options, option ]))
      : options.filter(o => o !== option)
    )
  }

  const appsCheckboxes = apps.map((a, i) => <CheckboxLabel label={a} checked={options.includes(a)} key={i} onChange={handleCheckOption(a)}/>)

  return (
    <Field label="Apps">
      <div css={`
        display: grid;
        grid-template-columns: 1fr 1fr;
    `
      }>
        {appsCheckboxes}
      </div>
    </Field>
  )
}

// ActivityFeedConfig.propTypes ={

// }

export default ActivityFeedConfig
