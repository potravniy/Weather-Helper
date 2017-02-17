import {
  GET_COORDS_REQUEST,
  GET_COORDS_SUCCESS,
  GET_COORDS_FAILURE
} from '_constants/actions'

export default function (coords, action) {
  const error = catchError(action)

  switch (action.type) {

    case GET_COORDS_REQUEST:
      if(error){
        alert(error)
        return {
          ...coords,
          error 
        }
      } else {
        return {
          ...coords,
          'isFetching': true
        }
      }

    case GET_COORDS_SUCCESS:
      if(error){
        alert(error)
        return {
          ...coords,
          'isFetching': false,
          error
        }
      } else {
        return {
          ...coords,
          'isFetching': false,
          'lat': action.payload.location.lat,
          'lng': action.payload.location.lng
        }
      }

    case GET_COORDS_FAILURE:
      alert(error)
      return {
        ...coords,
        'isFetching': false,
        error
      }

    default:
      return coords
  }
}

function catchError(action){
  if(action.payload.error) return action.payload.msg
  if(action.error) return `${action.payload.message} ${action.payload.name}`
  return null
}