let options = {}
if (process.env.NODE_ENV === 'development') {
  options = {
    host: 'localhost',
    port: '5001',
    protocol: 'http',
  }
} else {
  options = {
    host: 'ipfs.autark.xyz',
    port: '5001',
    protocol: 'https',
  }
}

const ipfsConfig = options

export default ipfsConfig
