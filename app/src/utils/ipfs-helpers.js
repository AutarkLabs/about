import axios from 'axios'
import ipfsClient from 'ipfs-http-client'

export const ipfsConfig =
  process.env.NODE_ENV === 'development'
    ? { host: 'localhost', port: '5001', protocol: 'http' }
    : { host: 'ipfs.autark.xyz', port: '5001', protocol: 'https' }

const ipfsInstance = ipfsClient(ipfsConfig)
const ipfsEndpoint = `${ipfsConfig.protocol}://${ipfsConfig.host}:${ipfsConfig.port}/api/v0`

const bufferFile = content =>
  ipfsInstance.types.Buffer.from(JSON.stringify(content))

export const ipfsAdd = async content => {
  const file = bufferFile(content)
  try {
    const result = await ipfsInstance.add(file)
    return result[0].hash
  } catch (err) {
    console.error('Error pinning file to IPFS', err)
  }
}

export const ipfsGet = async hash => {
  const ipfsPath = `${ipfsEndpoint}/cat?arg=${hash}`
  try {
    const { data } = await axios.get(ipfsPath)
    return data
  } catch (err) {
    console.error('Error getting data from IPFS', err)
  }
}
