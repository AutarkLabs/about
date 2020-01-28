import React, { useMemo } from 'react'
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

const Votes = () => {
  const { appState: { votes = [] } } = useAragonApi()

  const mappedVotes = useMemo(() => votes.map(vote => (
    <Vote key={vote.id}>
      <div css={`
        display: flex;
        justify-content: space-between;
        margin-bottom: ${2 * GU}px;
        `}>
        <AppBadge address={vote.app} />
        <Status status={vote.status} />
      </div>
      <div css={`
        display: flex;
        margin-bottom: ${GU}px;
      `}>
        <Id id={vote.id}/>
        <Description text={vote.description} />
      </div>
      <div css={`
        display: flex;
      `}>
        <Result yea={vote.yea} nay={vote.nay} />
      </div>
    </Vote>
  )), votes)
  
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
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`

const AppBadge = ({ address }) => {
  const network = useNetwork()
  return (
    <IdentityBadge
      css={'padding: 0;'}
      badgeOnly={true}
      compact={true}
      entity={address}
      networkType={network && network.type}
      shorten={true}
    />
  )
}

AppBadge.propTypes = {
  address: PropTypes.string.isRequired,
}

const Status = ({ status }) => {
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
  status: PropTypes.string.isRequired,
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
  const network = useNetwork()
  const addressRegex = /0x[a-fA-F0-9]{40}/g
  const startIndex = text.search(addressRegex)
  if (startIndex === -1) {
    return (
      <span>
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
        badgeOnly={true}
        css="padding: 0;"
        compact={true}
        entity={address}
        networkType={network && network.type}
        shorten={true}
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
  const fractionYea = bigYea.div(totalVotes)
  const percentageYea = fractionYea.times(100).toNumber()
  const percentageNay = bigNay.times(100).div(totalVotes).toNumber()
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
  yea: PropTypes.string.isRequired,
  nay: PropTypes.string.isRequired,
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
  value: PropTypes.instanceOf(BigNumber)
}

export default Votes
