import { ipfs } from '../utils/ipfs'

/// ////////////////////////////////////
/*    Widgets event handlers          */
/// ////////////////////////////////////

export const updateContent = async cId => {
  const content = (await ipfs.object.data(cId)).toString()
  return JSON.parse(content)
}
