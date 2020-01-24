import Aragon, { events } from '@aragon/api'
import { from } from 'rxjs'
import { first, map, mergeMap } from 'rxjs/operators'

const app = new Aragon()

const getInstalledApp = async appName => await app
  .installedApps()
  .pipe(
    mergeMap(from),
    first(app => app.name === appName, {}),
    map(({ appAddress }) => ({ appAddress }))
  )
  .toPromise()

export { app, events, getInstalledApp }
