import axios from 'axios'
import dompurify from 'dompurify'
import ipfsClient from 'ipfs-http-client'

const ipfsConfig = {
  host: 'ipfs.autark.xyz',
  path: '/api/v0',
  port: '5001',
  protocol: 'https',
}

const ipfsInstance = ipfsClient(ipfsConfig)

const bufferFile = content =>
  ipfsInstance.types.Buffer.from(dompurify.sanitize(content))

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
  const { host, port, protocol, path } = ipfsConfig
  const endpoint = `${protocol}://${host}:${port}${path}/cat?arg=${hash}`
  try {
    const { data } = await axios.get(endpoint)
    return data
  } catch (err) {
    console.error('Error getting data from IPFS', err)
  }
}
