import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { BigNumber } from 'bignumber.js'
import {
  Card,
  GU,
  IconCheck,
  IconClose,
  IdentityBadge,
  ProgressBar,
  textStyle,
  useTheme,
} from '@aragon/ui'
import { useAragonApi, useNetwork } from '../../../api-react'
import {
  VOTING_STATUS,
  VOTING_STATUS_ONGOING,
  VOTING_STATUS_REJECTED,
} from '../../../utils/constants'
import { getStatus } from '../../../utils/helpers'
import LocalLabelAppBadge from '../../LocalIdentityBadge/LocalLabelAppBadge'
import { useIdentity } from '../../../utils/identity-manager'

const Votes = () => {
  const { appState: { votes = [] } } = useAragonApi()

  const reversedVotes = [...votes]
  reversedVotes.reverse()

  const mappedVotes = useMemo(() => reversedVotes.slice(0, 4).map(vote => (
    <Vote key={vote.id}>
      <div css={`
        display: flex;
        justify-content: space-between;
        margin-bottom: ${2 * GU}px;
        `}>
        <AppBadge address={vote.appAddress} />
        <Status vote={vote} />
      </div>
      <div css={`
        display: flex;
        margin-bottom: ${GU}px;
      `}>
        <Id id={vote.id} />
        <Description text={vote.description} />
      </div>
      <div css={`
        display: flex;
      `}>
        <Result yea={vote.yea} nay={vote.nay} />
      </div>
    </Vote>
  )), [reversedVotes])

  return (
    <div css={`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    `}>
      {mappedVotes}
    </div>
  )
}

const Vote = styled(Card)`
  :not(:last-child) {
    margin-bottom: ${2 * GU}px;
  }

  padding: ${2 * GU}px;
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 334px;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`

const AppBadge = ({ address }) => {
  return (
    <LocalLabelAppBadge
      badgeOnly
      appAddress={address}
    />
  )
}

AppBadge.propTypes = {
  address: PropTypes.string.isRequired,
}

const Status = ({ vote }) => {
  const [ status, setStatus ] = useState(getStatus(vote))
  useEffect(() => {
    const interval = setInterval(async () => {
      const status = getStatus(vote)
      setStatus(status)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  })
  const theme = useTheme()
  let Icon
  let color
  if (status === VOTING_STATUS_REJECTED) {
    Icon = IconClose
    color = theme.negative
  }
  else if (status !== VOTING_STATUS_ONGOING){
    Icon = IconCheck
    color = theme.positive
  }
  return (
    <StatusContainer color={color}>
      {Icon && <Icon />}
      <StatusText>
        {VOTING_STATUS[status]}
      </StatusText>
    </StatusContainer>
  )
}

const StatusContainer = styled.div`
  color: ${({ color }) => color};
  display: flex;
`
const StatusText = styled.div`
  ${textStyle('body2')};
`

Status.propTypes = {
  vote: PropTypes.shape({
    // TODO: shape
  }).isRequired,
}

const Id = ({ id }) => (
  <IdContainer>
    #{id}
  </IdContainer>
)

Id.propTypes = {
  id: PropTypes.string.isRequired,
}

const IdContainer = styled.span`
  ${textStyle('body2')};
  font-weight: bold;
`

const Description = ({ text }) => {
  // by the rules of hooks, they cannot be called conditionally
  const network = useNetwork()
  // TODO:: check initialization error,  put some wait or check
  const [localLabel] = 'Pepito' // useIdentity(address)

  if (!text) return <span />
  const addressRegex = /0x[a-fA-F0-9]{40}/g
  const startIndex = text.search(addressRegex)
  if (startIndex === -1) {
    return (
      <span css={`margin: 0 ${.5 * GU}px;`}>
        {text}
      </span>
    )
  }
  const endIndex = startIndex + 42
  const beforeAddress = text.substring(0, startIndex)
  const address = text.substring(startIndex, endIndex)
  const afterAddress = text.substring(endIndex)
  return (
    <div css={`
      ${textStyle('body2')};
    `}>
      <span css={`margin: 0 ${.5 * GU}px;`}>
        {beforeAddress}
      </span>
      <IdentityBadge
        css="padding: 0;"
        compact
        label={localLabel}
        entity={address}
        networkType={network && network.type}
        shorten
      />
      {afterAddress}
    </div>
  )
}

Description.propTypes = {
  text: PropTypes.string.isRequired,
}

const Result = ({ yea, nay }) => {
  const theme = useTheme()
  const bigYea = BigNumber(yea)
  const bigNay = BigNumber(nay)
  const totalVotes = bigYea.plus(bigNay)
  let fractionYea, percentageYea, percentageNay
  if (totalVotes.isZero()) {
    fractionYea = BigNumber(0)
    percentageYea = '0'
    percentageNay = '0'
  } else {
    fractionYea = bigYea.div(totalVotes)
    percentageYea = fractionYea.times(100).toString()
    percentageNay = bigNay.times(100).div(totalVotes).toString()
  }
  return (
    <ResultContainer>
      <LabelContainer>
        <LabelText>
          YES {percentageYea}%
        </LabelText>
        <LabelText color={theme.surfaceContentSecondary}>
          NO {percentageNay}%
        </LabelText>
      </LabelContainer>
      <Bar value={fractionYea} />
    </ResultContainer>
  )
}

Result.propTypes = {
  nay: PropTypes.string.isRequired,
  yea: PropTypes.string.isRequired,
}

const ResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const LabelText = styled.div`
  ${textStyle('label1')};
  color: ${({ color }) => color};
`

const Bar = ({ value }) => {
  const theme = useTheme()
  return (
    <ProgressBar
      value={value.toNumber()}
      color={`${theme.positive}`}
    />
  )
}

Bar.propTypes = {
  value: PropTypes.instanceOf(BigNumber).isRequired,
}

export default Votes
