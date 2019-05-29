import styled from 'styled-components'
import { Button, theme } from '@aragon/ui'

const EditButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 0.25s;
  color: 30px;
  padding: 18px;
  margin: 10px;

  > svg {
    transition: fill 0.3s ease;
  }

  :hover > svg {
    fill: ${theme.accent};
  }
`

export default EditButton
