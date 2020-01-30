import { app } from './utils'
import { map } from 'rxjs/operators'
import { addressesEqual } from './lib/web3-utils'

/// ////////////////////////////////////
/*    Votes event handlers            */
/// ////////////////////////////////////

export const handlesVotes = eventData => {
  const { event: { address }, settings: { voting } } = eventData

  const hasVotingApp = Boolean(voting.address)
  const isVotingEvent = addressesEqual(address, voting.address )  
  return hasVotingApp && isVotingEvent
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

const hasAction = async script => {
  const result = await app.describeScript(script).toPromise()
  return result.length > 0
}

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
        const voteTime = await voting.contract.voteTime().toPromise()
        const endDate = parseInt(startDate) + parseInt(voteTime)
        return {
          // transform response data for the frontend
          description, 
          executed,
          id, // note the id is added along with the other data,
          nay,
          open,
          snapshotBlock,
          startDate,
          supportRequired,
          minAcceptQuorum,
          votingPower,
          appAddress: to,
          yea,
          endDate,
          hasAction: await hasAction(script)
        }})
    )
    .toPromise()
}
