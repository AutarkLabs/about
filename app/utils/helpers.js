import { BigNumber } from 'bignumber.js'
import {
  VOTING_STATUS_ACCEPTED,
  VOTING_STATUS_ENACTED,
  VOTING_STATUS_ONGOING,
  VOTING_STATUS_PENDING_ENACTMENT,
  VOTING_STATUS_REJECTED,
} from './constants'

// taken from https://gist.github.com/jed/982883#gistcomment-3142904
const uuid = (c = 9999) => {
  const t = ((Date.now() + 12219292800000) * 1E4).toString(16)
  const n = crypto.getRandomValues(new Uint8Array(6)).reduce((sum, x, i) => {
    return sum + ((i === 0) ? x|1 : x).toString(16).padStart(2, '0')
  }, '')

  return `${t.slice(-8)}-${t.slice(-12, -8)}-1${t.slice(0, 3)}-${c}-${n}`
}

const isSuccessful = vote => {
  const yea = new BigNumber(vote.yea)
  const nay = new BigNumber(vote.nay)
  const votingPower = new BigNumber(vote.votingPower)
  const supportRequired = new BigNumber(vote.supportRequired)
  const minAcceptQuorum = new BigNumber(vote.minAcceptQuorum)
  const totalVotes = yea.plus(nay)
  return (
    yea.div(votingPower).gt(supportRequired.div(votingPower)) ||
      (yea.div(totalVotes).gt(supportRequired.div(totalVotes)) &&
       yea.div(votingPower).gt(minAcceptQuorum.div(votingPower)))
  )
}

const getStatus = vote => {
  return vote.open && new Date().getTime() < vote.endDate * 1000 ?
    VOTING_STATUS_ONGOING :
    isSuccessful(vote) ?
      vote.hasAction ?
        vote.executed ?
          VOTING_STATUS_ENACTED :
          VOTING_STATUS_PENDING_ENACTMENT :
        VOTING_STATUS_ACCEPTED:
      VOTING_STATUS_REJECTED
}

export { uuid, getStatus }
