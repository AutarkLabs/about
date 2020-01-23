import React from 'react'
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
import { useNetwork } from '@aragon/api-react'
import {
  VOTING_STATUS,
  VOTING_STATUS_ONGOING,
  VOTING_STATUS_REJECTED,
} from '../../../utils/constants'

const Voting = ({ data }) => {
  return (
    <VoteContainer>
      {data.votes.map(vote => (
        <Vote key={vote.id}>
          <UpperBar>
            <App address={vote.app} />
            <Status status={vote.status} />
          </UpperBar>
          <MiddleBar>
            <Id id={vote.id}/>
            <Description text={vote.description} />
          </MiddleBar>
          <LowerBar>
            <Result yea={vote.yea} nay={vote.nay} />
          </LowerBar>
        </Vote>
      ))}
    </VoteContainer>
  )
}

Voting.propTypes = {
  data: PropTypes.object.isRequired,
}

const VoteContainer = styled.div`
  display: flex;
`
const Vote = styled(Card)`
  margin: ${GU}px;
  padding: ${GU}px;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`
const UpperBar = styled.div`
  margin: ${GU}px;
  margin-left: 0;
  display: flex;
  justify-content: space-between;
`
const MiddleBar = styled.div`
  margin: ${GU}px;
  display: flex;
`
const LowerBar = styled.div`
  margin: ${GU}px;
  margin-top: 0;
  display: flex;
`

const App = ({ address }) => {
  const network = useNetwork()
  return (
    <IdentityBadge
      badgeOnly={true}
      compact={true}
      entity={address}
      networkType={network && network.type}
      shorten={true}
    />
  )
}

App.propTypes = {
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
  margin-right: 3px;
`

const Description = ({ text }) => {
  const network = useNetwork()
  const addressRegex = /0x[a-fA-F0-9]{40}/g
  const startIndex = text.search(addressRegex)
  if (startIndex === -1) {
    return (
      <DescriptionContainer>
        {text}
      </DescriptionContainer>
    )
  }
  const endIndex = startIndex + 42
  const beforeAddress = text.substring(0, startIndex)
  const address = text.substring(startIndex, endIndex)
  const afterAddress = text.substring(endIndex)
  return (
    <DescriptionContainer>
      {beforeAddress}
      <IdentityBadge
        badgeOnly={true}
        compact={true}
        entity={address}
        networkType={network && network.type}
        shorten={true}
      />
      {afterAddress}
    </DescriptionContainer>
  )
}

Description.propTypes = {
  text: PropTypes.string.isRequired,
}

const DescriptionContainer = styled.span`
  ${textStyle('body2')};
`

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
  margin-bottom: ${GU}px;
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

export default Voting
