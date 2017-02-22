import React, { PropTypes } from 'react'
import { get } from 'lodash'
import moment from 'moment'

import Day from '_components/Day'
import Hourly from '_components/Hourly'

import CollapseIcon from '_icons/CollapseIcon'
import ExpandIcon from '_icons/ExpandIcon'

import getGmtOffset from '_utils/getGmtOffset'
import getPlaceNameTranslated from '_utils/getPlaceNameTranslated'
import getArticleWidth from '_utils/getArticleWidth'
import areHoursRenderingWithinDay from '_utils/areHoursRenderingWithinDay'

const ExpandedPlaceView = (props) => {
  const {
    collapseDay,
    collapsePlace,
    expandDay,
    place,
    viewport
  } = props

  const onClick = collapsePlace.bind(null, {id: place.id})
  const { gmtOffset, timezone } = getGmtOffset(place)
  const placeName = getPlaceNameTranslated(place)
  const width = getArticleWidth(viewport).forExpandedPlace
  const summary = !viewport.isVeryNarrow && get(place, 'weather.data.daily.summary') 
  const weatherDaily = get(place, 'weather.data.daily.data')
  
  const days = weatherDaily && weatherDaily.map((day, i) => {
    const clickHandler = place.expandedDay === i
      ? collapseDay.bind(null, {id: place.id})
      : i > 1 
        ? null
        : expandDay.bind(null, {
            id: place.id,
            dayIndex: i
          })
    return (
      <Day
        key={day.time}
        day={day}
        isDayExpanded={place.expandedDay === i}
        hourly={place.weather.data.hourly}
        isPlaceExpanded
        onClick={clickHandler}
        timezone={timezone}
        viewport={viewport}
      />
    )
  })

  const weatherDay = weatherDaily[place.expandedDay]
  const hourlyView = weatherDay && !areHoursRenderingWithinDay(viewport)
    && (
         <Hourly
           day={weatherDay.time}
           hourly={place.weather.data.hourly}
           precipType={weatherDay.precipType}
           summary={weatherDay.summary}
           timezone={timezone}
           viewport={viewport}
         />
       )

  return (
    <article className={'place place_expanded'} style={{width: width}} >
      
      <div className='place__title' onClick={onClick}>
        {placeName}
        <span className='gmt-offset' >{gmtOffset}</span>
        <br/>
        <i>{summary}</i>
        <div className='place__expand-icon place__expand-icon--place'>
          <CollapseIcon/>
        </div>
      </div>
      
      <div className='place__dayslist clearfix'>
        {days}
      </div>

      {hourlyView}

    </article>
  )
}

ExpandedPlaceView.propTypes = {
  collapseDay: PropTypes.func.isRequired,
  collapsePlace: PropTypes.func.isRequired,
  expandDay: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired,
  viewport: PropTypes.object.isRequired
}

export default ExpandedPlaceView