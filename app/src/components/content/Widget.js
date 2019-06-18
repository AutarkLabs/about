import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { theme, Card, Text, Button, Info, SafeLink } from '@aragon/ui'

import { EditButton, IconPencil, MarkdownPreview } from '../../shared'

const Widget = ({
  id,
  content,
  isLoading,
  handleClick,
  active,
  ipfsAddr,
  errorMessage,
}) => {
  return (
    <StyledCard height="fit-content" key={id}>
      <CardContent>
        {}
        {isLoading ? (
          <div style={{ padding: '50px', textAlign: 'center' }}>
            Loading{' '}
            <SafeLink href={'https://ipfs.io/ipfs/' + ipfsAddr}>
              ipfs file
            </SafeLink>
            . This could take a while.
          </div>
        ) : (
          [
            content !== '' ? (
              <div>
                <EditButton
                  mode="text"
                  onClick={handleClick(id)}
                  active={active}
                >
                  <IconPencil />
                </EditButton>
                <MarkdownPreview content={content} />
              </div>
            ) : (
              <div style={{ padding: '50px', textAlign: 'center' }}>
                <br />
                <Text>This widget is empty</Text>
                <br />
                <br />
                <Button
                  compact
                  onClick={handleClick(id)}
                  style={{ color: theme.accent }}
                >
                  Edit
                </Button>
              </div>
            ),
            errorMessage && (
              <Info.Alert title="Error">{errorMessage}</Info.Alert>
            ),
          ]
        )}
      </CardContent>
    </StyledCard>
  )
}

Widget.propTypes = {
  active: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  ipfsAddr: PropTypes.string.isRequired,
}

const CardContent = styled.div`
  padding: 24px;
  :hover ${EditButton} {
    opacity: 1;
  }
`

const StyledCard = styled(Card)`
  width: 100%;
  margin-bottom: 30px;
  position: relative;
`

export default Widget
