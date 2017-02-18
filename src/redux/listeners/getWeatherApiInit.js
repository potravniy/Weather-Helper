import { getWeather } from '_actions/getWeather'
import { pick, isFinite, isNull } from 'lodash'

let isActionDispatched = {}
const isWeatherNeeded = p => isNull(p.weather.data) && isFinite(p.coords.lat) && !p.weather.isFetching && !isActionDispatched[p.id]

function checkIfWeatherNeeded (store) {
  const { places, lang } = store.getState()
  // console.log('WeatherlList: ', places)

  places.forEach(place =>{
    if(isWeatherNeeded(place)) {
      const props = {
        'id': place.id,
        'lat': place.coords.lat,
        'lng': place.coords.lng,
        lang
      }
      // console.log('isWeatherNeeded: ', props)
      store.dispatch(getWeather(props))
      isActionDispatched[place.id] = !place.weather.isFetching
    }
    isActionDispatched[place.id] = place.weather.isFetching
      ? false
      : isActionDispatched[place.id] || false
  })

  isActionDispatched = pick(isActionDispatched, places.map(p => p.id))

}

export default function getWeatherApiInit (store) {
  checkIfWeatherNeeded(store)
  return store.subscribe(() => checkIfWeatherNeeded(store))
}
