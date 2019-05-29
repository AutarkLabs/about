import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import ipfsClient from 'ipfs-http-client'


const useIpfs = ipfsOptions => {
  const [ipfsInstance, setIpfsInstance] = useState(null)

  useEffect(() => {
    setIpfsInstance(ipfsClient(ipfsOptions))
  }, [])

  return [ipfsInstance]
}
export default useIpfs
