import { has } from 'lodash'
import { placeInitialState } from '_redux/initialState'
import {
  SET_COORDS,
  GET_COORDS_REQUEST,
  GET_COORDS_SUCCESS,
  GET_COORDS_FAILURE
} from '_constants/actions'

export default function (coords = placeInitialState.coords, action) {

  const error = catchError(action)
  if(error){
    alert(error)
    return {
      ...coords,
      isFetching: false,
      error
    }
  }

  switch (action.type) {

    case SET_COORDS:
      return {
        ...coords,
        'lat': action.lat,
        'lng': action.lng
      }

    case GET_COORDS_REQUEST:
      return {
        ...coords,
        'isFetching': true
      }

    case GET_COORDS_SUCCESS:
      return {
        ...coords,
        'isFetching': false,
        'lat': action.payload.location.lat,
        'lng': action.payload.location.lng
      }

    case GET_COORDS_FAILURE:
      alert(GET_COORDS_FAILURE)
      return {
        ...coords,
        'isFetching': false,
        error: GET_COORDS_FAILURE
      }

    default:
      return coords
  }
}

function catchError(action){
  if(has(action, 'payload.error')) return action.payload.msg
  if(action.error) return `${action.payload.message} ${action.payload.name}`
  return null
}