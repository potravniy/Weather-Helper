import { getCoords } from '_actions/getCoords'
import { isFinite } from 'lodash'

let isActionDispatched = {}
const areCoordsNeeded = place => !isFinite(place.coords.lat) && !place.coords.isFetching && !isActionDispatched[place.id]

function checkIfCoordNeeded (store) {
  const { places } = store.getState()

  places.forEach(place => {
    if(areCoordsNeeded(place)) {
      store.dispatch(getCoords(place.id))
      isActionDispatched[place.id] = !place.coords.isFetching
    }
    isActionDispatched[place.id] = place.coords.isFetching
      ? false
      : isActionDispatched[place.id] || false
  })

}

export default function getCoordsApiInit ( store ) {
  checkIfCoordNeeded( store )
  return store.subscribe(() => { checkIfCoordNeeded( store ) })
}
