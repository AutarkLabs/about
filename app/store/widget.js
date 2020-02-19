import { ipfs } from '../utils/ipfs'

/// ////////////////////////////////////
/*    Widgets event handlers          */
/// ////////////////////////////////////

export const updateContent = async cId => {
  try {
    if (cId.startsWith('Qm') && cId.length === 46) {
      const content = (await ipfs.object.data(cId)).toString()
      return JSON.parse(content)
    }
    if(cId.length === 59) {
      const content = (await ipfs.dag.get(cId)).value
      return content
    }
  } catch(e) {
    console.error(e)
  }
  return []
}
