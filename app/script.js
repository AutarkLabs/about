import Aragon from '@aragon/api'
import votingAppABI from '../abi/Voting.json'
import {
  TYPE_VOTING,
  VOTING_STATUS_ACCEPTED,
  VOTING_STATUS_ENACTED,
  VOTING_STATUS_ONGOING,
  VOTING_STATUS_PENDING_ENACTMENT,
  VOTING_STATUS_REJECTED,
} from './utils/constants'
import { BigNumber } from 'bignumber.js'

const api = new Aragon()

const hasAction = async (vote) => {
  const script = await api.describeScript(vote.script).toPromise()
  return script.length > 0
}

const isSuccessful = (vote) => {
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

const votingReducer = async (app, state, event) => {

  const votingWidget = state.widgets.find(widget => (
    widget.type === TYPE_VOTING
  ))
  if (!votingWidget) return state
  const values = event.returnValues
  const votes = votingWidget.data.votes
  let vote = votes.find(vote => (
    vote.id === values.voteId
  ))
  if (!vote) {
    votes.push({
      id: values.voteId,
      description: '',
      yea: 0,
      nay: 0,
      status: VOTING_STATUS_ONGOING,
      app: '',
    })
    vote = votes[votes.length - 1]
  }
  const contractVote = await app.getVote(vote.id).toPromise()

  switch (event.event) {
  case 'StartVote':
    if (!(await hasAction(contractVote))) {
      vote.description = values.metadata
      vote.app = event.address
    }
    else {
      const voteScript = (await api.describeScript(contractVote.script)
        .toPromise())[0]
      vote.description = voteScript.description
      vote.app = voteScript.to
    }
    // falls through
  case 'CastVote':
    vote.yea = parseInt(contractVote.yea)
    vote.nay = parseInt(contractVote.nay)
    // falls through
  case 'ExecuteVote':
    vote.status =
      contractVote.open ?
        VOTING_STATUS_ONGOING :
        isSuccessful(contractVote) ?
          await hasAction(contractVote) ?
            contractVote.executed ?
              VOTING_STATUS_ENACTED :
              VOTING_STATUS_PENDING_ENACTMENT :
            VOTING_STATUS_ACCEPTED:
          VOTING_STATUS_REJECTED
    break
  }

  return state
}

const reducer = (votingApp) => async (prevState, event) => {
  let state = { ...prevState }

  switch (event.event) {
  case 'SYNC_STATUS_SYNCING':
    state.isSyncing = true
    break
  case 'SYNC_STATUS_SYNCED':
    state.isSyncing = false
    break
  case 'StartVote':
  case 'CastVote':
  case 'ExecuteVote':
    state = votingReducer(votingApp, state, event)
    break
  }

  return state
}

const init = async cachedState => ({
  widgets: [
    { // delete from this line, inclusive
      type: TYPE_VOTING,
      data: {
        votes: [],
      },
      position: {},
    }, // delete to this line, inclusive
  ],
  isSyncing: true,
  ...cachedState,
})

let votingAppAddress
api.installedApps().subscribe({
  next: installedApps => {
    installedApps.forEach(app => {
      if(app.name === 'Voting' && votingAppAddress === undefined) {
        votingAppAddress = app.appAddress
        const votingApp = api.external(votingAppAddress, votingAppABI.abi)
        const options = {
          init: init,
          externals: [
            {
              contract: votingApp,
            },
          ],
        }
        api.store(reducer(votingApp), options)
      }
    })
  }
})

