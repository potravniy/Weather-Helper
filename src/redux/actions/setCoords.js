import { SET_COORDS } from '_constants/actions'

export const setCoords = (place) => {
  // const {
  //   id,
  //   lat,
  //   lng
  // } = place

  return {
    type: SET_COORDS,
    ...place
  }
}