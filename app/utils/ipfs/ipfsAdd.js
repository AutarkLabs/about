import { useEffect, useState } from 'react'
import useIpfs from './useIpfs'
import { ipfsConfig } from './ipfs-helpers'

const bufferFile = content =>
  Buffer.from(typeof content === 'string' ? content : JSON.stringify(content))

const ipfsAdd = () => {
  const [ipfsClient] = useIpfs(ipfsConfig)
  const [ data, setData ] = useState(null)
  const [ savedIpfsAddr, setSavedIpfsAddr ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isError, setIsError ] = useState(false)

  const upload = async () => {
    setIsError(false)
    setIsLoading(true)
    setSavedIpfsAddr(null)
    const file = bufferFile(data)
    try {
      const result = await ipfsClient.add(file)
      setSavedIpfsAddr(result[0].hash)
    } catch (err) {
      console.error('Error pinning file to IPFS', err)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (data !== null) {
      upload()
    }
  }, [data])

  return [{ savedIpfsAddr, isLoading, isError }, setData ]
}
export default ipfsAdd
