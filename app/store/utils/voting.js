import { abi as votingAbi } from '@aragon/apps-voting/abi/Voting.json'
import { app, getInstalledApp, retryEvery } from '.'

export const getVoting = () => {  
  return retryEvery(async () => {
    try {
      const address = (await getInstalledApp('Voting')).appAddress
      const contract = app.external(address, votingAbi)
      const initializationBlock = await contract
        .getInitializationBlock()
        .toPromise()
        
      return { address, contract, initializationBlock }
    } catch (err) {
      throw new Error('Voting contract not loading', err)
    }
  })
}
