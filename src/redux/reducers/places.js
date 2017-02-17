import { findIndex, has } from 'lodash'

import initialState, { placeInitialState } from '_redux/initialState'

import placeReducer from '_reducers/place'
import getNewPlaceId from '_utils/getNewPlaceId'

import {
  ADD_PLACE,
  REMOVE_PLACE
} from '_constants/actions'

export default function placesReducer (places = initialState.places, action) {
  switch (action.type) {

    case ADD_PLACE:
      return [
        ...places,
        {
          ...placeInitialState,
          'placeName': action.placeName,
          'id': getNewPlaceId(),
          'coords': {
            'isFetching': false,
            'lat': action.lat,
            'lng': action.lng,
            'error': null
          }
        }
      ]

    case REMOVE_PLACE:
      return places.filter(place => place.id !== action.id)

    default:
      var id = has(action, 'meta.id') ? action.meta.id : action.id
      var i = findIndex(places, {id})
      if (i < 0) return places // There's no such place
      return [
        ...places.slice(0, i),
        placeReducer(places[i], action),
        ...places.slice(++i)
      ]
  }
}
