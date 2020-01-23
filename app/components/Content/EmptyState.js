import PropTypes from 'prop-types'
import React from 'react'
import {
  Button,
  EmptyStateCard,
  GU,
  LoadingRing,
  textStyle,
  useTheme,
} from '@aragon/ui'

// TODO: Compress illustration
import emptySvg from '../../assets/empty.svg'

const EmptyState = React.memo(({ isSyncing, onActionClick }) => {
  const theme = useTheme()
  return (
    <EmptyStateCard
      css={`
        height: ${48 * GU}px;
        width: ${41 * GU}px;
        padding: ${3 * GU}px;
      `}
      text={
        isSyncing ? (
          <div
            css={`
              display: grid;
              align-items: center;
              justify-content: center;
              grid-template-columns: auto auto;
              grid-gap: ${1 * GU}px;
              /* Fixed weight to avoid flicker
              resizing when switching from 
              text to syncing state */
              height: ${10.5 * GU}px;
              margin: ${3 * GU}px 0;
            `}
          >
            <LoadingRing />
            <span>Syncing…</span>
          </div>
        ) : (
          <>
            <div
              css={`
                color: ${theme.content};
                ${textStyle('title4')}
              `}
            >
              No widgets here
            </div>
            <div
              css={`
                /* No aragon color defined for this */
                color: #637381;
                margin: ${1 * GU}px 0;
                ${textStyle('body2')}
              `}
            >
              Add information and insights about your organization.
            </div>
          </>
        )
      }
      action={
        <Button wide mode="strong" onClick={onActionClick}>
          New widget
        </Button>
      }
      illustration={
        <img
          css={`
            height: 170px;
          `}
          src={emptySvg}
          alt="No information here"
        />
      }
    />
  )
})

EmptyState.propTypes = {
  isSyncing: PropTypes.bool,
  onActionClick: PropTypes.func.isRequired
}

EmptyState.displayName = 'EmptyState'

export default EmptyState
