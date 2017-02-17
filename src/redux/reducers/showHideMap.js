import { SHOW_MAP, HIDE_MAP } from '_constants/actions'

import initialState from '_redux/initialState'

export default function (isMapVisible = initialState.isMapVisible, action) {
  switch (action.type) {

    case SHOW_MAP:
      return true

    case HIDE_MAP:
      return false

    default:
      return isMapVisible
  }
}
