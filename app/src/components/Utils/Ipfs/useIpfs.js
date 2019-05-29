import React, { useState, useEffect } from 'react'
import ipfsClient from 'ipfs-http-client'

const useIpfs = ipfsOptions => {
  const [ipfsInstance, setIpfsInstance] = useState(null)

  useEffect(() => {
    setIpfsInstance(ipfsClient(ipfsOptions))
  }, [])

  return [ipfsInstance]
}
export default useIpfs
