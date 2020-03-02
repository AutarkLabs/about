import axios from 'axios'

const endpoints = {
  development: 'http://localhost:8080/api/v0',
  production: 'https://ipfs.autark.xyz:5001/api/v0',
  staging: 'https://ipfs.autark.xyz:5001/api/v0',
}

const endpointConfig = endpoints[process.env.NODE_ENV]

export const ipfsGet = async cId => {
  let endpoint
  if (cId.startsWith('Qm') && cId.length === 46) {
    endpoint = `${endpointConfig}/object/data/${cId}`
  } else { // CID is v1 encoded, and try/catch will catch any errors due to malformed hashes
    endpoint = `${endpointConfig}/dag/get/${cId}`
  }
  try {
    const { data } = await axios.get(endpoint)
    return data
  } catch (err) {
    console.error('Error getting data from IPFS', err)
  }
}
