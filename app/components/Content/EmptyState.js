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

import emptySvg from '../../assets/empty.svg'

const EmptyState = React.memo(({ isSyncing, onActionClick }) => {
  const theme = useTheme()
  return (
    <EmptyStateCard
      css={`
        height: ${48 * GU}px;
        width: ${46 * GU}px;
        padding: ${3 * GU}px ${2 * GU}px;
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
                color: ${theme.content} ${textStyle('title4')};
              `}
            >
              No information here
            </div>
            <div
              css={`
                color: ${theme.contentSecondary};
                margin-top: ${1 * GU}px 0;
                ${textStyle('body2')}
              `}
            >
              Present important information to current and prospective members
              of your organization.
            </div>
          </>
        )
      }
      action={
        <Button wide mode="strong" onClick={onActionClick}>
          Customize about page
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
