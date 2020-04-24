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
    if (typeof data === 'object') return data
    // If we retrieve a regular IPFS file from the '/object/data' endpoint,
    // it will contain the array but with some garbage data surrounding it.
    // So we can extract the relavant string and parse it into JSON
    const extractedString = data.substring(
      data.indexOf('['),
      data.lastIndexOf(']') + 1
    )
    return JSON.parse(extractedString)
  } catch (err) {
    console.error('Error getting data from IPFS', err)
  }
}
