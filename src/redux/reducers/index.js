import { combineReducers } from 'redux'
import expandedPlace from '_reducers/expandCollapsePlace'
import isMapVisible from '_reducers/showHideMap'
import lang from '_reducers/lang'
import places from '_reducers/places'
import viewport from '_reducers/viewport'

const rootReducer = combineReducers({
  expandedPlace,
  isMapVisible,
  lang,
  places,
  viewport
})

export default rootReducer
