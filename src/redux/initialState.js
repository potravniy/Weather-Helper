import { CURRENT_POSITION_NAME } from'_constants/currentPositionName'
import languages, { EN } from '_constants/languages'
import { merge, cloneDeep, includes, uniqBy } from 'lodash'

const getSavedState = () => {
  try {
    const storage = window.localStorage.getItem('weatherHelper')
    if(includes(storage, 'placeID')) return null
    const savedState = JSON.parse(storage)
    const placesWithCoords = savedState.places
      ? savedState.places.filter(p => !!p.coords)
      : null
    const placesWitUniqNames = placesWithCoords
      ? uniqBy(placesWithCoords, p => p.placeName)
      : null
    const places = placesWithCoords
      ? uniqBy(placesWithCoords, p => p.id)
      : null
    return {
      ...savedState,
      places
    }
  }
  catch(err){
    console.log('localStorage load error:', err)
    return null
  }
}

export const placeInitialState = {
  'placeName': CURRENT_POSITION_NAME,
  'id': 'place_0',
  'coords': {
    'lat': undefined,
    'lng': undefined,
  },
  'weather': {
    'isFetching': false,
    'data': null,
    'error': null
  },
  'expandedDay': -1
}

const defaultState = {
  'expandedPlaceID': '',
  'isMapVisible': false,
  'lang': includes(languages, window.language) ? window.language : EN,
  'places': [
    placeInitialState
  ],
  'viewport': null
}
  console.log('defaultState: ', defaultState.lang)

function cleanupPlace (place) {
  return merge(cloneDeep(placeInitialState), place)
}

function cleanupState (state) {
  return {
    ...defaultState,
    ...state,
    places: state.places.map(cleanupPlace)
  }
}

const savedState = getSavedState()
const initialState = savedState
  ? cleanupState(savedState)
  : defaultState

export default initialState