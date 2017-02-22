import { combineReducers } from 'redux'
import expandedPlaceID from '_reducers/expandCollapsePlace'
import isMapVisible from '_reducers/showHideMap'
import lang from '_reducers/lang'
import places from '_reducers/places'
import viewport from '_reducers/viewport'

const rootReducer = combineReducers({
  expandedPlaceID,
  isMapVisible,
  lang,
  places,
  viewport
})

export default rootReducer
