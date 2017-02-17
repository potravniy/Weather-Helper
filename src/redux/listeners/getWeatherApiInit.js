import { getWeather } from '_actions/getWeather'
import { pick, isFinite, isNull } from 'lodash'

let isActionDispatched = {}
const isWeatherNeeded = p => isNull(p.weather) && isFinite(p.lat) && !p.isFetching && !isActionDispatched[p.id]

function checkIfWeatherNeeded (store) {
  const { places, lang } = store.getState()
  const dispatchedActionList = {}

  places.forEach(place =>{
    if(isWeatherNeeded(place)) {
      const props = {...pick(place, ['id', 'lat', 'lng']), lang}
      store.dispatch(getWeather(props))
      isActionDispatched[place.id] = true
    }
    dispatchedActionList[place.id] = isActionDispatched[place.id] || false
  })

  isActionDispatched = dispatchedActionList

}

export default function getWeatherApiInit (store) {
  checkIfWeatherNeeded(store)
  return store.subscribe(() => checkIfWeatherNeeded(store))
}
