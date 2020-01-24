import ipfsClient from 'ipfs-http-client'

const environments = {
  development: { host: 'localhost', port: '5001', protocol: 'http' },
  production: { host: 'ipfs.autark.xyz', port: '5001', protocol: 'https' },
  staging: { host: 'ipfs.autark.xyz', port: '5001', protocol: 'https' },
}

const ipfsConfig = environments[process.env.NODE_ENV]

export const ipfs = ipfsClient(ipfsConfig)
