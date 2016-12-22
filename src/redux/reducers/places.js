import {
  ADD_PLACE,
  REMOVE_PLACE,
  GET_COORDS_REQUEST,
  GET_COORDS_SUCCESS,
  GET_COORDS_FAILURE,
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE
} from '_constants/actions'

import getNewPlaceId from '_lib/getNewPlaceId'
import initialState from '_redux/initState'

export default function (places = initialState.places, action) {
  switch (action.type) {

    case ADD_PLACE:
      var newID = getNewPlaceId(places)
      return [
        ...places,
        {
          "place": 'CityName' + newID,
          "placeID": newID,
          "lat": undefined,
          "lng": undefined,
          "weather": null
        }
      ]

    case REMOVE_PLACE:
      return places.filter(item => item.placeID !== action.placeID)

    case GET_COORDS_REQUEST:
      return setCoords(places, undefined, undefined, true)

    case GET_COORDS_SUCCESS:
      return setCoords(places, action.payload.location.lat, action.payload.location.lng, false)

    case GET_COORDS_FAILURE:
      return setCoords(places, "error", "error", false)

    case GET_WEATHER_REQUEST:
      console.log("GET_WEATHER_REQUEST: ", action)
      if(action.error){
        return setWeather(places, action.meta, 'error', false)
      } else {
        return setWeather(places, action.meta, null, true)
      }

    case GET_WEATHER_SUCCESS:
      console.log("GET_WEATHER_SUCCESS: ", action)
      if(action.error){
        return setWeather(places, action.meta, 'error', false)
      } else {
        return setWeather(places, action.meta, action.payload, false)
      }

    case GET_WEATHER_FAILURE:
      console.log('GET_WEATHER_FAILURE', action)
      return setWeather(places, action.meta, action.payload, false)

    default:
      return places
  }
}

function setCoords (places, lat, lng, isFetching) {
  return places.map(p => {
    if(p.placeID === 0){
      return {
        ...p,
        "lat": lat,
        "lng": lng,
        'isFetching': isFetching
      }
    } else return p
  })
}
function setWeather (places, placeID, payload, isFetching) {
  return places.map(p => {
    if(p.placeID === placeID){
      return {
        ...p,
        "weather": payload,
        'isFetching': isFetching
      }
    } else return p
  })
}