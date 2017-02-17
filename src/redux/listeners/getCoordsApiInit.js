import { getCoords } from '_actions/getCoords'
import { isFinite } from 'lodash'

let isActionDispatched = []
const areCoordsNeeded = place => !isFinite(place.lat) && !place.isFetching

function checkIfCoordNeeded (store) {
  const { places } = store.getState()
  const newIsActionDispatched = new Array(places.length).fill(false)

  places.forEach(place => {
    if(areCoordsNeeded(place)) {
      store.dispatch(getCoords(place.id))
      isActionDispatched[place.id] = true
    }
    newIsActionDispatched[place.id] = isActionDispatched[place.id] || false
  })

  isActionDispatched = newIsActionDispatched

}

export default function getCoordsApiInit ( store ) {
  checkIfCoordNeeded( store )
  return store.subscribe(() => { checkIfCoordNeeded( store ) })
}
