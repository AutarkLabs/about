import { ipfsGet } from './utils/ipfs'


/// ////////////////////////////////////
/*    Widgets event handlers          */
/// ////////////////////////////////////

export const updateContent = async cId => {
  try {
    const content = await ipfsGet(cId)
    return content
  } catch(e) {
    console.error(e)
  }
  return []
}
