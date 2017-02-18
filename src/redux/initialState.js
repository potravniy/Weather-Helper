import languages, { EN } from '_constants/languages'

export const nonStorablePartOfPlace = {
  'weather': {
    'isFetching': false,
    'data': null,
    'error': null
  },
  'expandedDay': -1
}

export const placeInitialState = {
  'placeName': 'Current position',
  'id': 'place_0',
  'coords': {
    'isFetching': false,
    'lat': undefined,
    'lng': undefined,
    'error': null
  },
  ...nonStorablePartOfPlace
}

const defaultState = {
  'expandedPlace': '',
  'isMapVisible': false,
  'lang': languages.includes(window.language) ? window.language : EN,
  'places': [
    placeInitialState
  ],
  'viewport': null
}

function cleanupPlace (place) {
  return {
    ...place,
    ...nonStorablePartOfPlace
  }
}

function cleanupState (state) {
  return {
    ...defaultState,
    ...state,
    places: state.places.map(cleanupPlace)
  }
}

const savedState = JSON.parse(window.localStorage.getItem('weatherHelper'))

const initialState = savedState
  ? cleanupState(savedState)
  : defaultState

export default initialState