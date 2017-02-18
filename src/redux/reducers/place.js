import { combineReducers } from 'redux'

import { placeInitialState } from '_redux/initialState'
import expandedDay from '_reducers/expandedDay'
import coords from '_reducers/coords'
import weather from '_reducers/weather'

const placeReducer = combineReducers({
  coords,
  expandedDay,
  weather
})

export default placeReducer
