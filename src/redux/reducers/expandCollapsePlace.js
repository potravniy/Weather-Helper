import { 
  EXPAND_PLACE,
  COLLAPSE_PLACE
} from '_constants/actions'
import initialState from '_redux/initialState'

export default function (expandedPlace = initialState.expandedPlace, action) {
  switch (action.type) {

    case EXPAND_PLACE:
      return action.id
      
    case COLLAPSE_PLACE:
      return initialState.expandedPlace
      
    default:
      return expandedPlace
  }
}
