import { useState, useEffect } from 'react'
import useIpfs from './useIpfs'
import ipfsConfig from '../../../../ipfs'

const bufferFile = content =>
  Buffer.from(typeof content === 'string' ? content : JSON.stringify(content))

const ipfsAdd = () => {
  const [ipfsClient] = useIpfs(ipfsConfig)
  const [data, setData] = useState(null)
  const [ipfsAddr, setIpfsAddr] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchData = async () => {
    setIsError(false)
    setIsLoading(true)
    setIpfsAddr(null)
    const file = bufferFile(data)
    try {
      const result = await ipfsClient.add(file)
      setIpfsAddr(result[0].hash)
    } catch (err) {
      console.error('Error pinning file to IPFS', err)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (data !== null) {
      fetchData()
    }
  }, [data])

  return [{ ipfsAddr, isLoading, isError }, setData]
}
export default ipfsAdd
