import _ from 'lodash'

let savedString = window.localStorage.weatherHelper
  ? window.localStorage.getItem("weatherHelper")
  : ''

function cleanupPlace (place) {
  return _(place)
    .omit([
      'coords.isFetching',
      'coords.error',
      'weather',
      'expandedDay'
    ])
    .mapValues(
      (val, key, obj) => {
        return obj.placeName === 'Current position' && key === 'coords'
          ? {'lat': undefined, 'lng': undefined}
          : val
      }
    )
    .value()
}

function cleanupState (state) {
  return {
    ..._.omit(state, [
      'expandedPlaceID',
      'isMapVisible',
      'viewport'
    ]),
    places: state.places.map(cleanupPlace)
  }
}

function saveState(store) {
  const state = store.getState()
  const storeToSave = cleanupState(state)
  const newString = JSON.stringify(storeToSave)
  if (savedString !== newString) {
    window.localStorage.setItem('weatherHelper', newString)
    savedString = newString
  }
}

export default function onStateChangeListener(store) {
  saveState(store)
  return store.subscribe(() => { saveState(store) })
}
