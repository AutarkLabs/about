import { useState, useEffect } from 'react'
import useIpfs from './useIpfs'
import ipfsConfig from '../../../../ipfs'

const ipfsCat = () => {
  const [ipfsClient] = useIpfs(ipfsConfig)
  const [data, setData] = useState(null)
  const [ipfsAddr, setIpfsAddr] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const catIpfsAddr = async () => {
    setIsError(false)
    setIsLoading(true)
    setData(null)
    try {
      const result = await ipfsClient.cat(ipfsAddr)
      setData(result)
    } catch (err) {
      console.error('Error readinf file to IPFS', err)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (ipfsAddr !== null) {
      catIpfsAddr()
    }
  }, [ipfsAddr])

  return [{ data, isLoading, isError }, setIpfsAddr]
}
export default ipfsCat
