import React from 'react'
import styled from 'styled-components'
import { Button as AragonButton } from '@aragon/ui'

import IconPencil from './IconPencil'

const Button = ({ ...props }) => (
  <AragonButton mode="text" {...props}>
    <IconPencil />
  </AragonButton>
)

const EditButton = styled(Button)`
  box-sizing: content-box;
  position: absolute;
  color: inherit;
  padding: 4px;
  margin: 0;
  height: 22px;
  width: 22px;
`

export default EditButton
