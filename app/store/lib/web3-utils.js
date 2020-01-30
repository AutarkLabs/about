import { toChecksumAddress } from 'web3-utils'

// Check address equality with checksums
export function addressesEqual(first, second) {
  first = first && toChecksumAddress(first)
  second = second && toChecksumAddress(second)
  return first === second
}

// TODO: use or remove
// export const addressPattern = '(0x)?[0-9a-fA-F]{40}'

// Re-export some web3-utils functions
// TODO: us or remove
// export { isAddress, toChecksumAddress, toUtf8 } from 'web3-utils'
