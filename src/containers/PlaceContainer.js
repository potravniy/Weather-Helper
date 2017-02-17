import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import PlaceView from '_components/PlaceView'

import { expandPlace, collapsePlace } from '_actions/expandPlace'
import { expandDay, collapseDay } from '_actions/expandDay'

import areHoursRenderingWithinDay from '_utils/areHoursRenderingWithinDay'
import scrollToTop from '_utils/scrollToTop'

const PlaceContainer = (props) => {

  const {
    place,
    viewport,
    expandDay,
    collapseDay
  } = props
  const isDataPresent = !!place.weather
  const timezone = isDataPresent ? place.weather.timezone : null
  const weeklySummary = isDataPresent && !viewport.isVeryNarrow
    ? place.weather.daily.summary
    : ''
  const isPlaceViewExpanded = isDataPresent && place.isExpanded
  const isHourlyViewVisible = !areHoursRenderingWithinDay(viewport)
  const hasExpandedView = !!place.hasExpandedView
  const onPlaceClick = isPlaceViewExpanded
    ? props.collapsePlace
    : props.expandPlace

  return (
    <PlaceView
      collapseDay={collapseDay}
      expandDay={expandDay}
      hasExpandedView={hasExpandedView}
      isDataPresent={isDataPresent}
      isDayExpandable={dayIndex => dayIndex < 2}
      isHourlyViewVisible={isHourlyViewVisible}
      isPlaceViewExpanded={isPlaceViewExpanded}
      onPlaceClick={onPlaceClick}
      place={place}
      timezone={timezone}
      viewport={viewport}
      weeklySummary={weeklySummary}
    />
  )
}

PlaceContainer.propTypes = {
  place: PropTypes.object.isRequired,
  viewport: PropTypes.object.isRequired,
  expandPlace: PropTypes.func.isRequired,
  collapsePlace: PropTypes.func.isRequired,
  expandDay: PropTypes.func.isRequired,
  collapseDay: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    viewport: state.viewport
  }
}

function mapDispatchToProps (dispatch) {
  return {
    expandPlace: (id) => {
      dispatch(expandPlace(id))
      scrollToTop()
    },
    collapsePlace: () => dispatch(collapsePlace()),
    expandDay: (data) => dispatch(expandDay(data)),
    collapseDay: () => dispatch(collapseDay())
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( PlaceContainer )