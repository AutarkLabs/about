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
  Link,
  ProgressBar,
  textStyle,
  useTheme,
} from '@aragon/ui'
import { useAppState, useInstalledApps, useNetwork } from '../../../api-react'
import {
  VOTING_STATUS,
  VOTING_STATUS_ONGOING,
  VOTING_STATUS_REJECTED,
} from '../../../utils/constants'
import { getStatus } from '../../../utils/helpers'
import { useIdentity } from '../../../utils/identity-manager'
import LocalLabelAppBadge from '../../LocalIdentityBadge/LocalLabelAppBadge'

const Votes = () => {
  const { votes = [] } = useAppState()
  const network = useNetwork()
  const installedApps = useInstalledApps()
  const kernel = installedApps.find(app => app.name === 'Kernel').appAddress
  const voting = installedApps.find(app => app.name === 'Voting').appAddress
  const voteUrl = network.type === 'private'
    ? `http://localhost:3000/#/${kernel}/${voting}/vote`
    : `https://${network.type}.aragon.org/#/${kernel}/${voting}/vote`

  const reversedVotes = [...votes]
  reversedVotes.reverse()

  /* TODO: AppBadge component here seems redundant:
   * its definition is just wrapping another component,
   * why not simply put that component here? also it has a
   * bug with <a> appearing as descendant of another <a> */
  const mappedVotes = useMemo(() => reversedVotes.slice(0, 4).map(vote => (
    <Vote key={vote.id} href={`${voteUrl}/${vote.id}`}>
      <div css={`
        display: flex;
        justify-content: space-between;
        margin-bottom: ${2 * GU}px;
        `}>
        <AppBadge address={vote.appAddress} />
        <Status vote={vote} />
      </div>
      <div css={`
        margin-bottom: ${GU}px;
      `}>
        <Description id={vote.id} text={vote.description} />
      </div>
      <div css={`
        display: flex;
      `}>
        <Result yea={vote.yea} nay={vote.nay} />
      </div>
    </Vote>
  )), [ reversedVotes, voteUrl ])

  return (
    <div css={`
      display: grid;
      grid-gap: ${2 * GU}px;
      grid-template-columns: repeat(auto-fill, minmax(${29 * GU}px, 1fr));
    `}>
      {mappedVotes}
    </div>
  )
}

const Vote = ({ children, href }) => {
  const theme = useTheme()
  return (
    <Link
      href={href}
      css={`
        text-decoration: none;
        color: ${theme.surfaceContent};
      `}
    >
      <Card
        css={`
          padding: ${2 * GU}px;
          display: flex;
          height: 100%;
          width: 100%;
          flex-direction: column;
          align-items: stretch;
          text-align: left;
          cursor: pointer;
        `}
      >
        {children}
      </Card>
    </Link>
  )
}

Vote.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
}

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
    #{id}:
  </IdContainer>
)

Id.propTypes = {
  id: PropTypes.string.isRequired,
}

const IdContainer = styled.span`
  ${textStyle('body1')};
  font-weight: bold;
  margin-right: ${GU}px;
`

const ADDRESS_REGEX = /0x[a-fA-F0-9]{40}/g

const Description = ({ id, text }) => {
  const startIndex = text.search(ADDRESS_REGEX)
  const endIndex = startIndex + 42
  const beforeAddress = text.substring(0, startIndex)
  const address = text.substring(startIndex, endIndex)
  const afterAddress = text.substring(endIndex)

  const network = useNetwork()
  const [localLabel] = useIdentity(address)

  // TODO: separate address entity styling from text!
  return (
    <div css={`
        ${textStyle('body1')};
        overflow: hidden;
        line-height: ${3 * GU}px; /* 24px line-height of textStyle('body2') */
        height: ${3* GU * 3}px; /* line-height * 3 lines */
        white-space: normal;
        margin: 0 ${.5 * GU}px;
      `}>
      <Id id={id} />
      {
        startIndex < 1
          ? text
          : <>
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
          </>
      }
    </div>
  )
}

Description.propTypes = {
  id: PropTypes.string.isRequired,
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
      <LabelContainer css='margin-bottom: 2px;'>
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
