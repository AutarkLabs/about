import { app } from './utils'
import { map } from 'rxjs/operators'
import { addressesEqual } from './lib/web3-utils'

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
  
  voteIndex === -1 ? newVotes.push(vote) : newVotes[voteIndex] = vote
  return newVotes
}

/// ////////////////////////////////////
/*    Votes helper functions          */
/// ////////////////////////////////////

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
        status,
        supportRequired,
        totalVotes,
        yea,
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
          nay: parseInt(nay),
          open,
          snapshotBlock,
          startDate,
          status,
          supportRequired,
          to,
          totalVotes,
          yea: parseInt(yea),
        }})
    )
    .toPromise()
}