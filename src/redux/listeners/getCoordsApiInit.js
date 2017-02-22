import { setCoords } from '_actions/setCoords'
import { removePlace } from '_actions/addRemovePlace'
import { isFinite } from 'lodash'

const isActionDispatched = {}
const areCoordsNeeded = place => place.placeName === "Current position"
                                 && !isFinite(place.coords.lat)
                                 && !place.coords.isFetching

function checkIfCoordNeeded (store) {
  const { places } = store.getState()

  places.forEach(place => {
    if(!isActionDispatched[place.id] && areCoordsNeeded(place)) {
      // store.dispatch(getCoords(place.id))
      const success = (position) => {
        const props = {
          id: place.id,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log(position, props)
        store.dispatch(setCoords(props))
      }
      const error = (error) => {
        console.log(error)
        error.code === 1 && alert("User denied Geolocation in browser.")
      }
      navigator.geolocation.getCurrentPosition(success, error, {maximumAge: 600000})
      isActionDispatched[place.id] = true
    }
  })

}

export default function getCoordsApiInit ( store ) {
  checkIfCoordNeeded( store )
  return store.subscribe(() => { checkIfCoordNeeded( store ) })
}
