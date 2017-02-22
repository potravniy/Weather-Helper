import React, { PropTypes } from 'react'

import WeatherIcons from '_icons/WeatherIcons'
import CollapseIcon from '_icons/CollapseIcon'
import ExpandIcon from '_icons/ExpandIcon'

import CalendarDay from '_components/CalendarDay'
import Temperature from '_components/Temperature'
import WindAndPrecip from '_components/WindAndPrecip'
import Hourly from '_components/Hourly'

import areHoursRenderingWithinDay from '_utils/areHoursRenderingWithinDay'

function Day(props) {
  const {
    day,
    isDayExpanded,   //  undefined in collapcedPlace,  bool in expandedPlace
    hourly,          //  undefined in collapcedPlace,  object in expandedPlace
    isPlaceExpanded,
    onClick,
    timezone,
    viewport
  } = props

  const style = onClick || !isPlaceExpanded ? { cursor: 'pointer' } : null
  const expandCollapseIcon = onClick && (
    <div className='place__expand-icon place__expand-icon--day'>
      {isDayExpanded ? <CollapseIcon /> : onClick && <ExpandIcon />}
    </div>
  )
  const daySummary = !hourly && <p className="day__summary"> {day.summary} </p>
  const dayHourly = areHoursRenderingWithinDay(viewport) && isDayExpanded && (
    <Hourly
      day={day.time}
      timezone={timezone}
      hourly={hourly}
      viewport={viewport}
      precipType={day.precipType}
    />
  )

  return (
    <div className="day_wrapper clearfix">
      <div className="day" onClick={onClick} style={style} >
        {daySummary}
        <div className="day-tile clearfix">
          <div className='day-tile__item day-tile__item-date'>
            <CalendarDay time={day.time} timezone={timezone} forNow={!isPlaceExpanded} />
          </div>
          <div className='day-tile__item day-tile__item-weather_icon'>
            <WeatherIcons iconName={day.icon} />
          </div>
          <div className='day-tile__item day-tile__item-temperature'>
            <Temperature day={day} daily={hourly} viewport={viewport} />
          </div>
          <div className='day-tile__item day-tile__item-wind_and_precip'>
            <WindAndPrecip day={day} viewport={viewport} />
          </div>
        </div>
        {hourly && expandCollapseIcon}
      </div>
      {dayHourly}
    </div>
  )
}

Day.propTypes = {
  daily: PropTypes.bool,
  day: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  hourly: PropTypes.object,
  onClick: PropTypes.func,
  timezone: PropTypes.string.isRequired,
  viewport: PropTypes.object.isRequired
}

export default Day