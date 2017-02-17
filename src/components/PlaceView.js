import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'

import Day from '_components/Day'
import Hourly from '_components/Hourly'

import { CURRENT_POSITION } from '_intl/defaultMessages.json'

import CollapseIcon from '_icons/CollapseIcon'
import ExpandIcon from '_icons/ExpandIcon'

import formatMinutesToHhMm from '_utils/formatMinutesToHhMm'
import getArticleWidth from '_utils/getArticleWidth'

const PlaceView = (props) => {
  const {
    collapseDay,
    expandDay,
    hasExpandedView,
    isDataPresent,
    isDayExpandable,
    isHourlyViewVisible,
    isPlaceViewExpanded,
    onPlaceClick,
    place,
    timezone,
    viewport,
    weeklySummary
  } = props
  const onClick = onPlaceClick.bind(null, place.id)
  const gmtOffset = timezone
    ? ' GMT' + formatMinutesToHhMm(-moment.tz.zone(timezone).offset(Date.now()))
    : ''
  const placeName = place.placeName === "Current position"
    ? <FormattedMessage { ...CURRENT_POSITION } />
    : <span>{place.placeName}</span>

  let addClass = isPlaceViewExpanded ? ' place_expanded' : ' collapsed_place'
  
  let children = null, hourlyView = null, width = null
  if( isDataPresent ){
    if( isPlaceViewExpanded ) {
      children = place.weather.daily.data.map((day, i) => {
        let isDayExpanded, clickHandler
        if( isDayExpandable(i) ){
          if( place.expandedDay === i ){
            isDayExpanded = true
            clickHandler = collapseDay
            hourlyView = (
              <Hourly
                day={day.time}
                hourly={place.weather.hourly}
                precipType={day.precipType}
                summary={day.summary}
                timezone={timezone}
                viewport={viewport}
              />
            )
          } else {
            isDayExpanded = false
            clickHandler = expandDay.bind(null, {
              id: place.id,
              dayIndex: i
            })
          }
        } else {
          isDayExpanded = false
          clickHandler = null
        }
        return (
          <Day
            daily
            day={day}
            expanded={isDayExpanded}
            hourly={place.weather.hourly}
            key={day.time}
            onClick={clickHandler}
            timezone={timezone}
            viewport={viewport}
          />
        )
      })
      width = getArticleWidth(viewport).forExpandedPlace
    } else {
      const curr = place.weather.currently
      children = (
        <Day
          day={curr}
          key={curr.time}
          onClick={onClick}
          timezone={timezone}
          viewport={viewport}
        />
      )
      width = getArticleWidth(viewport).forCollapsedPlace
      addClass += place.hasExpandedView ? ' hasExpandedView' : ''
    }
  }

  return (
    <article className={'place' + addClass} style={{width: width}} >
      
      <div className='place__title' onClick={onClick}>
        {placeName}
        <span className='gmt-offset' >{gmtOffset}</span>
        <br/>
        {isPlaceViewExpanded && <i>{weeklySummary}</i>}
        <div className='place__expand-icon place__expand-icon--place'>
          {isPlaceViewExpanded ? <CollapseIcon/> : <ExpandIcon/>}
        </div>
      </div>
      
      <div className='place__dayslist clearfix'>
        {children}
      </div>

      {isHourlyViewVisible ? hourlyView : null}

    </article>
  )
}

PlaceView.propTypes = {
  collapseDay: PropTypes.func.isRequired,
  expandDay: PropTypes.func.isRequired,
  hasExpandedView: PropTypes.bool.isRequired,
  isDataPresent: PropTypes.bool.isRequired,
  isDayExpandable: PropTypes.func.isRequired,
  isHourlyViewVisible: PropTypes.bool.isRequired,
  isPlaceViewExpanded: PropTypes.bool.isRequired,
  onPlaceClick: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired,
  viewport: PropTypes.object.isRequired,
  weeklySummary: PropTypes.string.isRequired
}

export default PlaceView