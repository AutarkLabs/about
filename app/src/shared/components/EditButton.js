import styled, { css } from 'styled-components'
import { Button, theme } from '@aragon/ui'

const EditButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 0.25s;
  color: 30px;
  z-index: -999;
  padding: 18px;
  margin: 10px;
  > svg {
    transition: fill 0.3s ease;
  }

  :hover > svg {
    fill: ${theme.accent};
  }

  ${props =>
    props.active &&
    css`
      opacity: 1;
      z-index: 1;
    `}
`

export default EditButton
