import { has } from 'lodash'
import { placeInitialState } from '_redux/initialState'
import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE
} from '_constants/actions'

export default function (weather = placeInitialState.weather, action) {

  const error = catchError(action)
  if(error){
    alert(error)
    return {
      ...weather,
      isFetching: false,
      error
    }
  }

  switch (action.type) {

    case GET_WEATHER_REQUEST:
      return {
        ...weather,
        'isFetching': true
      }

    case GET_WEATHER_SUCCESS:
      return {
        ...weather,
        'isFetching': false,
        'data': action.payload
      }

    case GET_WEATHER_FAILURE:
      alert(GET_WEATHER_FAILURE)
      return {
        ...weather,
        'isFetching': false,
        error: GET_WEATHER_FAILURE
      }

    default:
      return weather
  }
}

function catchError(action){
  if(has(action, 'payload.error')) return action.payload.msg
  if(action.error) return `${action.payload.message} ${action.payload.name}`
  return null
}