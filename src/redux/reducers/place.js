import { combineReducers } from 'redux'

import { placeInitialState } from '_redux/initialState'
import expandedDay from '_reducers/expandedDay'
import coords from '_reducers/coords'
import weather from '_reducers/weather'

const placeReducer = combineReducers({
  coords,
  expandedDay,
  id: id => id || placeInitialState.id,
  placeName: placeName => placeName || placeInitialState.placeName,
  weather
})

export default placeReducer
