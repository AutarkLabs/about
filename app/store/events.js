import { events } from './utils'
import { handleVoteEvent, handlesVotes } from './vote'
import { updateContent } from './widget'

const eventHandler = async eventData => {
  const {
    event: { event, returnValues },
    state,
  } = eventData

  // Syncing events
  if (event === events.SYNC_STATUS_SYNCING)
    return { ...state, isSyncing:true }
  if (event === events.SYNC_STATUS_SYNCED)
    return { ...state, isSyncing: false }

  // Voting events
  if (handlesVotes(eventData))
    return handleVoteEvent(eventData)

  // About events
  switch (event) {
  case 'ContentUpdated':
    return { ...state, widgets: await updateContent(returnValues.cid) }
  default:
    return { ...state }
  }
}

export default eventHandler
