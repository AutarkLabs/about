import { app } from './utils'
import { ipfs } from '../utils/ipfs'
import { map } from 'rxjs/operators'

/// ////////////////////////////////////
/*    Widgets event handlers          */
/// ////////////////////////////////////

export const updateWidgets = async (widgets, { 0: id }) => {
  const newWidgets = Array.from(widgets || [])
  const widgetIndex = newWidgets.findIndex(w => w.id === id)  
  const widget = await getWidget(id)
  widgetIndex === -1 ? newWidgets.push(widget) : newWidgets[widgetIndex] = widget
  return newWidgets
}

/// ////////////////////////////////////
/*    Widgets helper functions        */
/// ////////////////////////////////////

const getWidget = id => {
  return app.call('getWidget', id)
    .pipe(
      map(async (
        {
          0: cId
        }
      ) => {
        const widgetObj = (await ipfs.dag.get(cId)).value
        return {
        // transform response data for the frontend
          ...widgetObj,
          // TODO: add id tracking
          // id, // note the id is added along with the other data
        }})
    )
    .toPromise()
}
