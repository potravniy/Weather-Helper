import moment from 'moment'
import 'moment-timezone'
import { getWeather } from '_actions/getWeather'
import languages from '_constants/languages'
import { isFinite } from 'lodash'

moment.locale(languages)

export default function onLangChangeListener ( store ) {
  return store.subscribe(() => {
    const states = store.liftedStore.getState().computedStates
    const oldState = states[states.length - 2].state
    const newState = states[states.length - 1].state
    if (oldState.lang !== newState.lang) {
      changeDataLang(store)
    }
  })
}

const isWeatherNeeded = place => isFinite(place.lat) && isFinite(place.lng)

function changeDataLang (store) {
  const { lang, places } = store.getState()

  places.forEach( place => {
  if(isWeatherNeeded(place)){
      const props = {...pick(place, ['id', 'lat', 'lng']), lang}
      store.dispatch( getWeather(props) )
    }
  })

  moment.locale(lang)

}
