import { app } from './utils'
import { map } from 'rxjs/operators'
import { addressesEqual } from './lib/web3-utils'
import { BigNumber } from 'bignumber.js'
import {
  VOTING_STATUS_ACCEPTED,
  VOTING_STATUS_ENACTED,
  VOTING_STATUS_ONGOING,
  VOTING_STATUS_PENDING_ENACTMENT,
  VOTING_STATUS_REJECTED,
} from '../utils/constants'

/// ////////////////////////////////////
/*    Votes event handlers            */
/// ////////////////////////////////////

export const handlesVotes = eventData => {
  const { event: { address }, settings: { voting }, state: { widgets } } = eventData

  const hasVotingApp = Boolean(voting.address)
  const usesVotingWidget = Boolean(widgets.find(w => w.type === 'VOTES'))
  const isVotingEvent = addressesEqual(address, voting.address )  
  return hasVotingApp && usesVotingWidget && isVotingEvent
}

export const handleVoteEvent = async eventData => {
  const { event: { event, returnValues }, settings: { voting }, state, } = eventData 
  switch (event)  {
  case 'CastVote':
  case 'ExecuteVote':
  case 'StartVote':
    return { ...state, votes: await updateVotes(state.votes, returnValues, voting) }
  default:
    return { ...state }
  }
}

export const updateVotes = async (votes, { metadata, voteId: id }, voting) => {
  const newVotes = Array.from(votes || [])
  const voteIndex = newVotes.findIndex(v => v.id === id)
  const vote = await getVote(id, { metadata, voting })
  
  if (voteIndex === -1) {
    newVotes.push(vote)
  } else {
    const oldVote = newVotes[voteIndex]
    let newVote = {}
    Object.keys(vote).forEach(key => {
      const newValue = vote[key] ? vote[key] : oldVote[key]
      newVote[key] = newValue
    })
    newVotes[voteIndex] = newVote
  }
  return newVotes
}

/// ////////////////////////////////////
/*    Votes helper functions          */
/// ////////////////////////////////////

const hasAction = async vote => {
  const script = await app.describeScript(vote.script).toPromise()
  return script.length > 0
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

const getStatus = async vote => (
  vote.open ?
    VOTING_STATUS_ONGOING :
    isSuccessful(vote) ?
      await hasAction(vote) ?
        vote.executed ?
          VOTING_STATUS_ENACTED :
          VOTING_STATUS_PENDING_ENACTMENT :
        VOTING_STATUS_ACCEPTED:
      VOTING_STATUS_REJECTED
)

const getVote = (id, { metadata, voting }) => {
  return voting.contract.getVote(id)
    .pipe(
      map(async ({
        executed,
        nay,
        open,
        script,
        snapshotBlock,
        startDate,
        supportRequired,
        yea,
        votingPower,
        minAcceptQuorum,
      }) => {
        const {
          description = metadata,
          to = voting.address
        } = (await app.describeScript(script).toPromise())[0] || {}
        return {
          // transform response data for the frontend
          description, 
          executed,
          id, // note the id is added along with the other data,
          nay: nay,
          open,
          snapshotBlock,
          startDate,
          supportRequired,
          appAddress: to,
          yea: yea,
          status: await getStatus({
            open,
            executed,
            yea,
            nay,
            votingPower,
            supportRequired,
            minAcceptQuorum,
            script,
          }),
        }})
    )
    .toPromise()
}
