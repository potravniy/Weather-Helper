import { combineReducers } from 'redux'

import expandedDay from '_reducers/expandedDay'
import coords from '_reducers/coords'
import weather from '_reducers/weather'

const placeReducer = combineReducers({
  expandedDay,
  coords,
  weather
})

export default placeReducer
