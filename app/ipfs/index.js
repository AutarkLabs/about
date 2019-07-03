let options = {}
if (process.env.NODE_ENV === 'production') {
  options = {
    host: 'ipfs.infura.io',
    port: '5001',
    protocol: 'https',
  }
} else {
  options = {
    host: 'localhost',
    port: '5001',
    protocol: 'http',
  }
}

const ipfsConfig = options

export default ipfsConfig
