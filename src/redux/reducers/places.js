import { findIndex, pick, omit } from 'lodash'

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
          'id': getNewPlaceId(places),
          'coords': {
            'lat': action.lat,
            'lng': action.lng,
          }
        }
      ]

    case REMOVE_PLACE:
      return places.filter(place => place.id !== action.id)

    default:
      var id = action.id || action.meta && action.meta.id 
      var i = id && findIndex(places, {id})
      if (!id || i < 0) return places // There's no place with action inside the place
      return [
        ...places.slice(0, i),
        {
          ...placeReducer(omit(places[i], ['id', 'placeName']), action),
          ...pick(places[i], ['id', 'placeName'])
        },
        ...places.slice(++i)
      ]
  }
}
