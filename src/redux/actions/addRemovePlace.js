import {
  ADD_PLACE,
  REMOVE_PLACE
} from '_constants/actions'

export const addPlace = (place) => {
  return {
    type: ADD_PLACE,
    placeName: place.name,
    lat: place.lat,
    lng: place.lng
  }
}
export const removePlace = (id) => {
  return {
    type: REMOVE_PLACE,
    id: id
  }
}
