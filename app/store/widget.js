import { ipfs } from '../utils/ipfs'

/// ////////////////////////////////////
/*    Widgets event handlers          */
/// ////////////////////////////////////

export const updateContent = async cId => {
  const content = (await ipfs.dag.get(cId)).value
  return content
}
