import { getCoords } from '_actions/getCoords'
import { isFinite } from 'lodash'

let isActionDispatched = {}
const areCoordsNeeded = place => !isFinite(place.coords.lat)
                                 && !place.coords.isFetching

function checkIfCoordNeeded (store) {
  const { places } = store.getState()

  places.forEach(place => {
    if(!isActionDispatched[place.id] && areCoordsNeeded(place)) {
      store.dispatch(getCoords(place.id))
      isActionDispatched[place.id] = true
    }
  })

}

export default function getCoordsApiInit ( store ) {
  checkIfCoordNeeded( store )
  return store.subscribe(() => { checkIfCoordNeeded( store ) })
}
