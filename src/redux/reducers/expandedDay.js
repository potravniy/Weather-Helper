import { placeInitialState } from '_redux/initialState'

import {
  EXPAND_DAY,
  COLLAPSE_DAY
} from '_constants/actions'

export default function (expandedDay = placeInitialState.expandedDay, action) {

  switch (action.type) {

    case EXPAND_DAY:
      return action.dayIndex

    case COLLAPSE_DAY:
      return -1

    default:
      return expandedDay
  }
}
