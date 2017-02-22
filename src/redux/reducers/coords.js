import { has } from 'lodash'
import { placeInitialState } from '_redux/initialState'
import { SET_COORDS } from '_constants/actions'

export default function (coords = placeInitialState.coords, action) {

  switch (action.type) {

    case SET_COORDS:
      return {
        ...coords,
        'lat': action.lat,
        'lng': action.lng
      }

    default:
      return coords
  }
}