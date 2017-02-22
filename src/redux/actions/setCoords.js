import { SET_COORDS } from '_constants/actions'

export const setCoords = (place) => {

  return {
    type: SET_COORDS,
    ...place
  }
}