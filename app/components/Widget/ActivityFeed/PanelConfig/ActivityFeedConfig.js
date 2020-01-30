import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Checkbox, Field } from '@aragon/ui'
import { uuid } from '../../../../utils/helpers'

const apps = [ 'Voting', 'Finance', 'Tokens', 'Address Book', 'Allocations', 'Dot Voting', 'Projects', 'Rewards' ]

const CheckboxLabel = ({ checked, label: text, onChange }) =>
  <label>
    <Checkbox {...{ checked, onChange }} />
    {text}
  </label>

CheckboxLabel.propTypes = {
  checked: PropTypes.bool.isRequired,
  label:  PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
}

const ActivityFeedConfig = () => {
  const [ options, setOptions ] = useState([])

  const handleCheckOption = option => checked => {
    setOptions(checked
      ? Array.from(new Set([ ...options, option ]))
      : options.filter(o => o !== option)
    )
  }

  // TODO: Check weird thing happening to first checkbox when clicking others
  // TODO: Info-box
  const appsCheckboxes = apps.map(a => <CheckboxLabel label={a} checked={options.includes(a)} key={uuid()} onChange={handleCheckOption(a)} />)

  return (
    <Field label="Apps">
      <div css={`
        display: grid;
        grid-template-columns: 1fr 1fr;
    `}>
        {appsCheckboxes}
      </div>
    </Field>
  )
}

// ActivityFeedConfig.propTypes = {}
// TODO: unused module
// eslint-disable-next-line import/no-unused-modules
export default ActivityFeedConfig
