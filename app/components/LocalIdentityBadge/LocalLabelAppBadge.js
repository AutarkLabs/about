import React from 'react'
import { useNetwork } from '@aragon/api-react'
import { AppBadge } from '@aragon/ui'
import PropTypes from 'prop-types'
import { useIdentity } from '../../utils/identity-manager'
import LocalLabelPopoverTitle from './LocalLabelPopoverTitle'
import LocalLabelPopoverActionLabel from './LocalLabelPopoverActionLabel'
import { useInstalledApps } from '@aragon/api-react'

const LocalLabelAppBadge = ({ appAddress, label, ...props }) => {
  const network = useNetwork()
  const installedApps = useInstalledApps()
  const [ localLabel, showLocalLabelAppModal ] = useIdentity(appAddress)
  const handleClick = () => showLocalLabelAppModal(appAddress)
  const targetApp = installedApps.find(app => app.appAddress === appAddress)
  const { icon, identifier, name } = targetApp
  return (
    <AppBadge
      appAddress={appAddress}
      label={localLabel || label || name}
      networkType={network && network.type}
      popoverAction={{
        label: <LocalLabelPopoverActionLabel hasLabel={Boolean(localLabel)} />,
        onClick: handleClick,
      }}
      popoverTitle={
        localLabel ? <LocalLabelPopoverTitle label={localLabel} /> : undefined
      }
      iconSrc={icon(40)}
      identifier={identifier}
      {...props}
    />
  )
}

LocalLabelAppBadge.propTypes = {
  appAddress: PropTypes.string.isRequired,
  label: PropTypes.string,
}

export default LocalLabelAppBadge
