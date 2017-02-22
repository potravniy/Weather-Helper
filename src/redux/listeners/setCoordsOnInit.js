import { CURRENT_POSITION_NAME } from'_constants/currentPositionName'
import { setCoords } from '_actions/setCoords'
import { removePlace } from '_actions/addRemovePlace'
import { isFinite } from 'lodash'

let unsubscribe = null
let isActionDispanched = false
const areCoordsNeeded = place => place.placeName === CURRENT_POSITION_NAME
                                 && !isFinite(place.coords.lat)
                                 && !isActionDispanched

function checkIfCoordNeeded (store) {
  const { places } = store.getState()

  places.forEach(place => {
    if(areCoordsNeeded(place)) {
      const success = (position) => {
        const props = {
          id: place.id,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        store.dispatch(setCoords(props))
        isActionDispanched = true
        unsubscribe()
      }
      const error = (error) => {
        if(error.code === 1){
          store.dispatch(removePlace(place.id))
          unsubscribe()
          isActionDispanched = true
        }
      }
      navigator.geolocation.getCurrentPosition(success, error, {maximumAge: 600000})
    }
  })

}

export default function setCoordsOnInit ( store ) {
  checkIfCoordNeeded( store )
  return unsubscribe = store.subscribe(() => { checkIfCoordNeeded( store ) })
}
