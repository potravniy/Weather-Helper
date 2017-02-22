import { getWeather } from '_actions/getWeather'
import { pick, isFinite, isNull } from 'lodash'

let isActionDispatched = {}
const isWeatherNeeded = place => !place.weather.data
                                 && isFinite(place.coords.lat)
                                 && !place.weather.isFetching

function checkIfWeatherNeeded (store) {
  const { places, lang } = store.getState()

  places.forEach(place =>{
    if(!isActionDispatched[place.id] && isWeatherNeeded(place)) {
      const props = {
        'id': place.id,
        'lat': place.coords.lat,
        'lng': place.coords.lng,
        lang
      }
      store.dispatch(getWeather(props))
      isActionDispatched[place.id] = true
    }
  })

  if(isActionDispatched.length > places.length){
    isActionDispatched = pick(isActionDispatched, places.map(p => p.id))
  }

}

export default function getWeatherApiInit (store) {
  checkIfWeatherNeeded(store)
  return store.subscribe(() => checkIfWeatherNeeded(store))
}
