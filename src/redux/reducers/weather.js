import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE
} from '_constants/actions'

export default function (weather, action) {
  const error = catchError(action)

  switch (action.type) {

    case GET_WEATHER_REQUEST:
      if(error){
        alert(error)
        return {
          ...weather,
          error 
        }
      } else {
        return {
          ...weather,
          'isFetching': true
        }
      }

    case GET_WEATHER_SUCCESS:
      if(error){
        alert(error)
        return {
          ...weather,
          'isFetching': false,
          error 
        }
      } else {
        return {
          ...weather,
          'isFetching': false,
          'data': action.payload
        }
      }

    case GET_COORDS_FAILURE:
      alert(error)
      return {
        ...weather,
        'isFetching': false,
        error
      }

    default:
      return weather
  }
}

function catchError(action){
  if(action.payload.error) return action.payload.msg
  if(action.error) return `${action.payload.message} ${action.payload.name}`
  return null
}